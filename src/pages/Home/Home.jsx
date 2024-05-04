import { useContext, useEffect, useRef } from "react";
import Hero from "../../components/Hero/Hero";
import HeroAlter from "../../components/Hero/HeroAlter";
import UserContext from "../../contexts/UserContext";

function Home() {
  // Create refs for each section
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const { user } = useContext(UserContext);

  console.log(user);

  // Function to scroll to the top of a section
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Intersection Observer callback
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        // Check if the entry is intersecting (in view)
        if (entry.isIntersecting) {
          // Smoothly scroll to the top of the section
          scrollToSection(entry.target);
        }
      });
    };

    // Create the Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Observe in the viewport
      rootMargin: "0px", // No margin
      threshold: 0.5, // Trigger when 50% of the section is in view
    });

    // Observe each section
    if (section1Ref.current) observer.observe(section1Ref.current);
    if (section2Ref.current) observer.observe(section2Ref.current);
    if (section3Ref.current) observer.observe(section3Ref.current);

    // Clean up the observer when the component unmounts
    return () => {
      if (section1Ref.current) observer.unobserve(section1Ref.current);
      if (section2Ref.current) observer.unobserve(section2Ref.current);
      if (section3Ref.current) observer.unobserve(section3Ref.current);
    };
  }, []);

  return (
    <>
      <Hero
        heading="Give And Take System"
        text="With this method you can get what you need from others without spending any money"
      />

      <HeroAlter
        refName={section1Ref}
        heading="Everything is Possible for Free"
        text="You can increase your Facebook, Instagram, YouTube, TikTok, Twitter, etc., likes, followers, subscribers, and other reactions for free while earning points."
      />

      <Hero
        refName={section2Ref}
        heading="Need More Point? Try the Paid Method"
        text="If you need millions of organic reactions and want to make your every post viral, then try paid option"
      />

      <HeroAlter
        refName={section3Ref}
        heading="Point Transfer, Exchange, Withdraw System"
        text="With your earned points, you can extend your reach to millions or billions by posting. Additionally, you can transfer, exchange, and withdraw points"
      />

      <Hero
        heading="Most Refer and Earn Big Opportunities"
        text="If you make 3 referals in the first month, you will get a point bonus equal to $20"
      />

      <HeroAlter
        heading="Passive Income Generating System"
        text="You can generate income from any social media platform or website through this platform"
      />
    </>
  );
}

export default Home;
