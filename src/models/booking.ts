export interface Booking {
  _id: string;
  hotelRoom: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
    coverImage: {
      url: string;
    };
    price: number;
  };
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
}
