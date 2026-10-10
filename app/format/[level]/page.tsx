import { notFound } from "next/navigation";
import { Factsheet } from "@/components/factsheet";
import { LEVELS, getLevel } from "@/lib/factsheet";
export const generateStaticParams = () => LEVELS.map((l) => ({ level: l.slug }));
export default function Format({ params, searchParams }: { params: { level: string }; searchParams: { view?: string } }) {
  const l = getLevel(params.level); if (!l) notFound();
  return <Factsheet level={l} title={`${l.label} factsheet format`} crumbs={[{ label: "Uttar Pradesh", href: "/" }]} preview view={searchParams.view === "urban" ? "urban" : "rural"} />;
}
