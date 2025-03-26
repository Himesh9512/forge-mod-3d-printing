'use client';

import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleLogin = async () => {
    const results = await signIn('credentials', { redirect: false, email, password });

    if (results?.error) {
      alert('Login Failed');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {session?.user ? (
        <div>
          <div>Logged In</div>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      ) : (
        <div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Log In</Button>
        </div>
      )}
    </div>
  );
};

export default Login;
