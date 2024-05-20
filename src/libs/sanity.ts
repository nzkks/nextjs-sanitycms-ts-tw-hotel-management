import { createClient } from 'next-sanity';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2022-03-25',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_STUDIO_TOKEN,
});

export default sanityClient;
