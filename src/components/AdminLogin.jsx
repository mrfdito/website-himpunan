import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // sesuaikan pathnya

const adminEmails = [
  "admin@gmail.com",
  "weyitor472@bamsrad.com",
  // tambah email admin lain sesuai yang sudah dibuat di supabase
];

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (data.session) {
      const user = data.session.user;
      const isAdmin = adminEmails.includes(user.email.toLowerCase());

      if (isAdmin) {
        // Simpan info ke localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAdmin", "true");

        window.location.href = "/dashboard";
      } else {
        setErrorMsg("Anda bukan admin!");
        await supabase.auth.signOut();
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login Admin</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
