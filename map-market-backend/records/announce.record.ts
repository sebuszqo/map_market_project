import { AnnounceEntity } from "../types";
import { ValidationError } from "../utils/error";

interface NewAnnounceEntity extends Omit<AnnounceEntity, "id"> {
  id?: string;
}

export class AnnounceRecord implements AnnounceEntity {
  public id: string;
  public name: string;
  public latitude: number;
  public longitude: number;
  public price: number;
  public url: string;
  public description: string;

  constructor(obj: AnnounceEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError("Name cannot be empty or longer than 100.");
    }
    if (obj.description.length > 1000) {
      throw new ValidationError(
        "Description cannot be longer than 1000 chars."
      );
    }
    if (obj.price < 0 || obj.price > 1000000) {
      throw new ValidationError(
        "Price cannot be negative or bigger than 1 000 000."
      );
    }
    // @TODO: Check if URL is valid!
    if (!obj.url || obj.url.length > 100) {
      throw new ValidationError("Your url, cannot be longer than 100 chars.");
    }
    if (typeof obj.latitude !== "number" || typeof obj.longitude !== "number") {
      throw new ValidationError("Sorry, we couldn't locate the address.");
    }
  }
}
