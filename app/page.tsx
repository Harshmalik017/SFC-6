import Image from "next/image";
import { Factsheet } from "@/components/factsheet";
import { LocationPicker } from "@/components/location-picker";
import { StateMap } from "@/components/state-map";
import { Card, CardContent } from "@/components/ui/card";
import { getLevel } from "@/lib/factsheet";
import { stateCounts } from "@/lib/locations";

export default function Home({ searchParams }: { searchParams: { view?: string } }) {
  const view = searchParams.view === "urban" ? "urban" : "rural";
  const counts = stateCounts();
  const overviewCounts = [
    { label: "Districts", value: counts.Districts },
    { label: "Kshetra Panchayats (blocks)", value: counts["Kshetra Panchayats (blocks)"] },
    { label: "Gram Panchayats", value: counts["Gram Panchayats"] },
    { label: "Urban local bodies", value: counts["Urban local bodies (number)"] },
    { label: "Nagar Nigam", value: counts["Nagar Nigam"] },
    { label: "Nagar Palika Parishad", value: counts["Nagar Palika Parishad"] },
    { label: "Nagar Panchayat", value: counts["Nagar Panchayat"] },
  ];

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
      <Factsheet level={getLevel("state")!} title="Uttar Pradesh" crumbs={[]} view={view} counts={counts} hideSource hideHeader>
        <LocationPicker key={view} view={view} />
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Local government counts">
          {overviewCounts.map(({ label, value }) => (
            <Card key={label} className="border-white/80 bg-gradient-to-br from-amber-300/25 via-orange-100/55 to-[#fffaf0]">
              <CardContent className="p-5">
                <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-900/65">{label}</h2>
                <p className="mt-2 text-2xl font-bold tracking-tight text-amber-950">{value ?? "—"}</p>
              </CardContent>
            </Card>
          ))}
        </section>
        <Card>
          <CardContent className="pt-6">
            <StateMap />
          </CardContent>
        </Card>
      </Factsheet>
    </div>
  );
}
