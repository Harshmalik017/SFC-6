import { Factsheet } from "@/components/factsheet";
import { getLevel } from "@/lib/factsheet";
import { blocksOf, districtName, gpsOf, nameOf } from "@/lib/locations";
export default function GP({ params: { d, b, g } }: { params: { d: string; b: string; g: string } }) {
  return <Factsheet level={getLevel("gram-panchayat")!} title={nameOf(gpsOf(d, b), g)} crumbs={[{ label: "Uttar Pradesh", href: "/" }, { label: districtName(d), href: `/district/${d}` }, { label: nameOf(blocksOf(d), b), href: `/block/${d}/${b}` }]} />;
}
