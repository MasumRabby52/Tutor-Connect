import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { TeacherType } from "@/components/common/TeacherCard";
import { toast } from "@/components/ui/use-toast";
import { useTeacherProfiles } from "@/hooks/useTeacherProfiles";

// Sample teacher data as fallback
const sampleTeacherData = {
  id: "1",
  name: "Dr. Sarah Williams",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  subjects: ["Mathematics", "Physics", "Calculus", "Algebra"],
  experience: 8,
  rating: 4.9,
  hourlyRate: 45,
  location: "New York, NY",
  availability: "Weekdays after 4pm, Weekends",
  bio: "Ph.D. in Mathematics with 8 years of teaching experience. I specialize in making complex math concepts accessible and engaging for students of all levels.",
  education: [
    "Ph.D. in Applied Mathematics, MIT, 2015",
    "M.S. in Mathematics, Stanford University, 2011",
    "B.S. in Mathematics and Physics, Cornell University, 2009"
  ],
  certifications: [
    "Certified Secondary Mathematics Teacher",
    "Advanced Educational Technology Certificate"
  ],
  teachingApproach: "I believe in a personalized approach to teaching that adapts to each student's learning style. I focus on building a strong conceptual understanding rather than just memorizing formulas. My sessions include clear explanations, practical examples, and interactive problem-solving to ensure students truly grasp the material. I also emphasize developing critical thinking skills that will serve students beyond just their current coursework.",
  reviews: [
    {
      id: "r1",
      name: "Jason T.",
      rating: 5,
      date: "October 15, 2023",
      comment: "Dr. Williams helped my daughter go from a C to an A in AP Calculus. She explains concepts clearly and is very patient. Highly recommended!"
    },
    {
      id: "r2",
      name: "Maria L.",
      rating: 5,
      date: "September 3, 2023",
      comment: "I was struggling with physics for months before finding Dr. Williams. She has a gift for making complex topics understandable. My confidence has improved tremendously."
    },
    {
      id: "r3",
      name: "Kevin R.",
      rating: 4,
      date: "August 22, 2023",
      comment: "Very knowledgeable and professional. Helped me prepare for my college entrance exams with great results. Sometimes moves a bit fast, but always willing to slow down when asked."
    }
  ]
};

// Define a constant for localStorage key to ensure consistency
const GLOBAL_TEACHERS_KEY = "global_teachers_data";

const TeacherProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { teachers, loading: teachersLoading } = useTeacherProfiles();
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userJSON = localStorage.getItem("currentUser");
    if (userJSON) {
      try {
        const user = JSON.parse(userJSON);
        setCurrentUser(user);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!teachersLoading && teachers.length > 0 && id) {
      const foundTeacher = teachers.find(t => t.id === id);
      
      if (foundTeacher) {
        // Add default properties if they don't exist
        const enhancedTeacher = {
          ...foundTeacher,
          education: foundTeacher.education || [`${foundTeacher.qualifications || "Bachelor's degree"}`],
          certifications: foundTeacher.certifications || ["Teacher Certification"],
          teachingApproach: foundTeacher.teachingApproach || 
            `As a teacher with ${foundTeacher.experience} years of experience, I focus on helping students understand ${foundTeacher.subjects.join(", ")} through personalized lessons tailored to each student's needs.`,
          reviews: foundTeacher.reviews || []
        };
        
        setTeacher(enhancedTeacher);
        console.log("Teacher found:", enhancedTeacher.name);
      } else {
        console.log("Teacher not found with ID:", id);
        navigate("/find-tutors");
      }
      setLoading(false);
    }
  }, [teachers, teachersLoading, id, navigate]);

  const handleContactTeacher = () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to contact this teacher",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    toast({
      title: "Message Sent",
      description: `Your contact request has been sent to ${teacher.name}`,
    });
  };

  if (loading || teachersLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading teacher profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center flex-col gap-4">
          <p className="text-xl">Teacher profile not found</p>
          <Button onClick={() => navigate("/find-tutors")}>
            Back to Find Tutors
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Teacher profile header */}
            <Card className="mb-8">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 p-6 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-32 w-32 border-4 border-white -mt-16 bg-white">
                        <AvatarImage src={teacher.avatar} alt={teacher.name} />
                        <AvatarFallback className="text-3xl bg-brand-purple text-white">
                          {teacher.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="mt-4 flex items-center">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(teacher.rating) ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-600">{teacher.rating} ({teacher.reviews.length} reviews)</span>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="text-2xl font-semibold text-gray-900">${teacher.hourlyRate}/hr</div>
                        <div className="text-gray-500">{teacher.location}</div>
                      </div>
                      <Button 
                        className="mt-4 w-full bg-brand-blue hover:bg-brand-blue/90"
                        onClick={handleContactTeacher}
                      >
                        Contact Teacher
                      </Button>
                    </div>
                    
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold">{teacher.name}</h1>
                      <div className="flex items-center mt-1 text-gray-600">
                        <span>{teacher.experience} years experience</span>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {teacher.subjects.map((subject: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-accent text-secondary-foreground">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">About Me</h2>
                        <p className="text-gray-700">{teacher.bio}</p>
                      </div>
                      
                      <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Availability</h2>
                        <p className="text-gray-700">{teacher.availability}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Detailed information tabs */}
            <Tabs defaultValue="approach" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="approach">Teaching Approach</TabsTrigger>
                <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="approach" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">My Teaching Philosophy</h3>
                    <p className="text-gray-700">{teacher.teachingApproach}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="qualifications" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">Education</h3>
                      <ul className="space-y-2 ml-5 list-disc text-gray-700">
                        {teacher.education.map((edu: string, index: number) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                      <ul className="space-y-2 ml-5 list-disc text-gray-700">
                        {teacher.certifications.map((cert: string, index: number) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Student Reviews</h3>
                    {teacher.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {teacher.reviews.map((review: any) => (
                          <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">{review.name}</h4>
                                <div className="flex mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <svg 
                                      key={i} 
                                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                      fill="currentColor" 
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="mt-3 text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
                    )}
                    
                    {currentUser && (
                      <div className="mt-8 pt-6 border-t">
                        <Button className="bg-brand-blue hover:bg-brand-blue/90">
                          Leave a Review
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeacherProfile;
