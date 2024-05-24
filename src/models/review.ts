export interface UpdateReviewDto {
  reviewId: string;
  reviewText: string;
  userRating: number;
}

export interface CreateReviewDto {
  userId: string;
  hotelRoomId: string;
  reviewText: string;
  userRating: number;
}
