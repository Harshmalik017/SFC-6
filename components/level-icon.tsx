import { Building2, Landmark, LayoutGrid, MapPinned, TreePine, Building } from "lucide-react";
export function LevelIcon({ k, className }: { k: string; className?: string }) {
  const I = ({ landmark: Landmark, map: MapPinned, blocks: LayoutGrid, tree: TreePine, city: Building2 } as Record<string, typeof Building>)[k] ?? Building;
  return <I className={className} />;
}
