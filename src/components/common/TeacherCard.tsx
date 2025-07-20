
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export type TeacherType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  subjects: string[];
  experience: number;
  rating: number;
  hourlyRate: number;
  location: string;
  availability: string;
  bio: string;
  qualifications: string;
  education?: string[];
  certifications?: string[];
  createdBy?: string;
  teachingApproach?: string;
  reviews?: any[];
  createdAt?: string;
};

interface TeacherCardProps {
  teacher: TeacherType;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const { id, name, avatar, subjects, experience, rating, hourlyRate, location, bio } = teacher;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-brand-purple text-white">{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="flex items-center mt-1">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
            </svg>
            <span>{rating.toFixed(1)} • {experience} {experience === 1 ? 'year' : 'years'} experience</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject, index) => (
            <Badge key={index} variant="secondary" className="bg-accent text-secondary-foreground">
              {subject}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          {bio.length > 130 ? `${bio.substring(0, 130)}...` : bio}
        </p>
        <div className="flex justify-between items-center mt-2 pt-2 text-sm">
          <div>
            <span className="block font-medium text-gray-900">${hourlyRate}/hour</span>
            <span className="text-gray-500">{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-brand-blue hover:bg-brand-blue/90">
          <Link to={`/teacher/${id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeacherCard;
