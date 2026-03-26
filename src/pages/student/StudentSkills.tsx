import { useState } from "react";
import { useApp, SKILL_CATEGORIES, SkillCategory } from "@/context/AppContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { SkillCard } from "@/components/SkillCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

const StudentSkills = () => {
  const { user, skills, addSkill } = useApp();
  const mySkills = skills.filter((s) => s.studentId === user?.id);
  const [open, setOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [form, setForm] = useState({ title: "", category: "" as SkillCategory, description: "", proof: "" });

  const filteredSkills = filterCategory === "all" ? mySkills : mySkills.filter((s) => s.category === filterCategory);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addSkill(form);
    setForm({ title: "", category: "" as SkillCategory, description: "", proof: "" });
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Skills</h1>
            <p className="text-muted-foreground mt-1">Manage and track your skill submissions.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4" /> Add Skill</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Skill</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label>Skill Title</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Public Speaking" required />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val as SkillCategory })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {SKILL_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your achievement..." required />
                </div>
                <div className="space-y-2">
                  <Label>Proof / Certificate</Label>
                  <Input value={form.proof} onChange={(e) => setForm({ ...form, proof: e.target.value })} placeholder="Link or description of proof" required />
                </div>
                <Button type="submit" className="w-full">Submit for Verification</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filterCategory === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}
          >
            All ({mySkills.length})
          </button>
          {SKILL_CATEGORIES.map((cat) => {
            const count = mySkills.filter((s) => s.category === cat.value).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.value}
                onClick={() => setFilterCategory(cat.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filterCategory === cat.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}
              >
                {cat.emoji} {cat.value} ({count})
              </button>
            );
          })}
        </div>

        {filteredSkills.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p>No skills found. {mySkills.length === 0 ? 'Click "Add Skill" to get started!' : "Try a different filter."}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentSkills;
