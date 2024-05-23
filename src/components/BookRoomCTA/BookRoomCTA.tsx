'use client';

import { FC } from 'react';

type Props = {
  discount: number;
  price: number;
};

const BookRoomCTA: FC<Props> = (props) => {
  const { discount, price } = props;

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
    </div>
  );
};

export default BookRoomCTA;
