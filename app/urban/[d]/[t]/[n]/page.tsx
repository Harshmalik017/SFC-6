import { Factsheet } from "@/components/factsheet";
import { getLevel } from "@/lib/factsheet";
import { BODY_TYPES, bodiesOf, districtName, nameOf, urbanCounts } from "@/lib/locations";
export default function Urban({ params: { d, t, n } }: { params: { d: string; t: string; n: string } }) {
  return <Factsheet level={getLevel("urban")!} title={nameOf(bodiesOf(d, t), n)} crumbs={[{ label: "Uttar Pradesh", href: "/" }, { label: districtName(d), href: `/district/${d}` }, { label: nameOf(BODY_TYPES, t) }]} counts={urbanCounts(d, n)} />;
}
