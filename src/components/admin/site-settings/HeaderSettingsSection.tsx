
import { SiteHeaderSettings } from "../SiteHeaderSettings";

type Props = {
  header: any;
  currentHeader: any;
  isPending: boolean;
  onSubmit: (vals: any) => void;
};

export function HeaderSettingsSection({ header, currentHeader, isPending, onSubmit }: Props) {
  return (
    <SiteHeaderSettings
      header={header}
      current={currentHeader}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
}
