import React from "react";

const ContactUs = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full h-[500px] md:h-[600px] bg-cover bg-center flex items-end justify-center overflow-hidden group"
        style={{
          backgroundImage: `url("https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/contact.png")`,
        }}
      >
        {/* White transparent overlay on the image */}
        <div className="absolute inset-0 bg-white/50 transition-opacity duration-700"></div>

        {/* Content with glass background */}
        <div className="relative z-10 w-full">
          <div className="bg-white/60 backdrop-blur-md h-auto md:h-[340px] flex flex-col justify-center items-center p-6 md:p-12 text-center w-full shadow-sm border-t border-white/50">
            <h1 className="text-4xl md:text-6xl font-bold font-primary text-brand-dark uppercase tracking-tight leading-none">
              WE'RE HERE
              <br />
              TO HELP
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-secondary text-brand-dark text-base md:text-lg leading-relaxed">
            <p>
              For inquiries, questions, or to make a donation, please call us at{" "}
              <a
                href="tel:+256784323406"
                className="font-semibold underline cursor-pointer hover:text-brand-lilac/90"
              >
                +256 784 323 406
              </a>
              ,
              <br />
              Mon-Fri, 8:30am-5pm EAT
            </p>

            <div className="h-8" />

            <p>
              To visit us:
              <br />
              Lorem Ipsum
              <br />
              Lorem Ipsum
              <br />
              P.O. Box 37800
              <br />
              Kisaasi, Kampala
            </p>

            <div className="h-8" />

            <p>
              To manage your monthly gift or for questions about partnership or
              mentorship, please email us at{" "}
              <a
                href="mailto:recurringgiving@insmuganda.org"
                className="font-semibold underline cursor-pointer hover:text-brand-lilac/90"
              >
                recurringgiving@insmuganda.org
              </a>{" "}
              or call our team at{" "}
              <a
                href="tel:+256784323406"
                className="font-semibold underline cursor-pointer hover:text-brand-lilac/90"
              >
                +256 784 323 406
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
