
import { DashboardRecentWorksSettings } from "../DashboardRecentWorksSettings";

type Props = {
  recentWorks: any;
  currentRecentWorks: any;
  isPending: boolean;
  onSubmit: (vals: any) => void;
};

export function RecentWorksSettingsSection({ recentWorks, currentRecentWorks, isPending, onSubmit }: Props) {
  return (
    <DashboardRecentWorksSettings
      settings={recentWorks}
      current={currentRecentWorks}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
}
