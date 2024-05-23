'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  calcMinCheckoutDate: () => Date | null;
  adults: number;
  setAdults: Dispatch<SetStateAction<number>>;
  noOfChildren: number;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  discount: number;
  price: number;
  specialNote: string;
};

const BookRoomCTA: FC<Props> = (props) => {
  const {
    discount,
    price,
    specialNote,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    calcMinCheckoutDate,
    adults,
    setAdults,
    noOfChildren,
    setNoOfChildren,
  } = props;

  const discountPrice = price - (price * discount) / 100;

  return (
    <div className="px-7 py-6">
      <h3>
        <span
          className={`${discount ? 'text-gray-400' : ''} text-xl font-bold`}
        >
          $ {price}
        </span>
        {discount ? (
          <span className="text-xl font-bold">
            {' '}
            | discount {discount}%. Now{' '}
            <span className="text-tertiary-dark">$ {discountPrice}</span>
          </span>
        ) : (
          ''
        )}
      </h3>

      <div className="my-2 w-full border-b-2 border-b-secondary" />

      <h4 className="my-8">{specialNote}</h4>

      <div className="flex">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="check-in-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check In date
          </label>
          <DatePicker
            id="check-in-date"
            selected={checkinDate}
            onChange={(date) => setCheckinDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-black focus:border-primary focus:ring-primary"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="check-out-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check Out date
          </label>
          <DatePicker
            id="check-out-date"
            selected={checkoutDate}
            onChange={(date) => setCheckoutDate(date)}
            dateFormat="dd/MM/yyyy"
            disabled={!checkinDate}
            minDate={calcMinCheckoutDate()}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-black focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      <div className="mt-4 flex">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Adults
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={(e) => setAdults(+e.target.value)}
            min={1}
            max={5}
            className="w-full rounded-lg border border-gray-300 p-2.5"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Children
          </label>
          <input
            type="number"
            id="children"
            value={noOfChildren}
            onChange={(e) => setNoOfChildren(+e.target.value)}
            min={0}
            max={3}
            className="w-full rounded-lg border border-gray-300 p-2.5"
          />
        </div>
      </div>
    </div>
  );
};

export default BookRoomCTA;
