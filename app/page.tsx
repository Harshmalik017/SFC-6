import Image from "next/image";
import { Factsheet } from "@/components/factsheet";
import { LocationPicker } from "@/components/location-picker";
import { StateMap } from "@/components/state-map";
import { Card, CardContent } from "@/components/ui/card";
import { getLevel } from "@/lib/factsheet";
import { stateCounts } from "@/lib/locations";

export default function Home({ searchParams }: { searchParams: { view?: string } }) {
  const view = searchParams.view === "urban" ? "urban" : "rural";

  return (
    <div className="relative isolate min-h-[calc(100vh-8rem)]">
      <Image
        src="/images/uttar-pradesh-dashboard-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/45" />
      <Factsheet level={getLevel("state")!} title="Uttar Pradesh" crumbs={[]} view={view} counts={stateCounts()} hideSource hideHeader>
        <LocationPicker key={view} view={view} />
        <Card>
          <CardContent className="pt-6">
            <StateMap />
          </CardContent>
        </Card>
      </Factsheet>
    </div>
  );
}
