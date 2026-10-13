import { Factsheet } from "@/components/factsheet";
import { LocationPicker } from "@/components/location-picker";
import { StateMap } from "@/components/state-map";
import { StateOverviewCharts } from "@/components/state-overview-charts";
import { Card, CardContent } from "@/components/ui/card";
import { getLevel } from "@/lib/factsheet";
import { stateCounts } from "@/lib/locations";

export default function Home({ searchParams }: { searchParams: { view?: string } }) {
  const view = searchParams.view === "urban" ? "urban" : "rural";

  return (
    <Factsheet level={getLevel("state")!} title="Uttar Pradesh" crumbs={[]} view={view} counts={stateCounts()} hideSource>
      <LocationPicker key={view} view={view} />
      <StateOverviewCharts />
      <Card>
        <CardContent className="pt-6">
          <StateMap />
        </CardContent>
      </Card>
    </Factsheet>
  );
}
