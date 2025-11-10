import ExperienceModal from './components/ExperienceModal';
import Layout from './components/Layout';
import PortfolioSection from './components/PortfolioSection';
import Timeline from './components/Timeline';
import HeroSection from './sections/HeroSection';

const App = () => {
  return (
    <Layout>
      <HeroSection />
      <Timeline
        sectionId="timeline"
        track="professional"
        headingKey="timeline.professional.heading"
        subheadingKey="timeline.professional.subheading"
      />
      <Timeline
        sectionId="timeline-learning"
        track="education"
        headingKey="timeline.education.heading"
        subheadingKey="timeline.education.subheading"
      />
      <PortfolioSection />
      <ExperienceModal />
    </Layout>
  );
};

export default App;
