'use client';

import useSWR from 'swr';

import { getRoom } from '@/libs/apis';

const RoomDetails = (props: { params: { slug: string } }) => {
  const slug = props.params.slug;

  const fetchRoom = async () => getRoom(slug);
  const { data: room, error, isLoading } = useSWR('/api/room', fetchRoom);

  if (error) throw new Error('Error fetching room data');
  if (typeof room === 'undefined' && !isLoading) return <div>Loading...</div>;

  if (!room) return <div>Room not found</div>;

  return <div>{room && room.name}</div>;
};

export default RoomDetails;
