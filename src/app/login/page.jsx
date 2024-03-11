"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { status } = useSession();

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

  const loginUser = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      ...data,
      callbackUrl: '/',
    });
  };

  return (
    <div
      className="mt-20 flex justify-center items-center gap-x-7 mx-6"
      id="loginPage"
    >
      <div className="flex flex-col gap-y-7 w-[300px]">
        <h2 className="text-2xl font-semibold">Login</h2>

        <form onSubmit={loginUser} className="flex flex-col gap-y-3">
          <input
            type="text"
            placeholder="Email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            className="text-sm p-2 rounded-2xl outline-none tracking-widest"
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            className="text-sm p-2 rounded-2xl outline-none tracking-widest"
          />
          <button
            type="submit"
            className="bg-neutral-700/40 tracking-wider p-2 rounded-2xl hover:bg-neutral-700 transition"
          >
            Login
          </button>
        </form>
        <div className="w-full text-end">
          <Link
            href="/"
            className="text-xs font-semibold no-underline w-max
          border-b border-grey-dark hover:border-green-400 hover:text-green-400 transition-all duration-300"
          >
            Forgot my Password
          </Link>
        </div>

        <span className="border-t-2 w-full text-center"></span>

        <div className="flex flex-col item-start gap-y-3 ">
          <p className="text-sm text-center">
            If you don't have an account, please register.
          </p>
          <button
            onClick={(e) => {
              router.push("/register");
            }}
            className="bg-neutral-700/40 hover:bg-neutral-700 transition px-4 py-1 rounded-2xl text-sm 
            tracking-wider"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
