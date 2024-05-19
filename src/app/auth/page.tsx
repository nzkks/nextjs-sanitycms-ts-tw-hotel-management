'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const inputStyles =
  'rounded:lg block w-full border border-gray-300 p-2.5 text-black focus:outline-none sm:text-sm';

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log(formData);
    } catch (error) {
      console.error(error);
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
            <AiFillGithub className="mr-3 cursor-pointer text-4xl text-black dark:text-white" />
            | <FcGoogle className="ml-3 cursor-pointer text-4xl" />
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

        <button className="text-b700 underline">
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Auth;
