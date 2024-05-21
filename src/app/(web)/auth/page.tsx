'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signUp } from 'next-auth-sanity/client';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const inputStyles =
  'block w-full rounded-lg border border-gray-300 p-2.5 text-black focus:outline-none sm:text-sm';

const defaultFormData = {
  name: '',
  email: '',
  password: '',
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();
  console.log(session);

  const loginHandler = async () => {
    try {
      await signIn();
      // push the user to the home page
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await signUp(formData);

      if (user) {
        toast.success('Success. Please sign in to continue.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setFormData(defaultFormData);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mx-auto w-80 space-y-4 p-6 sm:p-8 md:w-[70%] md:space-y-6">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Create an account
          </h1>
          <p>OR</p>
          <span className="inline-flex items-center">
            <AiFillGithub
              onClick={loginHandler}
              className="mr-3 cursor-pointer text-4xl text-black dark:text-white"
            />
            |{' '}
            <FcGoogle
              onClick={loginHandler}
              className="ml-3 cursor-pointer text-4xl"
            />
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            required
            value={formData.name}
            className={inputStyles}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            required
            value={formData.email}
            className={inputStyles}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleInputChange}
            minLength={6}
            className={inputStyles}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-tertiary-dark px-5 py-2.5 text-center text-sm font-medium focus:outline-none"
          >
            Sign up
          </button>
        </form>

        <button onClick={loginHandler} className="text-b700 underline">
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Auth;
