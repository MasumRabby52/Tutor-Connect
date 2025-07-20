import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchFilters from "@/components/common/SearchFilters";
import TeacherCard, { TeacherType } from "@/components/common/TeacherCard";
import { useTeacherProfiles } from "@/hooks/useTeacherProfiles";

const FindTutors: React.FC = () => {
  const { teachers, loading } = useTeacherProfiles();
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [experienceFilter, setExperienceFilter] = useState<number>(0);

  // Filter teachers based on search and filters
  const filteredTeachers = teachers.filter((teacher) => {
    // Search term filter (name, subjects, location)
    const matchesSearch = searchTerm === "" || 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some(subject => 
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      (teacher.location && teacher.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Subject filter
    const matchesSubject = subjectFilter === "" || 
      teacher.subjects.includes(subjectFilter);
    
    // Price range filter
    const matchesPrice = teacher.hourlyRate >= priceRange[0] && 
      teacher.hourlyRate <= priceRange[1];
    
    // Experience filter
    const matchesExperience = teacher.experience >= experienceFilter;
    
    return matchesSearch && matchesSubject && matchesPrice && matchesExperience;
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSubjectFilter = (value: string) => {
    setSubjectFilter(value);
  };

  const handlePriceRange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const handleExperienceFilter = (value: number) => {
    setExperienceFilter(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect <span className="gradient-text">Tutor</span>
            </h1>
            <p className="text-lg text-gray-600">
              Browse through our qualified tutors and find the perfect match for your learning needs
            </p>
          </div>
          
          {/* Search and Filters */}
          <SearchFilters 
            onSearch={(value) => setSearchTerm(value)}
            onSubjectFilter={(value) => setSubjectFilter(value)}
            onPriceRange={(value) => setPriceRange(value)}
            onExperienceRange={(value) => setExperienceFilter(value)}
          />
          
          {/* Teachers Grid */}
          <div className="mt-12">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-xl">Loading tutors...</p>
              </div>
            ) : filteredTeachers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeachers.map((teacher) => (
                  <TeacherCard key={teacher.id} teacher={teacher} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl">No tutors found matching your criteria</p>
                <p className="text-gray-600 mt-2">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindTutors;
