import { Dispatch, FC, SetStateAction } from 'react';
import { BsStarFill } from 'react-icons/bs';

type Props = {
  isOpen: boolean;
  ratingValue: number | null;
  setRatingValue: Dispatch<SetStateAction<number | null>>;
  ratingText: string;
  setRatingText: Dispatch<SetStateAction<string>>;
  onReviewSubmit: () => Promise<string | undefined>;
  isSubmittingReview: boolean;
  toggleRatingModal: () => void;
};

const RatingModal: FC<Props> = (props) => {
  const {
    isOpen,
    ratingValue,
    setRatingValue,
    ratingText,
    setRatingText,
    onReviewSubmit,
    isSubmittingReview,
    toggleRatingModal,
  } = props;

  const starValues = [1, 2, 3, 4, 5];

  return (
    <div
      className={`fixed inset-0 z-[61] flex items-center justify-center ${
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="w-96 rounded-lg bg-white p-4 shadow-lg">
        <h2 className="mb-2 text-xl font-semibold dark:text-gray-800">
          Rate Your Experience
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="flex items-center">
            {starValues.map((value) => (
              <button
                className={`h-6 w-6 ${
                  ratingValue === value ? 'text-yellow-500' : 'text-gray-300'
                }`}
                onClick={() => setRatingValue(value)}
                key={value}
              >
                <BsStarFill />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Review Text
          </label>

          <textarea
            value={ratingText}
            onChange={(e) => setRatingText(e.target.value)}
            rows={4}
            className="w-full rounded-md border px-2 py-3 text-black"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onReviewSubmit}
            className="rounded-md bg-primary px-4 py-2 text-white"
            disabled={isSubmittingReview}
          >
            {isSubmittingReview ? 'Submitting' : 'Submit'}
          </button>
          <button
            onClick={toggleRatingModal}
            className="ml-2 rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
