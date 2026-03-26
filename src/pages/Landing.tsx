import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Award, Users, Shield, ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Hidden Genius</span>
        </div>
        <Button variant="outline" onClick={() => navigate("/auth")}>Sign In</Button>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center gradient-hero px-8 py-24">
        <div className="max-w-3xl text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">For the skills grades can't measure</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight" style={{ color: "hsl(0 0% 96%)" }}>
            Show Your Skills<br />
            <span className="gradient-primary bg-clip-text" style={{ WebkitTextFillColor: "transparent" }}>Beyond Grades</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "hsl(210 15% 70%)" }}>
            A platform where students showcase leadership, creativity, and real-world projects — verified by faculty, discovered by recruiters.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/auth")} className="border-border/30" style={{ color: "hsl(210 15% 80%)" }}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-20 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Showcase Skills", desc: "Upload projects, certificates, and achievements that go beyond your transcript." },
              { icon: Shield, title: "Get Verified", desc: "Faculty review and verify your skills with a trusted verification badge." },
              { icon: Users, title: "Get Discovered", desc: "Recruiters browse verified talent, filtered by skills and interests." },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-xl border border-border/60 shadow-card hover:shadow-elevated transition-shadow duration-300 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-border/40 text-center text-sm text-muted-foreground">
        © 2025 Hidden Genius. Built for students who do more.
      </footer>
    </div>
  );
};

export default Landing;
