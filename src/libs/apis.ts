import { Room } from '@/models/room';
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

export async function getRooms() {
  const result = await sanityClient.fetch<Room[]>(
    queries.getRoomsQuery,
    {},
    {
      cache: 'no-cache', // in development mode this is helpful
      // next: { revalidate: 1800 }, // 30 mins
    },
  );

  return result;
}

export async function getRoom(slug: string) {
  const result = await sanityClient.fetch<Room>(
    queries.getRoomQuery,
    { slug },
    {
      cache: 'no-cache', // in development mode this is helpful
      // next: { revalidate: 1800 }, // 30 mins
    },
  );

  return result;
}
