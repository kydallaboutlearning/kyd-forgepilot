
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { hashPassword } from "@/utils/hash";

export default function AddAdminForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    const password_hash = await hashPassword(password);
    const { error } = await supabase
      .from("admin_users")
      .insert([{ email, password_hash }]);
    setLoading(false);
    if (error) {
      setErr(error.message ?? "Failed to add admin.");
    } else {
      setEmail("");
      setPassword("");
      if (onSuccess) onSuccess();
    }
  }

  return (
    <form onSubmit={handleAdd} className="space-y-4">
      <Input
        type="email"
        placeholder="New Admin Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        minLength={6}
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {err && <div className="text-destructive text-sm">{err}</div>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Adding..." : "Add Admin"}
      </Button>
    </form>
  );
}
