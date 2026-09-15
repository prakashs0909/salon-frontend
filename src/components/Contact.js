import React from "react";
import { Link } from "react-router-dom";
import { Scissors, MapPin, Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="text-gray-600 body-font relative py-16">
        <div className="container px-5 mx-auto flex flex-wrap">
          
          {/* Google Maps Iframe */}
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-2xl overflow-hidden sm:mr-10 p-4 flex items-end justify-start relative w-full border border-gray-200 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1755.4275570689451!2d77.27869112887299!3d28.36322965139744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdfb4a68add7b%3A0x8d0db627fd217e8e!2sFashion%20Corner!5e0!3m2!1sen!2sin!4v1721325248753!5m2!1sen!2sin"
              width="100%"
              height="450"
              title="map"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Details Panel */}
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-2xl p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 border border-gray-200 shadow-lg space-y-6">
            <h2 className="text-gray-900 text-2xl font-bold title-font border-b border-gray-100 pb-3">
              Contact Us
            </h2>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-purple-600" /> Address
              </label>
              <p className="text-gray-800 font-semibold text-base">Fashion Corner Salon</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-purple-600" /> Email
              </label>
              <div>
                <a
                  href="mailto:example@email.com"
                  className="text-purple-600 font-semibold hover:underline"
                >
                  example@email.com
                </a>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-purple-600" /> Phone
              </label>
              <p className="text-gray-800 font-semibold text-base">123-456-7890</p>
            </div>
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

export default Contact;
