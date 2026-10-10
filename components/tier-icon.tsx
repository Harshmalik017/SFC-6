import { Building2, Landmark, TreePine, Building } from "lucide-react";
export function TierIcon({ k, className }: { k: string; className?: string }) {
  const I = k === "tree" ? TreePine : k === "building" ? Building : k === "landmark" ? Landmark : Building2;
  return <I className={className} />;
}
