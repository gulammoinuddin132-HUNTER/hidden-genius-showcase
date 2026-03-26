import { useApp } from "@/context/AppContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, CheckCircle } from "lucide-react";
import { allStudents } from "@/context/AppContext";

const RecruiterDashboard = () => {
  const { skills } = useApp();
  const verified = skills.filter((s) => s.status === "verified");
  const uniqueSkills = [...new Set(verified.map((s) => s.category))];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recruiter Dashboard</h1>
          <p className="text-muted-foreground mt-1">Discover verified student talent.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Students", value: allStudents.length, icon: Users, color: "text-primary" },
            { label: "Verified Skills", value: verified.length, icon: CheckCircle, color: "text-success" },
            { label: "Skill Categories", value: uniqueSkills.length, icon: Award, color: "text-accent" },
          ].map((s) => (
            <Card key={s.label} className="shadow-card border-border/60">
              <CardContent className="pt-5 pb-4 flex items-center gap-4">
                <div className={`p-2.5 rounded-lg bg-muted ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card border-border/60">
          <CardContent className="pt-5">
            <h3 className="font-semibold text-foreground mb-3">Top Verified Talent</h3>
            <div className="space-y-3">
              {allStudents.map((student) => {
                const studentSkills = verified.filter((s) => s.studentId === student.id);
                return (
                  <div key={student.id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.course} · {student.year}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-success" />
                      <span className="text-sm font-medium text-foreground">{studentSkills.length} skills</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;
