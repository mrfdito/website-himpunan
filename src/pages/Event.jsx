import React from "react";
import EventListUser from "../components/EventListUser";

const Event = () => {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Event Himpunan Mahasiswa
      </h1>
      <section className="max-w-7xl mx-auto">
        <EventListUser />
      </section>
    </main>
  );
};

export default Event;
