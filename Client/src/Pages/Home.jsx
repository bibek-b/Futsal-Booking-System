import HeroPage from "../Components/HeroPage";
import BookFutsal from "../Components/BookFutsal";
import About from "../Components/About";
import Contact from "../Components/Contact";
import { useInView } from "react-intersection-observer";
import { useActiveSectionStore } from "../stores/activeSection";
import { useEffect } from "react";
import SectionDivider from "../Components/common/SectionDivider";

const Home = () => {
  const { ref: homeRef, inView: homeInView } = useInView({
    threshold: 0,
    rootMargin: "-10% 0px -60% 0px",
  });
  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: 0,
    rootMargin: "-40% 0px -60% 0px",
  });
  const { ref: bookFutsalRef, inView: bookFutsalInView } = useInView({
    threshold: 0,
    rootMargin: "-40% 0px -60% 0px",
  });
  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0,
    rootMargin: "-40% 0px -60% 0px",
  });
  
  const setActiveLink = useActiveSectionStore(
    (state) => state.setActiveSection,
  );
  
    useEffect(() => {
      window.scrollTo({ top: 0 });
    }, []);

  useEffect(() => {
    if (homeInView) setActiveLink("/");
    else if (aboutInView) setActiveLink("aboutUs");
    else if (bookFutsalInView) setActiveLink("bookFutsal");
    else if (contactInView) setActiveLink("contactUs");
  }, [homeInView, aboutInView, bookFutsalInView, contactInView, setActiveLink]);

  return (
    <div className="bg-black w-screen text-white overflow-x-hidden">
      {/* ── Hero ── */}
      <section id="/" ref={homeRef} className="relative z-10">
        <HeroPage />
      </section>

      <SectionDivider />

      {/* ── About ── */}
      <section
        id="aboutUs"
        ref={aboutRef}
        className="relative z-10 py-24 px-6  max-w-7xl mx-auto"
      >
        <About />
      </section>

      <SectionDivider />

      {/* ── Book Futsal ── */}
      <section
        id="bookFutsal"
        ref={bookFutsalRef}
        className="relative z-10 py-24 px-6  max-w-7xl mx-auto"
      >
        <BookFutsal />
      </section>

      <SectionDivider />

      {/* ── Contact ── */}
      <section
        id="contactUs"
        ref={contactRef}
        className="relative z-10 py-24 px-6  max-w-7xl mx-auto"
      >
        <Contact />
      </section>
    </div>
  );
};

export default Home;
