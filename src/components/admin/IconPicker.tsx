
import React from "react";
import {
  Users, Settings, Heart, Star, Check, ArrowRight, Phone, Mail, Globe, Shield,
  Brain, LayoutDashboard, Bot, BarChart, Wrench, Lightbulb, Briefcase, Rocket, Book, HelpCircle, FileText, DollarSign
} from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const AVAILABLE_ICONS = [
  { label: "Users", value: "users", icon: Users },
  { label: "Settings", value: "settings", icon: Settings },
  { label: "Heart", value: "heart", icon: Heart },
  { label: "Star", value: "star", icon: Star },
  { label: "Check", value: "check", icon: Check },
  { label: "Arrow Right", value: "arrow-right", icon: ArrowRight },
  { label: "Phone", value: "phone", icon: Phone },
  { label: "Mail", value: "mail", icon: Mail },
  { label: "Globe", value: "globe", icon: Globe },
  { label: "Shield", value: "shield", icon: Shield },
  { label: "Brain", value: "brain", icon: Brain },
  { label: "Dashboard", value: "layout-dashboard", icon: LayoutDashboard },
  { label: "Bot", value: "bot", icon: Bot },
  { label: "Bar Chart", value: "bar-chart", icon: BarChart },
  { label: "Wrench", value: "wrench", icon: Wrench },
  { label: "Lightbulb", value: "lightbulb", icon: Lightbulb },
  { label: "Briefcase", value: "briefcase", icon: Briefcase },
  { label: "Rocket", value: "rocket", icon: Rocket },
  { label: "Book", value: "book", icon: Book },
  { label: "Help Circle", value: "help-circle", icon: HelpCircle },
  { label: "File Text", value: "file-text", icon: FileText },
  { label: "Dollar Sign", value: "dollar-sign", icon: DollarSign },
];

type IconPickerProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function IconPicker({ value, onChange, className }: IconPickerProps) {
  const selected = AVAILABLE_ICONS.find(i => i.value === value);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("w-44", className)}>
        <span className="flex items-center gap-2">
          {selected ? <selected.icon className="w-5 h-5" /> : null}
          <SelectValue placeholder="Select icon" />
        </span>
      </SelectTrigger>
      <SelectContent>
        {AVAILABLE_ICONS.map(icon => (
          <SelectItem key={icon.value} value={icon.value} className="flex items-center">
            <span className="flex items-center gap-2">
              <icon.icon className="w-5 h-5" />
              {icon.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function IconDisplay({ name, className }: { name: string; className?: string }) {
  const item = AVAILABLE_ICONS.find(i => i.value === name);
  if (!item) return <span>{name}</span>;
  const LucideIcon = item.icon;
  return <LucideIcon className={cn("inline w-5 h-5", className)} />;
}
