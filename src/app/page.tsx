"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await signIn("credentials", { redirect: true, email, password });
    if (result?.error) {
      alert("Login failed");
    }
  };
  
  return (
    <div>
      <main>
        <div>Login please!</div>

        <div className="flex flex-col items-center justify-center min-h-screen">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 mt-2">Log In</button>
        </div>
      </main>
    </div>
  );
}
