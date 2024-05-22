import { Room } from '@/app/models/room';
import sanityClient from './sanity';
import * as queries from './sanityQueries';

export async function getFeaturedRoom() {
  const result = await sanityClient.fetch<Room>(
    queries.getFeaturedRoomQuery,
    {},
    {
      cache: 'no-cache', // in development mode this is helpful
      // next: { revalidate: 1800 }, // 30 mins
    },
  );

  return result;
}
