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

export const getRoomQuery = groq`*[_type == "hotelRoom" && slug.current == $slug][0] {
  _id,
  coverImage,
  description,
  dimension,
  discount,
  images,
  isBooked,
  isFeatured,
  name,
  numberOfBeds,
  offeredAmenities,
  price,
  slug,
  specialNote,
  type
}`;

export const getUserBookingsQuery = groq`*[_type == "booking" && user._ref == $userId] {
  _id,
  hotelRoom -> {
    _id,
    name,
    slug,
    coverImage,
    price
  },
  checkinDate,
  checkoutDate,
  numberOfDays,
  adults,
  children,
  totalPrice,
  discount
}`;
