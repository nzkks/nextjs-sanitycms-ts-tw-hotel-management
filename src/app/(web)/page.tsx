import HeroSection from '@/components/HeroSection/HeroSection';
import PageSearch from '@/components/PageSearch/PageSearch';
import Gallery from '@/components/Gallery/Gallery';
import NewsLetter from '@/components/NewsLetter/NewsLetter';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <PageSearch />

      {/* Featured room section */}

      <Gallery />
      <NewsLetter />
    </div>
  );
};

export default Home;
