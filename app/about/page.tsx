import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const items = ["Data is collected from local bodies through the SFC portal in four formats (ULB, ZP, KP, GP).", "It supports vertical devolution, horizontal distribution, sector-specific grants and governance reforms.", "This draft shows structure only; sample charts are illustrative."];
export default function About() {
  return (<div className="space-y-6"><h1 className="text-2xl font-bold">About</h1><Card><CardHeader><CardTitle>Purpose</CardTitle><CardDescription>Evidence-based, need-based analysis for the Sixth State Finance Commission.</CardDescription></CardHeader><CardContent><ul className="list-disc space-y-2 pl-5 text-sm">{items.map((i) => <li key={i}>{i}</li>)}</ul></CardContent></Card></div>);
}
