
import { DashboardContactCTASettings } from "../DashboardContactCTASettings";

type Props = {
  contactCTA: any;
  currentContactCTA: any;
  isPending: boolean;
  onSubmit: (vals: any) => void;
};

export function ContactCTASettingsSection({ contactCTA, currentContactCTA, isPending, onSubmit }: Props) {
  return (
    <DashboardContactCTASettings
      settings={contactCTA}
      current={currentContactCTA}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
}
