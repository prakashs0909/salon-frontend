import React from "react";
import { Link } from "react-router-dom";
import { Scissors } from "lucide-react";

const About = () => {
  return (
    <div className=" bg-white min-h-screen">
      {/* Mission Hero Banner */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://wallpaperaccess.com/full/3937949.jpg"
          alt="Salon background"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-40"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Our Mission
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Our mission at Fashion Corner is to empower our clients by enhancing
              their natural beauty through expert hair, skincare, and nail
              services, provided in a welcoming environment. We
              strive to exceed expectations by delivering personalized
              treatments, professional advice, and a commitment to customer
              satisfaction.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col-reverse bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <dt className="text-base leading-7 text-gray-300">Downloads</dt>
                <dd className="text-3xl font-extrabold text-white">1K+</dd>
              </div>
              <div className="flex flex-col-reverse bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <dt className="text-base leading-7 text-gray-300">New Users Annually</dt>
                <dd className="text-3xl font-extrabold text-white">300+</dd>
              </div>
              <div className="flex flex-col-reverse bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <dt className="text-base leading-7 text-gray-300">Hours per Day</dt>
                <dd className="text-3xl font-extrabold text-white">12</dd>
              </div>
              <div className="flex flex-col-reverse bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <dt className="text-base leading-7 text-gray-300">Music & Ambience</dt>
                <dd className="text-3xl font-extrabold text-white">Unlimited</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="text-gray-600 body-font py-20">
        <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h2 className="title-font sm:text-4xl text-3xl mb-6 font-extrabold text-gray-900">
              About Fashion Corner
            </h2>
            <p className="mb-8 leading-relaxed text-gray-700 text-base">
              A salon is a place where beauty and grooming services are offered,
              typically specializing in hair care, skincare, and nail care.
              It provides a relaxing environment where trained professionals,
              such as hairstylists and estheticians, offer services ranging
              from haircuts and coloring to facials and grooming.
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded-2xl shadow-xl border border-gray-200"
              alt="Salon Interior"
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800"
            />
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

export default About;
