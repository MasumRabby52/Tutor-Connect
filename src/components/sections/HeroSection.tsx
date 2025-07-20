
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mt-8 lg:mt-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find the <span className="gradient-text">Perfect Tutor</span> for Your Child
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Connect with qualified and experienced teachers who can provide 
              personalized tutoring to help your child excel academically.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90 px-8">
                <Link to="/find-tutors">Find a Tutor</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple/10">
                <Link to="/become-tutor">Become a Tutor</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Teacher helping student learn" 
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
