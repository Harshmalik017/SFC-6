# Indicators & triangulation
**Categories:** Demography & Profile · Revenue & Receipts · Expenditure & Utilisation · Grants (SFC / CFC) · Government Schemes · Infrastructure & Services · Human Resources · Liabilities & Assets · Audit & Governance.
**Naming rule:** ratios end with "(%)" (or "per 1,000"); every ratio lists Numerator and Denominator in small bullets under its table. Definitions live in lib/factsheet.ts (helper p() / q()).
**Triangulation checks (lib/factsheet.ts CHECKS):** c1 receipts vs expenditure · c2/c3 SFC/CFC received vs utilised · c4 scheme bound · c5 roll-up reconciliation · c6 hierarchy count vs location master · c7 population vs Census · c8 audit vs finance completeness · c9 unit sanity (₹ thousand vs ₹ lakh) · c10 year-on-year jump · c11 peer outlier. Each level lists its applicable checks; status turns live once data is loaded (v0.4).
**Views:** State and District have Rural (ZP/KP/GP) and Urban (ULB by body type) views — never mixed.
