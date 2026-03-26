import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { SkillCard } from "@/components/SkillCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const StudentSkills = () => {
  const { user, skills, addSkill } = useApp();
  const mySkills = skills.filter((s) => s.studentId === user?.id);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", description: "", proof: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addSkill(form);
    setForm({ title: "", category: "", description: "", proof: "" });
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
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
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Leadership, Technical, Creative" required />
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

        {mySkills.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p>No skills added yet. Click "Add Skill" to get started!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {mySkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentSkills;
