import HeroPage from "../Components/HeroPage";
import BookFutsal from "../Components/BookFutsal";
import About from "../Components/About";
import Contact from "../Components/Contact";
import { useInView } from "react-intersection-observer";
import { useActiveSectionStore } from "../stores/activeSection";
import { useEffect } from "react";

const Home = () => {
  const { ref: homeRef, inView: homeInView } = useInView({ threshold: 0,
    rootMargin: "-10% 0px -60% 0px"
   });
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0,
    rootMargin: "-40% 0px -60% 0px"
   });
  const { ref: bookFutsalRef, inView: bookFutsalInView } = useInView({
    threshold: 0,
    rootMargin: "-40% 0px -60% 0px"
  });
  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0,
    rootMargin: "-40% 0px -60% 0px"
  });

  const setActiveLink = useActiveSectionStore(
    (state) => state.setActiveSection
  );

  useEffect(() => {
    window.scrollTo({top: 0})
  },[])

  useEffect(() => {
      if (homeInView) setActiveLink("/");
      else if (aboutInView) setActiveLink("about");
      else if (bookFutsalInView) setActiveLink("bookFutsal");
      else if (contactInView) setActiveLink("contact");
  }, [homeInView, aboutInView, bookFutsalInView, contactInView, setActiveLink]);

  return (
    <div className="bg-[#1a1a1a] w-screen h-[100%] text-[#ffffff] space-y-15 px-10">
      <section id="/" ref={homeRef}>
        <HeroPage />
      </section>
      <section id="about" ref={aboutRef}>
        <About />
      </section>
      <section id="bookFutsal" ref={bookFutsalRef}>
        <BookFutsal />
      </section>
      <section id="contact" ref={contactRef}>
        <Contact />
      </section>
    </div>
  );
};

export default Home;
