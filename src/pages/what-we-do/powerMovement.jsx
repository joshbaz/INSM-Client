import React from "react";
import { Link } from "react-router-dom";

const PowerMovement = () => {
  return (
    <section className="w-full bg-brand-lilac py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-5xl font-bold font-primary text-white leading-tight">
          Ready to Power the Movement?
        </h2>

        <p className="text-base md:text-lg font-secondary text-white/85 max-w-2xl leading-relaxed">
          True power that serves as a crucible: the church serves, single
          mothers recite their growth, this machine is set on building the
          economic future of Uganda.
        </p>

        <Link
          to="/how-to-help/join-the-assignment"
          className="inline-flex items-center justify-center text-base md:text-lg font-bold text-white bg-brand-teal hover:bg-brand-teal-600 transition-all duration-300 transform hover:scale-105 mt-2"
          style={{
            borderRadius: "99px",
            padding: "16px 48px",
            whiteSpace: "nowrap",
          }}
        >
          BECOME A MOTHER TODAY
        </Link>
      </div>
    </section>
  );
};

export default PowerMovement;
