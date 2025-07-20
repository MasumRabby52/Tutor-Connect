
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const checkAuthStatus = () => {
    const userJSON = localStorage.getItem("currentUser");
    if (userJSON) {
      try {
        const user = JSON.parse(userJSON);
        setCurrentUser(user);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    // Check initial auth status
    checkAuthStatus();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    // Remove current user from localStorage
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    
    // Trigger custom event to notify App component
    window.dispatchEvent(new Event("authChange"));
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    // Redirect to auth page
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold gradient-text">TutorConnect</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-brand-blue transition-colors">
            Home
          </Link>
          <Link to="/find-tutors" className="text-gray-700 hover:text-brand-blue transition-colors">
            Find Tutors
          </Link>
          <Link to="/become-tutor" className="text-gray-700 hover:text-brand-blue transition-colors">
            Become a Tutor
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-brand-blue transition-colors">
            About
          </Link>
          
          {currentUser ? (
            <div className="flex ml-4 gap-2 items-center">
              <span className="text-gray-700">Hi, {currentUser.name || currentUser.email}</span>
              <Button 
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          ) : (
            <div className="flex ml-4 gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-brand-blue hover:bg-brand-blue/90" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden z-40 animate-fade-in">
            <div className="flex flex-col p-4 space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-brand-blue px-4 py-2 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/find-tutors" 
                className="text-gray-700 hover:text-brand-blue px-4 py-2 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Tutors
              </Link>
              <Link 
                to="/become-tutor" 
                className="text-gray-700 hover:text-brand-blue px-4 py-2 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Become a Tutor
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-brand-blue px-4 py-2 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {currentUser ? (
                <div className="flex flex-col gap-2 pt-2">
                  <div className="px-4 py-2 text-gray-700">
                    Hi, {currentUser.name || currentUser.email}
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="bg-brand-blue hover:bg-brand-blue/90" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
