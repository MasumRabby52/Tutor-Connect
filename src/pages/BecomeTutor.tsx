
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TeacherProfileForm from "@/components/forms/TeacherProfileForm";

const BecomeTutor: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Share Your Knowledge, <span className="gradient-text">Inspire Students</span>
            </h1>
            <p className="text-lg text-gray-600">
              Join our community of passionate educators and make a difference in students' lives.
              Create your teacher profile to connect with students looking for your expertise.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-brand-blue">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Create Profile</h3>
                <p className="text-gray-600">Complete your teacher profile with your qualifications and expertise</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-brand-blue">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Set Schedule</h3>
                <p className="text-gray-600">Define your availability and tutoring preferences</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-brand-blue">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Start Teaching</h3>
                <p className="text-gray-600">Begin connecting with students and sharing your knowledge</p>
              </div>
            </div>
            
            <TeacherProfileForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BecomeTutor;
