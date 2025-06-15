
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

const formSchema = z.object({
  recent_works_headline: z.string().min(1, "Headline is required"),
});

type RecentWorksFormValues = z.infer<typeof formSchema>;

interface DashboardRecentWorksSettingsProps {
  settings: Partial<RecentWorksFormValues>;
  current: Partial<RecentWorksFormValues>;
  isPending: boolean;
  onSubmit: (values: RecentWorksFormValues) => void;
}

export function DashboardRecentWorksSettings({ settings, current, isPending, onSubmit }: DashboardRecentWorksSettingsProps) {
  const form = useForm<RecentWorksFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
  });

  useEffect(() => {
    form.reset(settings);
  }, [settings, form]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Works Section</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="recent_works_headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headline</FormLabel>
                  <FormControl>
                    <Input placeholder="Recent Works" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
