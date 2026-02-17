import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-gray-400 uppercase">
            Get in touch
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-2">
            Contact <span className="text-(--primary)">Prescripto</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-500 mt-4 text-sm md:text-base">
            We’re here to help. Reach out to us for support, queries, or career
            opportunities.
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid md:grid-cols-2 gap-14 items-center mb-20">
          {/* Image */}
          <img
            src={assets.contact_image}
            alt="Contact Prescripto"
            className="w-full rounded-2xl shadow-sm"
          />

          {/* Info Section */}
          <div className="flex flex-col gap-8 text-sm md:text-base text-gray-600">
            {/* Office */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Our Office
              </h3>
              <p>
                54709 Willms Station <br />
                Suite 350, Washington, USA
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Contact Details
              </h3>
              <p>
                <span className="font-medium">Phone:</span> +91 538-657-8362
              </p>
              <p>
                <span className="font-medium">Email:</span> greatdev@gmail.com
              </p>
            </div>

            {/* Careers */}
            <div className="bg-gray-50 border-l-4 border-(--primary) p-5 rounded-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Careers at Prescripto
              </h3>
              <p className="mb-4">
                Join our growing team and help shape the future of digital
                healthcare.
              </p>

              <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-(--primary) text-(--primary) font-medium hover:bg-(--primary) hover:text-white transition-all duration-300">
                Explore Jobs →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
