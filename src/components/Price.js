import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import serviceContext from "../context/service/serviceContext";
import { Scissors, Clock, Tag } from "lucide-react";

const Price = () => {
  const [loading, setLoading] = useState(true);
  const context = useContext(serviceContext);
  const { service, getallservice } = context;

  useEffect(() => {
    try {
      getallservice();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const images = [
    "https://st3.depositphotos.com/12039320/16154/i/450/depositphotos_161544120-stock-photo-hairstylist-washing-clients-hair.jpg",
    "https://im.whatshot.in/img/2021/Jul/istock-872361244-cropped-1624514729-1626177802.jpg",
    "https://th.bing.com/th/id/OIP.nOmi8i8eyuHZ_p-lqXnLtAHaE7?w=274&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const capitalize = (word) => {
    if (!word) return "";
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  let result = service.map((srv, idx) => {
    let unit = srv.time <= 3 ? "hrs" : "min";
    return (
      <div className="p-4 w-full sm:w-1/2 lg:w-1/4" key={srv._id}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          whileHover={{ scale: 1.04 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-900">
                {capitalize(srv.name)}
              </h2>
              <Tag className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl text-purple-600 font-extrabold mb-2">
              Rs {srv.price}
            </p>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" /> Time: {srv.time} {unit}
            </p>
          </div>
        </motion.div>
      </div>
    );
  });

  return (
    <div className=" bg-gray-50 min-h-screen">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">

          {/* Image Carousel Header */}
          <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
            <div className="relative aspect-[16/7] w-full">

              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Salon ${currentIndex + 1}`}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                />
              </AnimatePresence>

              {/* Previous */}
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex(
                    (prev) => (prev - 1 + images.length) % images.length
                  )
                }
                className="
        absolute left-4 top-1/2 -translate-y-1/2
        flex h-10 w-10 items-center justify-center
        rounded-full bg-black/40 text-white
        backdrop-blur-sm
        transition-all duration-300
        hover:scale-110 hover:bg-black/60
      "
              >
                ❮
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex(
                    (prev) => (prev + 1) % images.length
                  )
                }
                className="
        absolute right-4 top-1/2 -translate-y-1/2
        flex h-10 w-10 items-center justify-center
        rounded-full bg-black/40 text-white
        backdrop-blur-sm
        transition-all duration-300
        hover:scale-110 hover:bg-black/60
      "
              >
                ❯
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                      ? "w-7 bg-white"
                      : "w-2.5 bg-white/50 hover:bg-white/80"
                      }`}
                  />
                ))}
              </div>

            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="sm:text-4xl text-3xl font-extrabold title-font text-gray-900 mb-3">
              Services List & Rates
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600 px-2">
              Explore available grooming offerings, estimated service times, and transparent pricing.
            </p>
          </div>

          <div className="flex flex-wrap -m-4 justify-center">
            {loading ? (
              <p className="text-gray-500 py-8">Loading services...</p>
            ) : (
              result
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 body-font mt-16">
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

export default Price;
