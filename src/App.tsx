const LandingPage = () => {
  return (
    <div className="font-serif">
      <header id="header" className="fixed top-0 w-full bg-[#00303F] text-white flex items-center py-2 z-10">
        <div className="w-1/5 ml-4">
          <img id="header-img" className="w-1/2" src="https://imgur.com/IXMsbAn.png" alt="company-logo" />
        </div>
        <nav id="nav-bar" className="w-4/5">
          <ul className="flex justify-around text-gray-400">
            <li><a className="nav-link" href="#overview">FinVents</a></li>
            <li><a className="nav-link" href="#story">Our Story</a></li>
            <li><a className="nav-link" href="#events">Events</a></li>
            <li><a className="nav-link" href="#contact">Get Started</a></li>
          </ul>
        </nav>
      </header>

      <main className="pt-20">
        {/* Overview Section */}
        <section id="overview" className="text-center py-20 bg-white">
          <h1 className="text-6xl tracking-widest mb-6">FinVents</h1>
          <p className="text-xl">~ TRANSPARENCY FOR YOUR SPECIAL EVENTS ~</p>
          <div className="mt-10">
            <img className="w-full max-w-3xl mx-auto" src="https://imgur.com/9Qe5nd2.jpg" alt="Event planning" />
          </div>
        </section>

        {/* Our Story Section */}
        <section id="story" className="flex flex-col-reverse lg:flex-row items-center py-20 bg-[#00303F] text-white">
          <div className="w-full lg:w-1/2 p-8">
            <h2 className="text-4xl mb-4 text-center">Our Story</h2>
            <p className="text-lg leading-relaxed text-justify">
              FinVents was founded with a mission to provide financial transparency for major life events like weddings, graduations, and corporate events. 
              In collaboration with Capital One, we aim to help people manage and track their event expenses, ensuring clarity and confidence in every financial decision.
              Whether it's a wedding, a graduation, or any special celebration, we're here to simplify the process.
            </p>
          </div>
          <div className="w-full lg:w-1/2 p-8">
            <img className="w-full" src="https://imgur.com/f1RsywD.png" alt="Celebration event" />
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-20 bg-white text-center">
          <h2 className="text-4xl mb-6">Events We Support</h2>
          <p className="mb-10">From weddings to graduations, we have you covered.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            <figure className="w-full">
              <img src="https://imgur.com/twqvpsQ.png" alt="Wedding" className="w-full h-64 object-cover" />
              <figcaption className="text-sm mt-2">Weddings</figcaption>
            </figure>
            <figure className="w-full">
              <img src="https://imgur.com/7Bwtw2N.png" alt="Graduation" className="w-full h-64 object-cover" />
              <figcaption className="text-sm mt-2">Graduations</figcaption>
            </figure>
            <figure className="w-full">
              <img src="https://imgur.com/cwb7rrz.png" alt="Corporate Event" className="w-full h-64 object-cover" />
              <figcaption className="text-sm mt-2">Corporate Events</figcaption>
            </figure>
          </div>
        </section>



        {/* Contact Section */}
        <section id="contact" className="py-20 bg-[#00303F] text-white">
  <div className="text-center">
    <h2 className="text-4xl mb-4">Ready to try it out?</h2>
    
  </div>
  <div className="max-w-md mx-auto p-4 text-white ">
  <div className="text-center">
    <h2 className="text-2xl font-bold">Click here to get started</h2>
    <button
      onClick={() => window.location.href = '/login'} // Redirect to the login page
      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Get Started
    </button>
  </div>
</div>

</section>


      </main>

      <footer className="bg-[#00303F] text-white text-center py-4">
        <div className="flex justify-center space-x-4 mb-2">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
        <p>Created by FinVents Team in collaboration with Capital One<br />Copyright 2024</p>
      </footer>
    </div>
  );
};

export default LandingPage;
