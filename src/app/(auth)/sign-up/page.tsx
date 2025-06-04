'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/lib/queries/user';

import { User, Mail, Lock } from 'lucide-react';

const formSchema = z
  .object({
    name: z.string().min(3, { message: 'Name should be between 3 to 20 characters' }).max(20),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(4, { message: 'Enter at least 4 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password does not match',
  });

const SignUp = () => {
  const { status } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, email, password } = values;

    const results = registerUser({ name, email, password });

    toast.promise(results, {
      loading: 'Registering user...',
      success: () => 'User registered successfully!',
      error: (err) => `${err}`,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md rounded-[48px] bg-[#e0e0e0] p-8 shadow-lg">
        <h1 className="text-3xl text-black md:text-3xl font-bold text-center mb-6">Create an account</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Name"
                        className="pl-10 border-b text-black border-gray-400 rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-black"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        className="pl-10 border-b text-black border-gray-400 rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-black"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="pl-10 border-b text-black border-gray-400 rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-black"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                        className="pl-10 border-b text-black border-gray-400 rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-black"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
            >
              SIGN UP
            </Button>

            {/* Footer */}
            <p className="text-center text-black text-sm mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-orange-600 font-semibold hover:underline">
                Login Up
              </a>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
