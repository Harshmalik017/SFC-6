# Reports (/reports)
The single reports page lists the four source forms and opens each in an accessible dialog. The dialog supports PDF-page filtering, Hindi/English switching (Hindi by default), and per-table Excel/CSV exports. The information note expands inline on the same page.

Source: normalised copies of project JSON in data/reports/*.json (generated: pages → tables → columns/rows; Gram columns merged from column_no/group). `lib/reports.ts` maps the data. Report data is dynamically loaded when a report is opened. The source information note is `public/docs/Information-Being-Collected-From-Local-Bodies.md`.
