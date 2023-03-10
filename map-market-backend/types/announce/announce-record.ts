export interface SimpleAnnounceEntity {
  id: string;
  latitude: number;
  longitude: number;
}

export interface AnnounceEntity extends SimpleAnnounceEntity {
  name: string;
  description: string;
  price: number;
  url: string;
}
