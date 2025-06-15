
import { SiteHeroSettings } from "../SiteHeroSettings";

type Props = {
  hero: any;
  currentHero: any;
  isPending: boolean;
  onSubmit: (vals: any) => void;
};

export function HeroSettingsSection({ hero, currentHero, isPending, onSubmit }: Props) {
  return (
    <SiteHeroSettings
      hero={hero}
      current={currentHero}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
}
