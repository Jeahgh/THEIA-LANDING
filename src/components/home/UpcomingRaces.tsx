import { getActiveRaces } from '@/lib/races';
import { getRaceSchedule } from '@/lib/race-schedule';
import UpcomingRacesPreview from '@/components/home/UpcomingRacesPreview';

export default async function UpcomingRaces() {
  const { upcoming } = getRaceSchedule(await getActiveRaces());
  return <UpcomingRacesPreview races={upcoming.slice(0, 3)} />;
}
