'use client';

import { FC } from 'react';

type Props = {
  discount: number;
  price: number;
  specialNote: string;
};

const BookRoomCTA: FC<Props> = (props) => {
  const { discount, price, specialNote } = props;

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
    </div>
  );
};

export default BookRoomCTA;
