import { useApp } from "@/context/AppContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, BookOpen, Calendar, CheckCircle } from "lucide-react";

const StudentProfile = () => {
  const { user, skills } = useApp();
  const verified = skills.filter((s) => s.studentId === user?.id && s.status === "verified");

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>

        <Card className="shadow-card border-border/60">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" /> {user?.course || "N/A"}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" /> {user?.year || "N/A"}
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" /> Verified Skills
          </h3>
          {verified.length === 0 ? (
            <p className="text-muted-foreground text-sm">No verified skills yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {verified.map((s) => (
                <Badge key={s.id} className="bg-success/10 text-success border-success/20 px-3 py-1.5">
                  <CheckCircle className="w-3 h-3 mr-1" /> {s.title}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
