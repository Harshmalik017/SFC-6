// Structure derived from the blank Sixth SFC detail forms (Project files). No real values yet.
export const YEARS = ["2020-21", "2021-22", "2022-23", "2023-24", "2024-25"];
export const DISCLAIMER = "This portal is an analytical demonstration environment — not an official Government of Uttar Pradesh website. Original information is drawn from Department for representation and visualization. For authoritative records and official transactions, refer to department's designated channels.";
export type Tier = { slug: string; name: string; short: string; icon: "tree" | "building" | "landmark" | "city"; pages: number; unit: string; blurb: string; sections: string[]; kpis: string[] };
export const TIERS: Tier[] = [
  { slug: "gram-panchayat", name: "Gram Panchayat", short: "GP", icon: "tree", pages: 25, unit: "₹ thousand", blurb: "Village-level body: 57,694 unique GPs.",
    sections: ["General information", "Taxes / charges / fees", "Income (past years)", "Expenditure (past years)", "Scheme funds received & used", "Buildings, roads & bridges", "Staff details", "Liabilities", "Assets", "SFC grant utilisation", "CFC grant utilisation", "Tax arrears & recovery"],
    kpis: ["Own-source revenue", "SFC grant utilisation %", "Tax recovery %", "Infrastructure per 1,000 pop."] },
  { slug: "kshetra-panchayat", name: "Kshetra Panchayat", short: "KP", icon: "building", pages: 6, unit: "₹ thousand", blurb: "Intermediate (block) tier.",
    sections: ["General information & audit", "Receipts", "Expenditure", "Government scheme funds", "Works from SFC allocation", "Works from CFC allocation"],
    kpis: ["Receipts by source", "Scheme fund balance", "Audit compliance", "SFC works split"] },
  { slug: "zila-panchayat", name: "Zila Panchayat", short: "ZP", icon: "landmark", pages: 27, unit: "₹ thousand", blurb: "District-level panchayat.",
    sections: ["General information", "Audit details", "Receipts", "Expenditure", "Government scheme funds", "SFC works", "CFC works", "Activities & services 2024-25", "Additional / future needs", "Declaration"],
    kpis: ["Receipts by source", "Expenditure vs receipts", "Maintenance vs new works", "Audit compliance"] },
  { slug: "urban-local-body", name: "Urban Local Body", short: "ULB", icon: "city", pages: 27, unit: "₹ lakh", blurb: "Nagar Panchayat, Palika Parishad & Nagar Nigam.",
    sections: ["General information & audit", "Receipts", "Expenditure", "Plan-wise receipt / expenditure", "Works / assets / budget", "Liabilities", "Loan repayment", "Assets", "Additional assets / future needs", "Declaration"],
    kpis: ["Own-source revenue", "Grant dependency", "Liabilities vs assets", "Property-tax share"] },
];
// ILLUSTRATIVE placeholder numbers (not real) for chart layout only.
export const DEMO_RECEIPTS = YEARS.map((y, i) => ({ year: y, SFC: 30 + i * 4, CFC: 40 + i * 5, "State grants": 20 + i * 2, "Own sources": 10 + i * 3 }));
export const DATASETS = [
  { n: 4, name: "UP Assembly – Gram Panchayat Mapping", role: "Spine: GP → Block → District → AC", required: "Required" },
  { n: 2, name: "UP All Districts Detail Report", role: "District master, area, population", required: "Required" },
  { n: 3, name: "UP Parliament & Assembly Constituencies List", role: "AC → PC rollup", required: "Required" },
  { n: 1, name: "403 UP Assembly Constituency-wise", role: "AC attributes, reservation", required: "Recommended" },
];
