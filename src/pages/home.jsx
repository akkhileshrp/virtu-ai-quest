import { Button } from "../components/ui/button";
import Header from "../components/header";
import React from "react";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "../data/carddata";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Header />
      <section className="mt-10">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="text-2xl title md:text-6xl text-center font-bold">
            Prepare for Success with AI-Powered Mock Interviews
          </h1>
          <p className="text-sm text-center text-gray-500 md:text-xl">
            Boost your confidence and performance with personalized mock
            interviews powered by advanced AI
          </p>
          <div className="flex gap-3 mt-5">
            <Link to={"/dashboard"}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
            <Button variant="outline">Watch Demo</Button>
          </div>
          <img
            src="/hero.png"
            alt="main"
            height={100}
            width={1000}
            className="rounded-lg mt-10"
          />
        </div>
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-20 md:gap-40 text-center bg-blue-50 p-10 sm:p-16 lg:p-20 font-bold">
          {statsData.map((data, index) => (
            <div key={index} className="mt-4">
              <h1 className="text-4xl text-blue-600">{data.value}</h1>
              <p className="text-gray-500">{data.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h1 className="text-center title text-2xl font-bold">
          Everything you need to crack your next dream job
        </h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
          {featuresData.map((feature, index) => (
            <div key={index}>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>{feature.icon}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-semibold">{feature.title}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-gray-500">{feature.description}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 bg-blue-50 py-12">
        <h1 className="text-center title text-2xl font-bold mb-10">
          How It Works?
        </h1>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h1 className="text-center title text-2xl font-bold">
          What Our Users Say?
        </h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
          {testimonialsData.map((testimonial, index) => (
            <div key={index}>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>
                    <img
                      src={testimonial.image}
                      alt=""
                      className="rounded-full h-10 w-10"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-gray-500">{testimonial.quote}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 bg-blue-700 p-14">
        <h1 className="text-white text-center text-4xl font-bold">
          Ready to Ace Your Next Interview?
        </h1>
        <p className="text-xl text-white text-center mt-3">
          Join thousands who have successfully cracked their dream jobs. Our
          platform provides the tools and resources to help you prepare like a
          pro!
        </p>

        <div className="flex justify-center items-center mt-10">
          <Link to={"/dashboard"}>
            <Button variant="outline" className="text-blue-600 animate-bounce">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
}
