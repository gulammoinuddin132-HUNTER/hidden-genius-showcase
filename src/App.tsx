import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentSkills from "./pages/student/StudentSkills";
import StudentProfile from "./pages/student/StudentProfile";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyVerify from "./pages/faculty/FacultyVerify";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterBrowse from "./pages/recruiter/RecruiterBrowse";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/skills" element={<StudentSkills />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/faculty" element={<FacultyDashboard />} />
            <Route path="/faculty/verify" element={<FacultyVerify />} />
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            <Route path="/recruiter/browse" element={<RecruiterBrowse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
