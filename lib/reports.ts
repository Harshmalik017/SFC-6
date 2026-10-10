import gpEn from "@/data/reports/gram-panchayat.en.json";
import gpHi from "@/data/reports/gram-panchayat.hi.json";
import kpEn from "@/data/reports/kshetra-panchayat.en.json";
import kpHi from "@/data/reports/kshetra-panchayat.hi.json";
import zpEn from "@/data/reports/zila-panchayat.en.json";
import zpHi from "@/data/reports/zila-panchayat.hi.json";
import ulEn from "@/data/reports/urban-local-body.en.json";
import ulHi from "@/data/reports/urban-local-body.hi.json";
export type RTable = { name: string; unit: string; cols: string[]; rows: { c: string[]; t: string }[] };
export type RPage = { n: number; p: string; h: string; s: string; f: string[][]; cover: string[] | null; tables: RTable[]; notes: string[] };
export type Report = { title: string; subtitle: string; lang: string; pages: RPage[] };
const c = (x: unknown) => x as Report;
export const REPORTS = [
  { id: "gram-panchayat", label: "Gram Panchayat form", icon: "tree", pill: "छठा राज्य वित्त आयोग, उत्तर प्रदेश — विवरण पत्र–ग्राम पंचायत", en: c(gpEn), hi: c(gpHi) },
  { id: "kshetra-panchayat", label: "Kshetra Panchayat form", icon: "blocks", pill: "छठा राज्य वित्त आयोग विवरण पत्र - क्षेत्र पंचायत", en: c(kpEn), hi: c(kpHi) },
  { id: "zila-panchayat", label: "Zila Panchayat form", icon: "map", pill: "छठा राज्य वित्त आयोग, उत्तर प्रदेश विवरण पत्र-जिला पंचायत", en: c(zpEn), hi: c(zpHi) },
  { id: "urban-local-body", label: "Urban Local Body form", icon: "city", pill: "छठा राज्य वित्त आयोग, उत्तर प्रदेश विवरण पत्र - नगरीय स्थानीय निकाय", en: c(ulEn), hi: c(ulHi) },
];
