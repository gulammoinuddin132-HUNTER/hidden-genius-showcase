import { useState } from "react";
import { useApp, allStudents, SKILL_CATEGORIES } from "@/context/AppContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, CheckCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SkillCard } from "@/components/SkillCard";

const RecruiterBrowse = () => {
  const { skills } = useApp();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const relevantSkills = verifiedOnly ? skills.filter((s) => s.status === "verified") : skills;

  const filteredStudents = allStudents.filter((student) => {
    const studentSkills = relevantSkills.filter((s) => s.studentId === student.id);
    if (filterCategory !== "all") {
      const hasCat = studentSkills.some((s) => s.category === filterCategory);
      if (!hasCat) return false;
    }
    const matchesName = student.name.toLowerCase().includes(search.toLowerCase());
    const matchesCourse = student.course?.toLowerCase().includes(search.toLowerCase());
    const matchesSkill = studentSkills.some((s) => s.title.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));
    return matchesName || matchesCourse || matchesSkill;
  });

  const selectedStudentData = allStudents.find((s) => s.id === selectedStudent);
  const selectedStudentSkills = selectedStudent ? relevantSkills.filter((s) => s.studentId === selectedStudent) : [];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Browse Talent</h1>
          <p className="text-muted-foreground mt-1">Search students by name, course, or skill.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search by name, skill, or course..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${verifiedOnly ? "bg-success/10 text-success border-success/30" : "bg-card text-muted-foreground border-border"}`}
          >
            <CheckCircle className="w-3 h-3 inline mr-1" />
            Verified Only
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filterCategory === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}
          >
            All Categories
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilterCategory(cat.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filterCategory === cat.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}
            >
              {cat.emoji} {cat.value}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredStudents.map((student) => {
            const studentSkills = relevantSkills.filter((s) => s.studentId === student.id);
            return (
              <Card key={student.id} className="shadow-card hover:shadow-elevated transition-all duration-300 border-border/60">
                <CardContent className="pt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.course} · {student.year}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student.id)}>
                      <Eye className="w-3 h-3 mr-1" /> View
                    </Button>
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

      {/* Student Profile Modal */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
          {selectedStudentData && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <span>{selectedStudentData.name}</span>
                    <p className="text-sm font-normal text-muted-foreground">{selectedStudentData.course} · {selectedStudentData.year}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {selectedStudentSkills.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">No skills to display.</p>
                ) : (
                  selectedStudentSkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default RecruiterBrowse;
