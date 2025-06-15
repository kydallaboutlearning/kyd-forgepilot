
import { useForm, useFieldArray } from "react-hook-form";
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
import { type BenefitItem, type BenefitItemIcon } from "@/types/cms";
import { Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

const benefitItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Description is required"),
  icon: z.enum(["Brain", "LayoutDashboard", "Users"]),
});

const formSchema = z.object({
  benefits_headline: z.string().min(1, "Headline is required"),
  benefits_items: z.array(benefitItemSchema).max(3, "You can have a maximum of 3 benefits."),
});

type BenefitsFormValues = z.infer<typeof formSchema>;

interface DashboardBenefitsSettingsProps {
  settings: Partial<BenefitsFormValues>;
  current: Partial<BenefitsFormValues>;
  isPending: boolean;
  onSubmit: (values: BenefitsFormValues) => void;
}

const iconOptions: BenefitItemIcon[] = ["Brain", "LayoutDashboard", "Users"];

export function DashboardBenefitsSettings({
  settings,
  current,
  isPending,
  onSubmit,
}: DashboardBenefitsSettingsProps) {
  const form = useForm<BenefitsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
  });

  useEffect(() => {
    form.reset(settings);
  }, [settings, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "benefits_items",
  });

  // Icon preview utility
  const renderIcon = (icon: BenefitItemIcon | undefined) => {
    if (!icon) return null;
    if (icon === "Brain") return <span className="inline-block"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5.5 15.5C4 16 2 15 2 12s2-4 3.5-4.5A3.5 3.5 0 0112 5.5m7 10c1.5.5 3.5-.5 3.5-3.5s-2-4-3.5-4.5A3.5 3.5 0 0012 5.5m0 13v-11m0 11a3.5 3.5 0 010-7m0 7a3.5 3.5 0 010-7" /></svg></span>;
    if (icon === "LayoutDashboard") return <span className="inline-block"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>;
    if (icon === "Users") return <span className="inline-block"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-3-3.87"/><path d="M9 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/></svg></span>;
    return null;
  };

  return (
    <div>
      {/* Current Content Display */}
      <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg px-4 py-4 mb-2">
        <h2 className="text-sm text-neutral-400 font-semibold mb-2">Current Why Automate with Us Section</h2>
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-medium text-neutral-300">Headline: </span>
            <span className="text-neutral-200">
              {current.benefits_headline || <span className="italic text-neutral-600">Not set</span>}
            </span>
          </div>
          <div className="pt-1">
            <span className="font-medium text-neutral-300">Benefit Items:</span>
            <ul className="mt-2 space-y-1">
              {(current.benefits_items && Array.isArray(current.benefits_items) && current.benefits_items.length > 0)
                ? current.benefits_items.map((item, idx) => (
                  <li key={idx} className="flex gap-2 items-center bg-neutral-800 rounded p-2">
                    {renderIcon(item.icon)}
                    <span className="font-semibold text-neutral-200">{item.title || <span className="italic text-neutral-500">No title</span>}</span>
                    <span className="ml-3 text-neutral-300">{item.desc || <span className="italic text-neutral-500">No desc</span>}</span>
                    <span className="ml-2 text-xs text-neutral-400">[{item.icon}]</span>
                  </li>
                ))
                : <li className="italic text-neutral-600 ml-1">No benefit items set</li>
              }
            </ul>
          </div>
        </div>
      </div>

      {/* Editable Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-white mb-1">Why Automate with Us Section</h2>
        <Form {...form}>
          <FormField
            control={form.control}
            name="benefits_headline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headline</FormLabel>
                <FormControl>
                  <Input placeholder="Why Automate with Us" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Editable benefit items */}
          <div>
            <FormLabel>Benefit Items</FormLabel>
            <div className="space-y-4 mt-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-4 p-4 border rounded-md bg-neutral-900">
                  <div className="flex-1 space-y-4">
                    <FormField
                      control={form.control}
                      name={`benefits_items.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`benefits_items.${index}.desc`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`benefits_items.${index}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an icon" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {iconOptions.map(icon => (
                                <SelectItem key={icon} value={icon}>
                                  <span className="flex items-center gap-2">
                                    {renderIcon(icon)}
                                    <span>{icon}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {fields.length < 3 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => append({ title: "", desc: "", icon: "Brain" })}
              >
                Add Benefit
              </Button>
            )}
          </div>
          <Button className="self-end mt-3" type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Form>
      </form>
    </div>
  );
}

