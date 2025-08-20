// Assuming this is the structure of your CompletedCourses component
// You might need to adjust based on your actual component implementation

import React from 'react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

interface CompletedCoursesProps {
  courses: Course[];
}

const CompletedCourses: React.FC<CompletedCoursesProps> = ({ courses }) => {
  return (
    <div className="border border-[#E4C68C] rounded-md p-4 bg-white text-[#000000]">
      <h3 className="text-lg font-semibold text-[#000000] border-b border-[#E4C68C] pb-2 mb-4">
        Completed Courses
      </h3>
      <p className="text-sm text-[#000000] mb-4">Courses you have successfully passed.</p>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">Course</th>
            <th className="pb-2">Credits</th>
            <th className="pb-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-t border-[#E4C68C]">
              <td className="py-2">
                <div className="font-medium">{course.name}</div>
                <div className="text-sm text-gray-600">{course.id}</div> {/* Adjust gray color if needed */}
              </td>
              <td className="py-2">{course.credits}</td>
              <td className="py-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold 
                  ${course.grade === 'A' ? 'bg-[#EE9621]' : course.grade === 'B+' ? 'bg-[#EE9621]' : 'bg-[#E4C68C]'} // Example: using accent and secondary for grades
                  text-[#000000]`}
                >
                  {course.grade}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedCourses;