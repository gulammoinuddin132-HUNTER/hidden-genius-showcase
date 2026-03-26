import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Users, Shield, ArrowRight, CheckCircle, Star, TrendingUp } from "lucide-react";
import { SKILL_CATEGORIES } from "@/context/AppContext";
import logo from "@/assets/logo.png";

const Landing = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "500+", label: "Students", icon: Users },
    { value: "1200+", label: "Skills Verified", icon: CheckCircle },
    { value: "50+", label: "Recruiters", icon: TrendingUp },
    { value: "98%", label: "Satisfaction", icon: Star },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-border/40 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Hidden Genius" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold text-foreground">Hidden Genius</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/auth")}>Sign In</Button>
          <Button onClick={() => navigate("/auth")}>Get Started</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero px-8 py-28 md:py-36">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(174 62% 48% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(250 55% 58% / 0.3) 0%, transparent 50%)" }} />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Hidden Genius" className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">For the skills grades can't measure</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight" style={{ color: "hsl(0 0% 96%)" }}>
            Show Your Skills
            <br />
            <span className="gradient-primary bg-clip-text" style={{ WebkitTextFillColor: "transparent" }}>Beyond Grades</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: "hsl(210 15% 70%)" }}>
            A platform where students showcase leadership, creativity, and real-world projects — verified by faculty, discovered by recruiters.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button variant="hero" size="lg" className="text-base px-8 py-6" onClick={() => navigate("/auth")}>
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 py-6 border-border/30" onClick={() => navigate("/auth")} style={{ color: "hsl(210 15% 80%)" }}>
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 py-12 bg-card border-b border-border/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center space-y-2">
              <s.icon className="w-6 h-6 text-primary mx-auto" />
              <p className="text-3xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-20 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">How It Works</h2>
          <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">Three simple steps to showcase your hidden talents and get noticed by top recruiters.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "1. Showcase Skills", desc: "Upload projects, certificates, and achievements that go beyond your transcript.", color: "from-primary to-info" },
              { icon: Shield, title: "2. Get Verified", desc: "Faculty review and verify your skills with a trusted verification badge.", color: "from-success to-primary" },
              { icon: Users, title: "3. Get Discovered", desc: "Recruiters browse verified talent, filtered by skills and interests.", color: "from-accent to-primary" },
            ].map((f) => (
              <div key={f.title} className="group p-8 rounded-2xl border border-border/60 shadow-card hover:shadow-elevated transition-all duration-300 text-center space-y-5 hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mx-auto shadow-lg`}>
                  <f.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="px-8 py-20 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Skill Categories</h2>
          <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">We recognize skills across all dimensions — not just academics.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.value} className="group p-5 rounded-xl border border-border/60 bg-background hover:border-primary/40 hover:shadow-elevated transition-all duration-300 text-center space-y-2 cursor-default hover:-translate-y-0.5">
                <span className="text-3xl block">{cat.emoji}</span>
                <p className="text-sm font-semibold text-foreground">{cat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, hsl(174 62% 48% / 0.4) 0%, transparent 60%)" }} />
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "hsl(0 0% 96%)" }}>Ready to Unleash Your Hidden Genius?</h2>
          <p className="text-lg" style={{ color: "hsl(210 15% 70%)" }}>Join hundreds of students already showcasing their true potential.</p>
          <Button variant="hero" size="lg" className="text-base px-8 py-6" onClick={() => navigate("/auth")}>
            Create Your Profile <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-border/40 bg-card">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Hidden Genius" className="w-6 h-6 object-contain" />
            <span className="text-sm font-semibold text-foreground">Hidden Genius</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 Hidden Genius. Built for students who do more.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
