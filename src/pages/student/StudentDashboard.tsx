
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Calendar, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [studentName] = useState("John Doe");
  
  // Sample data for the dashboard
  const dashboardData = {
    courses: 5,
    assignments: {
      pending: 3,
      completed: 8,
      total: 11
    },
    attendance: {
      percentage: 85,
      present: 17,
      total: 20
    },
    upcomingAssignments: [
      { id: 1, title: "Database Design Project", course: "Database Management", dueDate: "2025-05-30" },
      { id: 2, title: "User Interface Mockups", course: "Human-Computer Interaction", dueDate: "2025-06-05" },
      { id: 3, title: "Algorithm Analysis", course: "Data Structures & Algorithms", dueDate: "2025-06-10" },
    ],
    courses: [
      { id: 1, code: "CS301", title: "Database Management", instructor: "Dr. Jane Smith" },
      { id: 2, code: "CS302", title: "Human-Computer Interaction", instructor: "Prof. David Lee" },
      { id: 3, code: "CS303", title: "Data Structures & Algorithms", instructor: "Dr. Robert Chen" },
      { id: 4, code: "CS304", title: "Computer Networks", instructor: "Prof. Sarah Wilson" },
    ]
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDaysRemaining = (dateStr: string) => {
    const today = new Date();
    const dueDate = new Date(dateStr);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <>
      <Navbar userType="student" userName={studentName} />
      
      <div className="page-container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {studentName}</h1>
          <p className="text-secondary mt-2">Here's an overview of your academic progress</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-secondary">Enrolled Courses</p>
                  <p className="text-3xl font-bold">{dashboardData.courses.length}</p>
                </div>
                <div className="p-3 rounded-full bg-primary-light/10 text-primary">
                  <BookOpen size={24} />
                </div>
              </div>
              <Link to="/student/courses" className="text-accent hover:text-accent-dark text-sm flex items-center mt-4">
                View all courses <ArrowRight size={14} className="ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-secondary">Assignments</p>
                  <p className="text-3xl font-bold">{dashboardData.assignments.pending} <span className="text-sm text-secondary font-normal">pending</span></p>
                </div>
                <div className="p-3 rounded-full bg-accent-light/10 text-accent">
                  <FileText size={24} />
                </div>
              </div>
              <div className="w-full bg-light mt-4 rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full" 
                  style={{ 
                    width: `${(dashboardData.assignments.completed / dashboardData.assignments.total) * 100}%` 
                  }}
                />
              </div>
              <p className="text-sm text-secondary mt-2">
                {dashboardData.assignments.completed} of {dashboardData.assignments.total} completed
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-secondary">Attendance</p>
                  <p className="text-3xl font-bold">{dashboardData.attendance.percentage}%</p>
                </div>
                <div className="p-3 rounded-full bg-primary-light/10 text-primary">
                  <Calendar size={24} />
                </div>
              </div>
              <div className="w-full bg-light mt-4 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${dashboardData.attendance.percentage}%` }}
                />
              </div>
              <p className="text-sm text-secondary mt-2">
                {dashboardData.attendance.present} of {dashboardData.attendance.total} classes attended
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Assignments due in the next 14 days</CardDescription>
            </CardHeader>
            <CardContent>
              {dashboardData.upcomingAssignments.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.upcomingAssignments.map((assignment) => {
                    const daysLeft = getDaysRemaining(assignment.dueDate);
                    return (
                      <div key={assignment.id} className="flex items-center justify-between p-3 bg-light rounded-md">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 mt-1 rounded-full bg-accent-light/30 text-accent">
                            <FileText size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium text-primary-dark">{assignment.title}</h4>
                            <p className="text-sm text-secondary">{assignment.course}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`flex items-center text-sm ${
                            daysLeft <= 2 ? 'text-red-500' : 'text-secondary'
                          }`}>
                            <Clock size={14} className="mr-1" />
                            <span>Due {formatDate(assignment.dueDate)}</span>
                          </div>
                          {daysLeft <= 2 && (
                            <p className="text-xs text-red-500 mt-1">{daysLeft} {daysLeft === 1 ? 'day' : 'days'} left</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  <Button asChild variant="outline" className="w-full mt-2">
                    <Link to="/student/assignments">View All Assignments</Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500 opacity-80" />
                  <h3 className="mt-2 text-xl font-medium text-primary">All caught up!</h3>
                  <p className="text-secondary mt-1">You don't have any upcoming assignments</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Currently enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.courses.map((course) => (
                  <div key={course.id} className="p-3 bg-light rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                            {course.code}
                          </span>
                        </div>
                        <h4 className="font-medium text-primary-dark mt-1">{course.title}</h4>
                        <p className="text-sm text-secondary">Instructor: {course.instructor}</p>
                      </div>
                      <Button size="sm" asChild variant="ghost">
                        <Link to={`/student/courses/${course.id}`}>
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button asChild variant="outline" className="w-full mt-2">
                  <Link to="/student/courses">Browse More Courses</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
