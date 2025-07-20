
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const subjects = [
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Computer Science",
  "Foreign Languages",
  "Music",
  "Art",
];

interface SearchFiltersProps {
  onSearch: (value: string) => void;
  onSubjectFilter: (value: string) => void;
  onPriceRange: (value: [number, number]) => void;
  onExperienceRange?: (value: number) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onSearch, 
  onSubjectFilter, 
  onPriceRange, 
  onExperienceRange 
}) => {
  const [query, setQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [experienceRange, setExperienceRange] = useState([0]);
  const [priceRange, setPriceRange] = useState([100]);
  
  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };
  
  const handleSearch = () => {
    onSearch(query);
    
    // If multiple subjects are selected, just use the first one for filtering
    // (or you could implement more complex filtering logic)
    if (selectedSubjects.length > 0) {
      onSubjectFilter(selectedSubjects[0]);
    } else {
      onSubjectFilter("");
    }
    
    onPriceRange([0, priceRange[0]]);
    
    // Apply experience filter if the handler exists
    if (onExperienceRange) {
      onExperienceRange(experienceRange[0]);
    }
  };
  
  const clearFilters = () => {
    setQuery("");
    setSelectedSubjects([]);
    setExperienceRange([0]);
    setPriceRange([100]);
    onSearch("");
    onSubjectFilter("");
    onPriceRange([0, 200]);
    if (onExperienceRange) {
      onExperienceRange(0);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Find Your Perfect Tutor</h2>
      
      <div className="space-y-6">
        {/* Search input */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, subject or keyword..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Subject selection */}
        <div>
          <h3 className="text-lg font-medium mb-3">Subjects</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedSubjects.map(subject => (
              <Badge 
                key={subject} 
                variant="secondary"
                className="pl-2"
              >
                {subject}
                <button 
                  className="ml-1 hover:bg-gray-200 rounded-full p-1"
                  onClick={() => handleSubjectToggle(subject)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {subjects.map(subject => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox 
                  id={`subject-${subject}`}
                  checked={selectedSubjects.includes(subject)}
                  onCheckedChange={() => handleSubjectToggle(subject)}
                />
                <Label htmlFor={`subject-${subject}`} className="text-sm">
                  {subject}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Experience range */}
        <div>
          <h3 className="text-lg font-medium mb-3">Minimum Experience</h3>
          <div className="px-2">
            <Slider
              defaultValue={[0]}
              max={20}
              step={1}
              value={experienceRange}
              onValueChange={(values) => {
                setExperienceRange(values);
                if (onExperienceRange) {
                  onExperienceRange(values[0]);
                }
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">0 years</span>
              <span className="text-sm text-gray-500">{experienceRange[0]} years+</span>
              <span className="text-sm text-gray-500">20 years</span>
            </div>
          </div>
        </div>
        
        {/* Price range */}
        <div>
          <h3 className="text-lg font-medium mb-3">Maximum Price</h3>
          <div className="px-2">
            <Slider
              defaultValue={[100]}
              max={200}
              step={5}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">$0</span>
              <span className="text-sm text-gray-500">Up to ${priceRange[0]}/hr</span>
              <span className="text-sm text-gray-500">$200</span>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-4 pt-2">
          <Button onClick={handleSearch} className="flex-1 bg-brand-blue hover:bg-brand-blue/90">
            Search
          </Button>
          <Button 
            onClick={clearFilters} 
            variant="outline" 
            className="flex-1 border-gray-300"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
