import Image from "next/image";
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
      <section className="overflow-hidden rounded-[24px] border border-white/80 bg-[#fffaf0] shadow-clay-card sm:grid sm:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]" aria-labelledby="services-image-title">
        <div className="relative h-40 sm:h-full sm:min-h-[180px]">
          <Image
            src={view === "rural" ? "/images/rural-infrastructure.png" : "/images/urban-local-services.png"}
            alt={view === "rural"
              ? "Illustrative village road, homes, and public water tower"
              : "Illustrative city street with public spaces and a civic service building"}
            fill
            sizes="(max-width: 640px) 100vw, 42vw"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange-800">Illustrative context</p>
          <h2 id="services-image-title" className="mt-1 text-xl font-bold tracking-tight text-amber-950">
            {view === "rural" ? "Rural infrastructure & services" : "Urban services & public spaces"}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-amber-900/65">
            These visuals set the local context; they are illustrative and do not represent reported locations or finance data.
          </p>
        </div>
      </section>
      <StateOverviewCharts />
      <Card>
        <CardContent className="pt-6">
          <StateMap />
        </CardContent>
      </Card>
    </Factsheet>
  );
}
