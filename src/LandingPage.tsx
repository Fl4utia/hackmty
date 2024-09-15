import { SignIn, SignUp } from "@clerk/clerk-react";

const LandingPage = () => {
  return (
    <div className="font-serif">
      <header
        id="header"
        className="fixed top-0 w-full bg-[#030f12] text-white flex items-center py-2 z-10"
      >
        <div className="w-1/5 ml-4">
          <img
            id="header-img"
            className="w-1/2"
            src="https://images2.imgbox.com/27/ac/VlF6wjCv_o.png"
            alt="company-logo"
          />
        </div>
        <nav id="nav-bar" className="w-4/5">
          <ul className="flex justify-around text-gray-400">
            <li>
              <a className="nav-link" href="#norm">
                Norm
              </a>
            </li>
            <li>
              <a className="nav-link" href="#story">
                Our Story
              </a>
            </li>
            <li>
              <a className="nav-link" href="#designs">
                Designs
              </a>
            </li>
            <li>
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="pt-20">
        {/* Norm Section */}
        <section id="norm" className="text-center py-20 bg-white">
          <h1 className="text-6xl tracking-widest mb-6">NORM</h1>
          <p className="text-xl">~ THE INTERIOR STANDARD ~</p>
          <div className="mt-10">
            <img
              className="w-full max-w-3xl mx-auto"
              src="https://images2.imgbox.com/75/2b/xlGEMbdX_o.jpg"
              alt="Living room sample"
            />
          </div>
        </section>

        {/* Our Story Section */}
        <section
          id="story"
          className="flex flex-col-reverse lg:flex-row items-center py-20 bg-[#030f12] text-white"
        >
          <div className="w-full lg:w-1/2 p-8">
            <h2 className="text-4xl mb-4 text-center">Our Story</h2>
            <p className="text-lg leading-relaxed text-justify">
              Furnishing your home can be quite overwhelming at times, at least
              that's how it was for us. Norm was born to help others going
              through the maze that is interior design. We decided to curate
              modern interior design trends, inspirations, tips and tricks from
              the vast interior collective to help you bring your home to life.
            </p>
          </div>
          <div className="w-full lg:w-1/2 p-8">
            <img
              className="w-full"
              src="https://roohome.com/wp-content/uploads/2016/10/scandinavian-small-apartment-interior.jpg"
              alt="Scandinavian apartment interior"
            />
          </div>
        </section>

        {/* Featured Designs Section */}
        <section id="designs" className="py-20 bg-white text-center">
          <h2 className="text-4xl mb-6">Featured</h2>
          <p className="mb-10">
            Take a look at some of our featured picks that have made editorial
            debuts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            <figure className="w-full">
              <img
                src="https://images2.imgbox.com/78/40/AXaX0dGj_o.jpg"
                alt="modern style living room"
                className="w-full"
              />
              <figcaption className="text-sm mt-2">
                Image by Michal Jarmoluk from Pixabay
              </figcaption>
            </figure>
            <figure className="w-full">
              <img
                src="https://images2.imgbox.com/61/65/spezPzqR_o.jpg"
                alt="Grey sofa in minimalist living room"
                className="w-full"
              />
              <figcaption className="text-sm mt-2">
                Image by StockSnap from Pixabay
              </figcaption>
            </figure>
            <figure className="w-full">
              <img
                src="https://images2.imgbox.com/08/37/9tQMXva6_o.jpg"
                alt="Living Room Modern Interior"
                className="w-full"
              />
              <figcaption className="text-sm mt-2">
                Image by miapirttila from Pixabay
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-[#030f12] text-white">
          <div className="text-center">
            <h2 className="text-4xl mb-4">Get started TODAY!</h2>
            <p className="mb-8">Choose an option to get started:</p>
          </div>
          <div className="max-w-md mx-auto p-4 bg-white text-black rounded-lg shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <SignIn fallbackRedirectUrl={"/dashboard"} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              <SignUp fallbackRedirectUrl={"/dashboard"} />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1d2c2f] text-white text-center py-4">
        <div className="flex justify-center space-x-4 mb-2">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
        <p>
          Created by Lulet. Reach out on twitter @luizoutlets
          <br />
          Copyright 2019
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
