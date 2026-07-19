import HeroSection       from "@/components/landing/HeroSection";
import FeaturesSection   from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import LandingNav        from "@/components/landing/LandingNav";
import StatsSection      from "@/components/landing/StatsSection";
import IntroOverlay      from "@/components/landing/IntroOverlay";
import EventsShowcase    from "@/components/landing/EventsShowcase";
import ReviewsSection    from "@/components/landing/ReviewsSection";
import LandingFooter     from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <>
      <IntroOverlay />
      <LandingNav />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <section id="events">
        <EventsShowcase />
      </section>
      <section id="reviews">
        <ReviewsSection />
      </section>
      <LandingFooter />
    </>
  );
}
