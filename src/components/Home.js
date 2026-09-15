import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Scissors, ArrowRight, Calendar } from "lucide-react";
import { HairCuttingIcon, BeardShavingIcon, HairColouringIcon, HairStylingIcon, FacialTreatmentsIcon, ScalpTreatmentIcon } from "./Icons";

const Home = () => {
  const navigate = useNavigate();
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://png.pngtree.com/background/20230610/original/pngtree-hair-salon-with-black-lighting-and-chandelier-picture-image_3105657.jpg)",
          width: "100%",
          minHeight: "85vh",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto max-w-4xl py-32 px-4 sm:py-40 text-center flex flex-col items-center justify-center">
          <h1
            ref={headlineRef}
            className="text-4xl font-extrabold tracking-tight text-violet-400 italic sm:text-6xl uppercase drop-shadow-lg"
          >
            RECLAIM YOUR CONFIDENCE
          </h1>
          <p
            ref={subtextRef}
            className="text-base sm:text-lg leading-relaxed text-gray-100 p-4 max-w-2xl"
          >
            We show your skin, hair and body the care and attention they
            deserve. Your hair is a reflection of your personality and we know
            how to bring out the real you. Let our professionals cut and style
            your hair to complement your facial features.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6"
          >
            <button
              className="inline-flex items-center gap-2 bg-purple-600 text-white font-semibold py-3 px-6 hover:bg-purple-700 rounded-lg shadow-lg transition duration-300"
              onClick={() => navigate("/BookingForm")}
            >
              <Calendar className="w-5 h-5" />
              Book Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <section className="text-gray-600 body-font bg-gray-100 py-24">
        <div className="container px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16 uppercase tracking-wide">
            Our Services
          </h2>
          <div className="flex flex-wrap -m-4">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="text-gray-600 body-font bg-white">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex w-full mb-12 flex-wrap">
            <h2 className="sm:text-3xl text-2xl font-bold title-font text-gray-900">
              Photo Gallery
            </h2>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg shadow hover:opacity-95 transition-opacity"
                  src="https://th.bing.com/th/id/OIP.Uiv67eFiyZAoO6YES6HBiwAAAA?rs=1&pid=ImgDetMain"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg shadow hover:opacity-95 transition-opacity"
                  src="https://i2.wp.com/www.hairstyle.org.in/wp-content/uploads/2017/04/Curly-Hairstyle-For-Men-In-2019.jpg?fit=629%2C955&ssl=1"
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block rounded-lg shadow hover:opacity-95 transition-opacity"
                  src="https://th.bing.com/th/id/R.25e40d99c141045355f0c549014d6adb?rik=Ai3d3Ao86ESZmQ&riu=http%3a%2f%2fcoolmenshair.com%2fwp-content%2fuploads%2ffaux-hawk-hairstyle-3.jpg&ehk=LKFUrBkT7cixYfktFrqSSqzOoIWub4%2biAZcpm2%2biEg0%3d&risl=&pid=ImgRaw&r=0"
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block rounded-lg shadow hover:opacity-95 transition-opacity"
                  src="https://th.bing.com/th/id/R.3f9dd672c41c481d7a01dce3f6174260?rik=j5MQ%2b4kTlOGdFA&riu=http%3a%2f%2fwww.mens-hairstyle.com%2fwp-content%2fuploads%2f2017%2f05%2fBest-Hairstyle-for-Men.jpg&ehk=kmc5%2fWhiyh4IquyKFzUqX6x1iqG0ZU8hXbuAzoz5Cao%3d&risl=&pid=ImgRaw&r=0"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg shadow hover:opacity-95 transition-opacity"
                  src="https://th.bing.com/th/id/R.8f7c84d65c41e90f13d81d6b1bfd8685?rik=4CmW8YL4tz9dPw&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f03%2fmens-hairstyles-4.jpg&ehk=BTt%2b3W3Ul3EXRHaUMti98NtokLibBkLWji4dzTdzHu4%3d&risl=&pid=ImgRaw&r=0"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg shadow hover:opacity-95 transition-opacity"
                  src="https://th.bing.com/th/id/OIP.9uxhpi8WL9heIlUcyxSTSAHaJO?w=1232&h=1536&rs=1&pid=ImgDetMain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            to="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-white gap-2"
          >
            <div className="p-1.5 rounded-lg bg-violet-600">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Fashion Corner</span>
          </Link>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-700 sm:py-2 sm:mt-0 mt-4">
            © 2026 Salon —
            <a
              href="https://twitter.com/knyttneve"
              className="text-gray-400 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @knyttneve
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start gap-4">
            <a href="https://www.facebook.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a href="https://x.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a href="https://in.linkedin.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

const services = [
  {
    icon: <HairCuttingIcon />,
    title: "Hair Cutting",
    description: "Shaping and styling hair to achieve desired looks and textures."
  },
  {
    icon: <BeardShavingIcon />,
    title: "Beard Shaving/Trimming",
    description: "Trimming and shaping facial hair to maintain a desired length and style."
  },
  {
    icon: <HairColouringIcon />,
    title: "Hair Colouring",
    description: "Changing the hair's color using various dyes to achieve a desired look or cover gray hairs."
  },
  {
    icon: <HairStylingIcon />,
    title: "Hair Styling",
    description: "Styling hair for special occasions or daily wear."
  },
  {
    icon: <FacialTreatmentsIcon />,
    title: "Facial Treatments",
    description: "Skin care treatments such as facial cleansing, exfoliation, and moisturizing."
  },
  {
    icon: <ScalpTreatmentIcon />,
    title: "Scalp Treatments",
    description: "Treatments aimed at improving scalp health and hair growth."
  }
];

const ServiceCard = ({ service, index }) => {
  return (
    <div className="p-4 lg:w-1/3 md:w-1/2 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ scale: 1.03 }}
        className="h-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200"
      >
        <div className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            {service.icon}
          </div>
          <h3 className="text-lg tracking-wide font-bold text-gray-900 mb-3">
            {service.title}
          </h3>
          <p className="leading-relaxed text-base text-gray-600">
            {service.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
