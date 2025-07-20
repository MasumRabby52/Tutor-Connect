
import React from "react";

const steps = [
  {
    number: "01",
    title: "Search for Tutors",
    description: "Browse through our wide selection of qualified tutors filtered by subject, experience, and location.",
  },
  {
    number: "02",
    title: "Review Profiles",
    description: "Read detailed tutor profiles, credentials, reviews from other students, and teaching approaches.",
  },
  {
    number: "03",
    title: "Connect & Schedule",
    description: "Once you find a suitable tutor, schedule a session at a time that works best for your child.",
  },
  {
    number: "04",
    title: "Learn & Grow",
    description: "Your child receives personalized tutoring to help them achieve their academic goals and build confidence.",
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Finding the right tutor for your child is easy with our simple process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step number */}
              <div className="absolute -top-10 text-6xl font-bold text-gray-100">{step.number}</div>
              
              <div className="pt-8 relative z-10">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {/* Connector line between steps (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 right-0 w-full h-1">
                  <div className="h-0.5 bg-gray-200 w-full relative">
                    <div className="absolute -right-2 -top-1.5 w-4 h-4 border-t-2 border-r-2 border-gray-200 transform rotate-45"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
