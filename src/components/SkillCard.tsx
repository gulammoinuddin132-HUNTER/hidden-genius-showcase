import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import type { Skill } from "@/context/AppContext";

const statusConfig = {
  verified: { icon: CheckCircle, label: "Verified", className: "bg-success/10 text-success border-success/20" },
  pending: { icon: Clock, label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  rejected: { icon: XCircle, label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export const SkillCard = ({ skill, children }: { skill: Skill; children?: React.ReactNode }) => {
  const status = statusConfig[skill.status];
  const StatusIcon = status.icon;

  return (
    <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300 border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold">{skill.title}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">{skill.category}</p>
          </div>
          <Badge variant="outline" className={status.className}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-foreground/80">{skill.description}</p>
        <p className="text-xs text-muted-foreground">📎 {skill.proof}</p>
        {skill.comment && (
          <p className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-2 mt-2">
            Faculty: "{skill.comment}"
          </p>
        )}
        {children}
      </CardContent>
    </Card>
  );
};
