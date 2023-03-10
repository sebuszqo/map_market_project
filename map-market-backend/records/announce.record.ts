import {AnnounceEntity, SimpleAnnounceEntity} from "../types";
import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

interface NewAnnounceEntity extends Omit<AnnounceEntity, "id"> {
  id?: string;
}

type AnnounceResults = [AnnounceEntity[], FieldPacket[]];

export class AnnounceRecord implements AnnounceEntity {
  public id: string;
  public name: string;
  public latitude: number;
  public longitude: number;
  public price: number;
  public url: string;
  public description: string;

  constructor(obj: NewAnnounceEntity) {
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

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.latitude = obj.latitude;
    this.longitude = obj.longitude;
    this.url = obj.url;
    this.price = obj.price;
  }

  static async findOne(id: string): Promise<AnnounceRecord | null> {
    const [results] = (await pool.execute(
        "SELECT * FROM `announcement` WHERE id=:id",
        {
          id,
        }
    )) as AnnounceResults;
    return results.length === 0 ? null : new AnnounceRecord(results[0]);
  }

  // filtered data we don't want to return whole objects of data at one request - security
  static async findAll(name: string): Promise<SimpleAnnounceEntity[] | null> {
    const [results] = (await pool.execute(
        "SELECT * FROM `announcement` WHERE name LIKE :search",
        {
          search: `%${name}%`,
        }
    )) as AnnounceResults;
    return results.length === 0
        ? null
        : results.map((result) => {
          const {id, latitude, longitude} = result;
          return {
            id,
            latitude,
            longitude,
          };
        });
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error("We cannot insert something that is already inserted");
    }
    await pool.execute(
        "INSERT INTO `announcement` (`id`, `name`, `description`, `price`, `url`, `latitude`,`longitude`) VALUES(:id, :name, :description, :price, :url, :latitude, :longitude)",
        this
    );
  }
}
