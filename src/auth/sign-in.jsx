import { SignIn } from "@clerk/clerk-react";
import React from "react";

export default function Signin() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="auth.png"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to VirtuAIQuest
            </h2>

            <p className="ml-1 leading-relaxed text-white/90">
              Empowering Careers Through AI
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <div
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <img src="/favicon.ico" alt="logo" className="rounded-full" />
              </div>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to VirtuAIQuest{" "}
              </h1>

              <p className="ml-1 leading-relaxed text-gray-500">
                Empowering Careers Through AI
              </p>
            </div>

            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
