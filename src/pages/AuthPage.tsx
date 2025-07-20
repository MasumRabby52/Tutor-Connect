
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { UserPlus, LogIn, BookOpen } from "lucide-react";

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold gradient-text">TutorConnect</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Welcome Message and Auth */}
            <div className="space-y-8">
              {/* Welcome Message */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Welcome to <span className="gradient-text">TutorConnect</span>
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  For Teachers and Guardians
                </p>
                <p className="text-lg text-gray-500 max-w-lg">
                  Connect qualified educators with students seeking academic excellence. 
                  Join our community dedicated to educational success.
                </p>
              </div>

              {/* Auth Cards */}
              <div className="grid gap-6 max-w-md mx-auto lg:mx-0">
                {/* Login Card */}
                <Card className="card-hover">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 justify-center text-lg">
                      <LogIn className="h-5 w-5 text-brand-blue" />
                      Login System
                    </CardTitle>
                    <CardDescription className="text-center">
                      Sign in to your existing account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-brand-blue hover:bg-brand-blue/90">
                      <Link to="/login">
                        Login to Your Account
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Register Card */}
                <Card className="card-hover">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 justify-center text-lg">
                      <UserPlus className="h-5 w-5 text-brand-purple" />
                      Registration System
                    </CardTitle>
                    <CardDescription className="text-center">
                      Create a new account to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-brand-purple hover:bg-brand-purple/90">
                      <Link to="/register">
                        Create New Account
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Side - Library Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&crop=center"
                  alt="Students reading books in library" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-800">
                      <BookOpen className="h-5 w-5 text-brand-blue" />
                      <span className="font-medium">Students Reading in Library</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Creating a supportive learning environment for academic success
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
