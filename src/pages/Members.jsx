// pages/Members.jsx
import React from "react";
import MembersList from "../components/MembersList";

const Members = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Daftar Anggota HIMAKOM
      </h1>
      <MembersList />
    </div>
  );
};

export default Members;
