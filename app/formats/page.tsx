import { FactsheetFormatsBrowser } from "@/components/factsheet-formats-browser";
import { stateCounts } from "@/lib/locations";

export default function FactsheetFormatsPage() {
  return <FactsheetFormatsBrowser locationCounts={stateCounts()} />;
}
