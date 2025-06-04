'use client';


import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInUser } from '@/lib/queries/user';
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(4, { message: 'Enter atleast 4 characters' }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const email = values.email;
    const password = values.password;

    const results = signInUser(email, password);

    toast.promise(results, {
      loading: 'Logging in...',
      success: () => 'Login Successful!',
      error: (err) => `${err}`,
    });
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm p-8 rounded-[48px] bg-[#e0e0e0] shadow-md">
        <h1 className="text-3xl font-bold text-black text-center mb-6">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        {...field}
                        className="pl-10 border-b border-gray-400 text-black rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-black"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Password</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="pl-10 pr-10 border-b text-black border-gray-400 rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-black"
                      />
                    </FormControl>
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-700">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-xs hover:underline">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
            >
              LOGIN
            </Button>

            {/* Sign up */}
            <p className="text-center text-black text-sm mt-4">
              Don’t have an account?{" "}
              <a href="/sign-up" className="text-red-500 font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );

};

export default Login;
