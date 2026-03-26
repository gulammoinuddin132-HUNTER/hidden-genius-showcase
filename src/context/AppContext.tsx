import React, { createContext, useContext, useState, ReactNode } from "react";

export type Role = "student" | "faculty" | "recruiter";
export type SkillStatus = "pending" | "verified" | "rejected";

export const SKILL_CATEGORIES = [
  { value: "Communication", label: "🎤 Communication Skills", emoji: "🎤" },
  { value: "Problem Solving", label: "🧠 Problem Solving", emoji: "🧠" },
  { value: "Technical", label: "💻 Technical Skills", emoji: "💻" },
  { value: "Creative", label: "🎨 Creativity & Design", emoji: "🎨" },
  { value: "Leadership", label: "👥 Leadership", emoji: "👥" },
  { value: "Teamwork", label: "🤝 Teamwork", emoji: "🤝" },
  { value: "Project Work", label: "🚀 Project Work", emoji: "🚀" },
  { value: "Achievements", label: "🏆 Achievements / Extracurricular", emoji: "🏆" },
] as const;

export type SkillCategory = typeof SKILL_CATEGORIES[number]["value"];

export interface Skill {
  id: string;
  title: string;
  category: SkillCategory;
  description: string;
  proof: string;
  status: SkillStatus;
  studentId: string;
  studentName: string;
  comment?: string;
  submittedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  course?: string;
  year?: string;
  avatar?: string;
}

interface AppState {
  user: User | null;
  skills: Skill[];
  login: (email: string, password: string, role: Role) => void;
  signup: (name: string, email: string, password: string, role: Role) => void;
  logout: () => void;
  addSkill: (skill: Omit<Skill, "id" | "status" | "studentId" | "studentName" | "submittedAt">) => void;
  verifySkill: (skillId: string, status: SkillStatus, comment?: string) => void;
}

const mockSkills: Skill[] = [
  { id: "1", title: "Public Speaking", category: "Communication", description: "Won inter-college debate competition 2024", proof: "Certificate from XYZ University", status: "verified", studentId: "s1", studentName: "Aarav Sharma", submittedAt: "2024-11-15" },
  { id: "2", title: "Web Development", category: "Technical", description: "Built full-stack e-commerce platform", proof: "GitHub repository link", status: "verified", studentId: "s1", studentName: "Aarav Sharma", submittedAt: "2024-12-01" },
  { id: "3", title: "Event Management", category: "Leadership", description: "Organized TEDx event for 500+ attendees", proof: "Event photos and organizer certificate", status: "pending", studentId: "s1", studentName: "Aarav Sharma", submittedAt: "2025-01-10" },
  { id: "4", title: "Graphic Design", category: "Creative", description: "Designed branding for 3 student startups", proof: "Portfolio link", status: "pending", studentId: "s2", studentName: "Priya Patel", submittedAt: "2025-01-20" },
  { id: "5", title: "Machine Learning", category: "Technical", description: "Published research paper on NLP", proof: "IEEE publication link", status: "verified", studentId: "s2", studentName: "Priya Patel", submittedAt: "2024-10-05" },
  { id: "6", title: "Community Service", category: "Teamwork", description: "Led rural education initiative for 200 students", proof: "NGO certification letter", status: "pending", studentId: "s3", studentName: "Rohan Mehta", submittedAt: "2025-02-01" },
  { id: "7", title: "Music Production", category: "Creative", description: "Produced album with 10K+ streams", proof: "Spotify artist profile", status: "verified", studentId: "s3", studentName: "Rohan Mehta", submittedAt: "2024-09-20" },
  { id: "8", title: "Hackathon Winner", category: "Achievements", description: "Won Smart India Hackathon 2024", proof: "Winner certificate", status: "verified", studentId: "s1", studentName: "Aarav Sharma", submittedAt: "2024-08-15" },
  { id: "9", title: "Algorithm Design", category: "Problem Solving", description: "Solved 500+ problems on LeetCode, CodeForces rated 1600+", proof: "Profile links", status: "verified", studentId: "s2", studentName: "Priya Patel", submittedAt: "2024-09-10" },
  { id: "10", title: "Capstone Project", category: "Project Work", description: "Built AI-powered campus navigation app used by 2000+ students", proof: "App store link + faculty endorsement", status: "pending", studentId: "s3", studentName: "Rohan Mehta", submittedAt: "2025-01-28" },
];

const mockStudents: User[] = [
  { id: "s1", name: "Aarav Sharma", email: "aarav@college.edu", role: "student", course: "Computer Science", year: "3rd Year" },
  { id: "s2", name: "Priya Patel", email: "priya@college.edu", role: "student", course: "Design", year: "2nd Year" },
  { id: "s3", name: "Rohan Mehta", email: "rohan@college.edu", role: "student", course: "Business", year: "4th Year" },
];

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};

export const allStudents = mockStudents;

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<Skill[]>(mockSkills);

  const login = (_email: string, _password: string, role: Role) => {
    if (role === "student") setUser(mockStudents[0]);
    else if (role === "faculty") setUser({ id: "f1", name: "Dr. Kapoor", email: "kapoor@college.edu", role: "faculty" });
    else setUser({ id: "r1", name: "Recruiter", email: "hire@company.com", role: "recruiter" });
  };

  const signup = (name: string, email: string, _password: string, role: Role) => {
    setUser({ id: Date.now().toString(), name, email, role, course: role === "student" ? "Undeclared" : undefined, year: role === "student" ? "1st Year" : undefined });
  };

  const logout = () => setUser(null);

  const addSkill = (skill: Omit<Skill, "id" | "status" | "studentId" | "studentName" | "submittedAt">) => {
    if (!user) return;
    setSkills(prev => [...prev, { ...skill, id: Date.now().toString(), status: "pending", studentId: user.id, studentName: user.name, submittedAt: new Date().toISOString().split("T")[0] }]);
  };

  const verifySkill = (skillId: string, status: SkillStatus, comment?: string) => {
    setSkills(prev => prev.map(s => s.id === skillId ? { ...s, status, comment } : s));
  };

  return (
    <AppContext.Provider value={{ user, skills, login, signup, logout, addSkill, verifySkill }}>
      {children}
    </AppContext.Provider>
  );
};
