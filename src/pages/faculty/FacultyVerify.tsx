import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { SkillCard } from "@/components/SkillCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle } from "lucide-react";

const FacultyVerify = () => {
  const { skills, verifySkill } = useApp();
  const pending = skills.filter((s) => s.status === "pending");
  const [comments, setComments] = useState<Record<string, string>>({});

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Verify Skills</h1>
          <p className="text-muted-foreground mt-1">{pending.length} submission{pending.length !== 1 ? "s" : ""} pending review.</p>
        </div>

        {pending.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-success/40" />
            <p>All submissions have been reviewed!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {pending.map((skill) => (
              <SkillCard key={skill.id} skill={skill}>
                <div className="pt-3 space-y-3 border-t border-border/40">
                  <p className="text-xs text-muted-foreground">Submitted by <span className="font-medium text-foreground">{skill.studentName}</span></p>
                  <Input
                    placeholder="Add comment (optional)"
                    value={comments[skill.id] || ""}
                    onChange={(e) => setComments({ ...comments, [skill.id]: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                      onClick={() => verifySkill(skill.id, "verified", comments[skill.id])}
                    >
                      <CheckCircle className="w-4 h-4" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/5"
                      onClick={() => verifySkill(skill.id, "rejected", comments[skill.id])}
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </Button>
                  </div>
                </div>
              </SkillCard>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FacultyVerify;
