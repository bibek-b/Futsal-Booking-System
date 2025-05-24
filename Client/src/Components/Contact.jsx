import Connect from "../assets/getInTouchIcon.svg";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full h-screen p-10 flex flex-col items-center gap-15  ">
      <h1 className="text-5xl font-extrabold">Contact Us</h1>
      <form className="flex flex-col gap-4 w-[50%]" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <h2 className="font-bold text-3xl flex gap-2">
            Get in Touch{" "}
            <img src={Connect} alt="get in touch" className="w-10" />
          </h2>
          <span className="text-[#fc8b3a] text-[18px]">
            Have a question or feedback? Fill out the form below and we'll get
            back to you as soon as possible.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Write Your Name"
            className="border rounded p-2 w-[60%] outline-none text-[18px]"
          />
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Write Your Email"
            className="border rounded p-2 w-[60%] outline-none text-[18px]"
          />
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            placeholder="Write Your Message"
            required
            rows={4}
            className="border resize-none p-2 rounded outline-none text-[18px]"
          ></textarea>
          <button
            type="submit"
            className=" p-2 w-25 bg-[#ff6b00] hover:bg-[#ff6a00a0] outline-0 rounded cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
