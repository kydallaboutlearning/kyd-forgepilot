
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus } from "lucide-react";

type AdminToken = {
  id: string;
  token: string;
  description: string | null;
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
};

export default function DashboardTokenSettings() {
  const [tokens, setTokens] = useState<AdminToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTokenDescription, setNewTokenDescription] = useState("");

  const fetchTokens = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_tokens")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      setTokens(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const generateToken = () => {
    return `admin-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  };

  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    const newToken = generateToken();
    
    setLoading(true);
    const { error } = await supabase
      .from("admin_tokens")
      .insert([{ 
        token: newToken, 
        description: newTokenDescription || null 
      }]);

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: "Token created!", description: `New token: ${newToken}` });
      setNewTokenDescription("");
      fetchTokens();
    }
    setLoading(false);
  };

  const handleDeleteToken = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this token?")) return;
    
    setLoading(true);
    const { error } = await supabase
      .from("admin_tokens")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: "Token deleted!" });
      fetchTokens();
    }
    setLoading(false);
  };

  const handleToggleToken = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    const { error } = await supabase
      .from("admin_tokens")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: `Token ${!currentStatus ? 'activated' : 'deactivated'}!` });
      fetchTokens();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Token</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateToken} className="space-y-4">
            <div>
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                value={newTokenDescription}
                onChange={e => setNewTokenDescription(e.target.value)}
                placeholder="e.g., Mobile access token"
              />
            </div>
            <Button type="submit" disabled={loading}>
              <Plus className="w-4 h-4 mr-2" />
              Generate New Token
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          {tokens.length === 0 ? (
            <p className="text-muted-foreground">No tokens found.</p>
          ) : (
            <div className="space-y-4">
              {tokens.map((token) => (
                <div key={token.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded">{token.token}</code>
                      <Badge variant={token.is_active ? "default" : "secondary"}>
                        {token.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    {token.description && (
                      <p className="text-sm text-muted-foreground">{token.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(token.created_at).toLocaleDateString()}
                      {token.last_used_at && (
                        <span> • Last used: {new Date(token.last_used_at).toLocaleDateString()}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleToken(token.id, token.is_active)}
                      disabled={loading}
                    >
                      {token.is_active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteToken(token.id)}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
