import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HairCuttingIcon, BeardShavingIcon, HairColouringIcon, HairStylingIcon, FacialTreatmentsIcon, ScalpTreatmentIcon } from "./Icons"; 


const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://png.pngtree.com/background/20230610/original/pngtree-hair-salon-with-black-lighting-and-chandelier-picture-image_3105657.jpg)",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="mx-auto max-w-2xl py-32 sm:py-50 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-violet-400 italic	font-mono  sm:text-6xl">
              RECLAIM YOUR CONFIDENCE
            </h1>
            <p className=" text-lg leading-8 text-gray-100 p-4">
              We show your skin, hair and body the care and attention they
              deserve. Your hair is a reflection of your personality and we know
              how to bring out the real you. Let our professionals cut and style
              your hair to complement your facial features, then and a personal
              touch.
            </p>
            <div className="text-center mt-10">
              <button
                className="inline-flex items-center bg-purple-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-3 md:mt-0 hover:text-gray-100"
                onClick={() => navigate("/BookingForm")}
              >
                Book Now
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="text-gray-600 body-font bg-gray-100 py-24">
        <div className="container px-5 mx-auto">
          <h2 className="text-3xl font-medium text-center text-gray-900 mb-16">Our Services</h2>
          <div className="flex flex-wrap -m-4">
            {/* Service Cards */}
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex w-full mb-20 flex-wrap">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
              Photo Gallery
            </h1>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://th.bing.com/th/id/OIP.Uiv67eFiyZAoO6YES6HBiwAAAA?rs=1&pid=ImgDetMain"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://i2.wp.com/www.hairstyle.org.in/wp-content/uploads/2017/04/Curly-Hairstyle-For-Men-In-2019.jpg?fit=629%2C955&ssl=1"
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src="https://th.bing.com/th/id/R.25e40d99c141045355f0c549014d6adb?rik=Ai3d3Ao86ESZmQ&riu=http%3a%2f%2fcoolmenshair.com%2fwp-content%2fuploads%2ffaux-hawk-hairstyle-3.jpg&ehk=LKFUrBkT7cixYfktFrqSSqzOoIWub4%2biAZcpm2%2biEg0%3d&risl=&pid=ImgRaw&r=0"
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src="https://th.bing.com/th/id/R.3f9dd672c41c481d7a01dce3f6174260?rik=j5MQ%2b4kTlOGdFA&riu=http%3a%2f%2fwww.mens-hairstyle.com%2fwp-content%2fuploads%2f2017%2f05%2fBest-Hairstyle-for-Men.jpg&ehk=kmc5%2fWhiyh4IquyKFzUqX6x1iqG0ZU8hXbuAzoz5Cao%3d&risl=&pid=ImgRaw&r=0"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://th.bing.com/th/id/R.8f7c84d65c41e90f13d81d6b1bfd8685?rik=4CmW8YL4tz9dPw&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f03%2fmens-hairstyles-4.jpg&ehk=BTt%2b3W3Ul3EXRHaUMti98NtokLibBkLWji4dzTdzHu4%3d&risl=&pid=ImgRaw&r=0"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://th.bing.com/th/id/OIP.9uxhpi8WL9heIlUcyxSTSAHaJO?w=1232&h=1536&rs=1&pid=ImgDetMain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 body-font rounded-top">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            to="/Home"
            className="flex title-font font-medium items-center md:justify-start justify-center"
          >
            <svg
              fill="#b690f9"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 376.715 376.715"
              className="w-8 h-8"
            >
              <g>
                <path
                  d="M347.291,116.456c-10.813,16.763-20.879,9.692-20.879,9.692s25.725-18.018,14.911-35.417
c-9.318,17.031-19.01,12.687-19.01,12.687s15.285-31.435,1.868-35.417c-5.582,13.68-24.23,2.978-24.23,2.978
s10.93-9.079,17.516-4.46c0.129-9.208-26.46-11.192-26.46-11.192s3.468-7.952,0-11.561c-3.106,3.48-9.318,1.635-9.318,1.635
s4.601-15.554-5.593-16.908c3.094,10.428-12.051,11.42-11.935,6.971c-11.934-25.608-30.933-18.532-30.933-18.532
s-5.967-5.838,0-11.181c-4.718-3.731-27.569,8.945-27.569,8.945l-15.647-7.462c0,0-15.928-10.293-22.012-6.323
c8.571,6.458,5.967,21.614,5.967,21.614S160.795,5.144,156.078,7.246c3.736,5.109,0,7.83,0,7.83s-8.314-11.187-17.516-10.807
c-9.19,0.374-13.779,12.29-14.538,12.29s-2.371-7.818,0-12.29c-9.202,0.123-12.308,31.195-12.308,31.195s-6.972-10.819,0-19.653
c-18.894,2.616-4.834,21.626-4.834,21.626s-8.711-2.615-15.659,0c-6.948,2.61-11.059,8.192-17.143,10.439
c-6.083,2.225-14.036-5.103-13.417,7.824c3.597-0.759,10.813,0,10.813,0s-6.715,11.549-7.462,12.669
c-0.759,1.127-9.447-9.931-20.143-7.817c-10.685,2.119-3.094,14.777,1.133,7.817c4.227-6.942,21.649,11.292,27.208,4.846
c5.57-6.446,16.78-12.675,16.78-12.675s-5.722,15.414-11.561,17.147c-5.839,1.746-17.878,0.753-20.867,9.698
c-2.989,8.944,1.857,24.977,1.857,24.977s-46.58-6.837-21.614,19.74c-4.227-19.373,25.222-5.956,25.222-5.956
s-14.176,3.842-15.168,10.428c-0.993,6.592,8.944,11.304,5.593,19.758c-3.351,8.454-24.218,4.484-22.361-4.724
c-13.043,13.914,26.962,18.257,29.823,6.586c2.849-11.683-0.631-13.919,2.113-18.642c1.95-3.393,10.755-5.559,15.578-6.516
c0.666,10.906,2.989,20.23,4.962,25.281c0.141,0.526,0.245,1.063,0.374,1.612c-2.942,0.595-7.532,0.595-11.222-4.601
c-1.542,7.485,7.123,8.595,11.875,8.665c0.514,4.975-0.117,10.369-3.503,15.46c-7.111,10.679-15.063,15.577-17.632,22.724
c-3.644,9.984,15.554,11.724,15.554,11.724l0.047,3.783c0,0-6.166,5.967-4.846,10.626c1.74,6.225,14.106,4.018,14.106,4.018
s-11.864,4.367-11.304,10.158c0.549,5.77,5.512,8.291,5.512,8.291s-11.49,22.584,5.406,27.559
c16.897,4.951,51.181-15.672,55.653,8.43c4.32,16.641,23.576,57.464,16.908,65.101c-6.679,7.648-16.908,19.384-16.908,19.384
l175.425,5.465c0,0-54.17-70.074-59.623-78.015c-5.465-7.94-28.27-40.018-8.396-61.865c0.923-1.027,1.927-2.23,2.931-3.409
c5.874,3.082,17.68,7.449,26.705-0.877c12.483-11.571,12.483-21.812,12.483-21.812s22.735,5.22,16.955-1.296
c-5.769-6.516,12.121-27.762,12.121-27.762s6.819,5.085,3.725,13.796c11.047-1.751,3.363-20.143,3.363-20.143s3.095,3.106,9.681,0
c-6.972-3.24-4.1-21.988-4.1-21.988S355.733,141.183,347.291,116.456z"
                />
              </g>
            </svg>
            <span className="ml-3 text-xl pt-3">Salon</span>
          </Link>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-700 sm:py-2 sm:mt-0 mt-4">
            © 2024 Salon —
            <a
              href="https://twitter.com/knyttneve"
              className="text-gray-400 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @knyttneve
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              href="https://www.facebook.com/"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://x.com/?lang=en-in"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/?hl=en"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="https://in.linkedin.com/"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
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

const ServiceCard = ({ service }) => {
  return (
    <div className="p-4 lg:w-1/3 md:w-1/2">
      <div className="h-full bg-white shadow-sm rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
        <div className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            {service.icon}
          </div>
          <h2 className="text-lg tracking-widest font-medium text-gray-900 mb-3">
            {service.title}
          </h2>
          <p className="leading-relaxed text-base text-gray-700 mb-3">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
