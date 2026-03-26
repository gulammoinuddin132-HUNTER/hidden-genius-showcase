import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, Role } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, GraduationCap, BookOpen, Briefcase } from "lucide-react";

const roles: { value: Role; label: string; icon: typeof GraduationCap; desc: string }[] = [
  { value: "student", label: "Student", icon: GraduationCap, desc: "Showcase your skills" },
  { value: "faculty", label: "Faculty", icon: BookOpen, desc: "Verify student skills" },
  { value: "recruiter", label: "Recruiter", icon: Briefcase, desc: "Discover talent" },
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const { login, signup } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) login(email, password, role);
    else signup(name, email, password, role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-elevated border-border/60">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Hidden Genius</span>
          </div>
          <CardTitle className="text-2xl">{isLogin ? "Welcome back" : "Create account"}</CardTitle>
          <CardDescription>{isLogin ? "Sign in to your account" : "Join the platform"}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role selection */}
            <div className="space-y-2">
              <Label>I am a</Label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                      role === r.value
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <r.icon className={`w-5 h-5 mx-auto mb-1 ${role === r.value ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-xs font-medium ${role === r.value ? "text-primary" : "text-muted-foreground"}`}>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@college.edu" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>

            <Button type="submit" className="w-full" size="lg">{isLogin ? "Sign In" : "Create Account"}</Button>

            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
