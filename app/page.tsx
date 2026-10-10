import { Factsheet } from "@/components/factsheet";
import { StateMap } from "@/components/state-map";
import { LocationPicker } from "@/components/location-picker";
import { Card, CardContent } from "@/components/ui/card";
import { getLevel } from "@/lib/factsheet";
import { stateCounts } from "@/lib/locations";
export default function Home({ searchParams }: { searchParams: { view?: string } }) {
  const view = searchParams.view === "urban" ? "urban" : "rural";
  return (
    <Factsheet level={getLevel("state")!} title="Uttar Pradesh" crumbs={[]} view={view} counts={stateCounts()} hideSource>
      <LocationPicker key={view} view={view} />
      <Card><CardContent className="pt-6"><StateMap /></CardContent></Card>
    </Factsheet>
  );
}
