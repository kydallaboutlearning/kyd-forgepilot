
import { DashboardRecentWorksSettings } from "../DashboardRecentWorksSettings";

type Props = {
  recentWorks: any;
  currentRecentWorks: any;
  isPending: boolean;
  onSubmit: (vals: any) => void;
};

export function RecentWorksSettingsSection({ recentWorks, currentRecentWorks, isPending, onSubmit }: Props) {
  // Pass both current and editable limit to the settings component!
  return (
    <DashboardRecentWorksSettings
      settings={recentWorks}
      current={currentRecentWorks}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
}
