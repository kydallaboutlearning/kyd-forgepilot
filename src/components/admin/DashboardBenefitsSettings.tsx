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
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

// validation schemas
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
  // Local state for editing values
  const [local, setLocal] = useState<BenefitsFormValues>({
    benefits_headline: settings.benefits_headline || "",
    benefits_items: settings.benefits_items || [],
  });
  const [showConfirm, setShowConfirm] = useState(false);

  // Keep local in sync with latest settings
  useEffect(() => {
    setLocal({
      benefits_headline: settings.benefits_headline || "",
      benefits_items: settings.benefits_items || [],
    });
  }, [settings]);

  // react-hook-form set up
  const form = useForm<BenefitsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: local,
    mode: "onChange",
    values: local, // For controlled form from local state
  });

  useEffect(() => {
    form.reset(local);
  }, [local, form]);

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

  // Controlled input update
  const onFieldChange = (key: keyof BenefitsFormValues, value: any) => {
    setLocal((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Used for field array item
  const onItemChange = (idx: number, key: keyof BenefitItem, value: any) => {
    setLocal((prev) => {
      const items = [...prev.benefits_items];
      items[idx] = { ...items[idx], [key]: value };
      return { ...prev, benefits_items: items };
    });
  };

  // Save form triggers confirmation dialog
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // Confirm (submit) changes
  function confirm() {
    onSubmit(local);
    setShowConfirm(false);
  }

  return (
    <>
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

      {/* Editable Form: match logic and design of hero section */}
      <form onSubmit={handleForm} className="bg-[#19191b] border border-neutral-800 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-white mb-1">Why Automate with Us Section</h2>
        <div className="space-y-3">
          <label className="block text-sm text-neutral-300 font-medium">Headline</label>
          <Input
            name="benefits_headline"
            value={local.benefits_headline}
            onChange={e => onFieldChange("benefits_headline", e.target.value)}
            placeholder="Why Automate with Us"
          />
        </div>
        {/* Editable benefit items */}
        <div>
          <label className="block text-sm text-neutral-300 font-medium">Benefit Items</label>
          <div className="space-y-4 mt-2">
            {local.benefits_items.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-md bg-neutral-900">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium">Title</label>
                    <Input
                      value={item.title}
                      onChange={e => onItemChange(index, "title", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium">Description</label>
                    <Input
                      value={item.desc}
                      onChange={e => onItemChange(index, "desc", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium">Icon</label>
                    <Select
                      value={item.icon}
                      onValueChange={value => onItemChange(index, "icon", value)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
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
                  </div>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => onFieldChange(
                    "benefits_items", local.benefits_items.filter((_, i) => i !== index)
                  )}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {local.benefits_items.length < 3 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() =>
                onFieldChange("benefits_items", [
                  ...local.benefits_items,
                  { title: "", desc: "", icon: "Brain" },
                ])
              }
            >
              Add Benefit
            </Button>
          )}
        </div>
        <Button className="self-end mt-3" type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>

      {/* Confirmation Dialog: same design/copy as hero section, but for benefits */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to update the "Why Automate with Us" section?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will overwrite the previous content for this section. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <button type="button" className="mt-0">Cancel</button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                type="button"
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={confirm}
              >
                Yes, save changes
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
