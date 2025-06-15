
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import bcrypt from "bcryptjs";
import { toast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "leeekayode@gmaillcom";
const ADMIN_PASSWORD = "learning4me";

export default function CreateAdminDevTool() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleCreateAdmin = async () => {
    setLoading(true);
    try {
      // 1. Bcrypt hash the password
      const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);

      // 2. Insert/update admin credentials in site_settings
      await supabase
        .from("site_settings")
        .insert([
          {
            admin_email: ADMIN_EMAIL,
            admin_password_hash: hash,
            updated_at: new Date().toISOString(),
          },
        ], { upsert: true, onConflict: "admin_email" });

      // 3. Try to create the Supabase Auth user
      // First, check if user exists
      const { data: existingUser, error: userLookupErr } = await supabase.auth.admin.listUsers({ email: ADMIN_EMAIL });
      if (userLookupErr) {
        toast({ variant: "destructive", title: "Error looking up user", description: userLookupErr.message });
        setLoading(false);
        return;
      }
      if (existingUser?.users?.length > 0) {
        // User already exists, try to reset password
        const { error: updateErr } = await supabase.auth.admin.updateUserById(existingUser.users[0].id, { password: ADMIN_PASSWORD, email_confirm: true });
        if (updateErr) {
          toast({ variant: "destructive", title: "Error updating password", description: updateErr.message });
          setLoading(false);
          return;
        }
      } else {
        // Create user
        const { error: createUserError } = await supabase.auth.admin.createUser({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          email_confirm: true,
        });
        if (createUserError) {
          toast({ variant: "destructive", title: "Error creating admin", description: createUserError.message });
          setLoading(false);
          return;
        }
      }

      toast({ title: "Admin created!", description: `Email: ${ADMIN_EMAIL}` });
      setDone(true);
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="p-4 bg-green-100 border border-green-300 rounded text-green-800 mt-6 text-center">
        Success! Admin account set to <b>{ADMIN_EMAIL}</b>.
        <br />You can now log in.
      </div>
    );
  }

  return (
    <div className="p-4 bg-orange-100 border border-orange-300 rounded text-orange-800 mt-6 mb-6 flex flex-col items-center">
      <div className="mb-2"><b>DEV TOOL:</b> Create or reset admin account for local dev</div>
      <Button onClick={handleCreateAdmin} disabled={loading}>
        {loading ? "Setting up..." : `Create admin: ${ADMIN_EMAIL}`}
      </Button>
      <div className="text-xs mt-2 text-orange-600">
        <b>For local/dev use only!</b> Remove this tool before deploying to production.
      </div>
    </div>
  );
}
