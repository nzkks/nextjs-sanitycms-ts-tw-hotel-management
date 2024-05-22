import { groq } from 'next-sanity';

export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" && isFeatured == true][0] {
  _id,
  description,
  discount,
  coverImage,
  images,
  name,
  slug,
  price,
  isFeatured
}`;

export const getRoomsQuery = groq`*[_type == "hotelRoom"] {
  _id,
  description,
  discount,
  coverImage,
  images,
  name,
  slug,
  price,
  isFeatured,
  isBooked,
  type,
  offeredAmenities,
  numberOfBeds
}`;
