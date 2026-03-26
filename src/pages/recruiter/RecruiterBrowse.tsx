import { useState } from "react";
import { useApp, allStudents } from "@/context/AppContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, CheckCircle } from "lucide-react";

const RecruiterBrowse = () => {
  const { skills } = useApp();
  const [search, setSearch] = useState("");
  const verified = skills.filter((s) => s.status === "verified");

  const filteredStudents = allStudents.filter((student) => {
    const studentSkills = verified.filter((s) => s.studentId === student.id);
    const matchesName = student.name.toLowerCase().includes(search.toLowerCase());
    const matchesCourse = student.course?.toLowerCase().includes(search.toLowerCase());
    const matchesSkill = studentSkills.some((s) => s.title.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));
    return matchesName || matchesCourse || matchesSkill;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Browse Talent</h1>
          <p className="text-muted-foreground mt-1">Search students by name, course, or skill.</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search by name, skill, or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredStudents.map((student) => {
            const studentSkills = verified.filter((s) => s.studentId === student.id);
            return (
              <Card key={student.id} className="shadow-card hover:shadow-elevated transition-shadow duration-300 border-border/60">
                <CardContent className="pt-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.course} · {student.year}</p>
                    </div>
                  </div>
                  {studentSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {studentSkills.map((s) => (
                        <Badge key={s.id} variant="outline" className="bg-success/5 text-success border-success/20 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" /> {s.title}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No verified skills yet.</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterBrowse;
