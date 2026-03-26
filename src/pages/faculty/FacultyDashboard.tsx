import { useApp } from "@/context/AppContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, CheckCircle } from "lucide-react";

const FacultyDashboard = () => {
  const { skills } = useApp();
  const pending = skills.filter((s) => s.status === "pending").length;
  const verified = skills.filter((s) => s.status === "verified").length;

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Faculty Dashboard</h1>
          <p className="text-muted-foreground mt-1">Review and verify student skill submissions.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Submissions", value: skills.length, icon: Award, color: "text-primary" },
            { label: "Pending Review", value: pending, icon: Clock, color: "text-warning" },
            { label: "Verified", value: verified, icon: CheckCircle, color: "text-success" },
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
            <h3 className="font-semibold text-foreground mb-3">Recent Submissions</h3>
            <div className="space-y-3">
              {skills.slice(-5).reverse().map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground">by {s.studentName} · {s.submittedAt}</p>
                  </div>
                  <span className={`text-xs font-medium capitalize px-2 py-1 rounded-full ${
                    s.status === "verified" ? "bg-success/10 text-success" :
                    s.status === "pending" ? "bg-warning/10 text-warning" :
                    "bg-destructive/10 text-destructive"
                  }`}>{s.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
