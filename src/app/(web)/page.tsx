import HeroSection from '@/components/HeroSection/HeroSection';
import PageSearch from '@/components/PageSearch/PageSearch';
import Gallery from '@/components/Gallery/Gallery';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <PageSearch />

      {/* Featured room section */}

      <Gallery />

      {/* Newsletter section */}
    </div>
  );
};

export default Home;
