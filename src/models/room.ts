type Slug = {
  _key: string;
  current: string;
};

type CoverImage = {
  url: string;
};

export interface Image {
  _key: string;
  url: string;
}

type Amenity = {
  _key: string;
  amenity: string;
  icon: string;
};

export interface Room {
  _id: string;
  _type: string;
  coverImage: CoverImage;
  description: string;
  dimension: string;
  discount: number;
  images: Image[];
  isBooked: boolean;
  isFeatured: boolean;
  name: string;
  numberOfBeds: number;
  offeredAmenities: Amenity[];
  price: number;
  slug: Slug;
  specialNote: string;
  type: string;
}

export interface CreateBookingDto {
  user: string;
  hotelRoom: string;
  checkinDate: Date;
  checkoutDate: Date;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
}
