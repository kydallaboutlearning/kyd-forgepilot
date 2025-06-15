
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

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DashboardBenefitsConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
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
              onClick={onConfirm}
            >
              Yes, save changes
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
