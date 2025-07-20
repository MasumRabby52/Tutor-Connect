
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">TutorConnect</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're on a mission to transform education by creating meaningful connections
              between talented teachers and students seeking to learn.
            </p>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  TutorConnect was founded in 2025 with a simple idea: make it easier for students to find
                  qualified teachers who can provide personalized educational support.
                </p>
                <p className="text-gray-700 mb-4">
                  What started as a small community of passionate educators has grown into a comprehensive
                  platform connecting thousands of teachers with students across the country.
                </p>
                <p className="text-gray-700">
                  Our team is made up of former teachers, education technology specialists, and
                  parents who understand the importance of quality education. We're dedicated to
                  continuously improving our platform to better serve both teachers and students.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Team working together"
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Education</h3>
                <p className="text-gray-600">
                  We believe everyone deserves access to high-quality education. 
                  We carefully vet our teachers to ensure they have the knowledge and skills to help students succeed.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="w-12 h-12 bg-brand-purple/10 text-brand-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Focus</h3>
                <p className="text-gray-600">
                  We're building a community where teachers can thrive professionally and students can find 
                  the support they need to achieve their academic goals.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously look for ways to improve our platform, making it easier for teachers to 
                  showcase their expertise and for students to find the right educational support.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team With Facebook</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <a href="https://web.facebook.com/junaed.masum.rabby">
                <img 
                  src="masum.jpg" 
                  alt="Team member" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                </a>

                <h3 className="text-xl font-semibold">Md Masum Rabby</h3>
                <p className="text-brand-blue">Founder & CEO</p>
                <p className="text-gray-600 mt-2">Shahjalal University of Science and Technology</p>
              </div>
              
              <div className="text-center">
                <a href="https://web.facebook.com/kamrul.hasan.nayon.2024">
                <img 
                  src="kamrul.jpg" 
                  alt="Team member" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                </a>

                <h3 className="text-xl font-semibold">Md kamrul Hasan</h3>
                <p className="text-brand-blue">CTO & CMO</p>
                <p className="text-gray-600 mt-2">Shahjalal University of Science and Technology</p>
              </div>
              
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Whether you're a teacher looking to share your knowledge or a guardian seeking 
              educational support for your child, we're here to help you connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-brand-blue hover:bg-gray-100">
                <Link to="/find-tutors">Find a Tutor</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-white text-brand-blue hover:bg-gray-100">
                <Link to="/find-tutors">Become a Tutor</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
