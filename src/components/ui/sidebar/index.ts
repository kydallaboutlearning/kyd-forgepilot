
export * from "./SidebarMenuButton";
export * from "./SidebarMenuItem";
export * from "./SidebarMenu";
export * from "./SidebarGroup";
export * from "./SidebarGroupLabel";

// Add stubs for missing SidebarGroupContent and SidebarGroupAction
import * as React from "react";
import { cn } from "@/lib/utils";

// SidebarGroupContent component
export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1 py-1", className)}
    data-sidebar="group-content"
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

// SidebarGroupAction (empty stub, as it's referenced but not defined anywhere)
export const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("ml-auto px-2 py-1 text-xs font-semibold text-sidebar-foreground rounded hover:bg-sidebar-accent", className)}
    data-sidebar="group-action"
    {...props}
  />
));
SidebarGroupAction.displayName = "SidebarGroupAction";
