"use client";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const trendData = [
  { year: "2020-21", rural: 1180, urban: 910, total: 2090 },
  { year: "2021-22", rural: 1320, urban: 980, total: 2300 },
  { year: "2022-23", rural: 1480, urban: 1040, total: 2520 },
  { year: "2023-24", rural: 1640, urban: 1120, total: 2760 },
  { year: "2024-25", rural: 1825, urban: 1240, total: 3065 },
];

const fundingMix = [
  { name: "SFC grants", value: 38, color: "#c2410c" },
  { name: "CFC grants", value: 22, color: "#ea580c" },
  { name: "State grants", value: 21, color: "#f59e0b" },
  { name: "Own sources", value: 19, color: "#facc15" },
];

const tierMix = [
  { name: "Gram Panchayat", value: 42 },
  { name: "Kshetra Panchayat", value: 18 },
  { name: "Zila Panchayat", value: 24 },
  { name: "Urban LBs", value: 16 },
];

export function StateOverviewCharts() {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader className="gap-2">
          <CardTitle>Receipts trend by finance tier</CardTitle>
          <CardDescription>Illustrative demo values for rural and urban receipts; these are not official finance data.</CardDescription>
        </CardHeader>
        <CardContent className="h-80 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="ruralFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.75} />
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0.08} />
                </linearGradient>
                <linearGradient id="urbanFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.78} />
                  <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 5" stroke="#eadcc5" vertical={false} />
              <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#78553b" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#78553b" }} />
              <Tooltip
                contentStyle={{ borderRadius: 16, border: "1px solid #f0d6a9", background: "#fffaf0", boxShadow: "5px 6px 14px rgba(129, 91, 37, 0.14)" }}
              />
              <Legend />
              <Area type="monotone" dataKey="rural" stroke="#ea580c" strokeWidth={3} fill="url(#ruralFill)" name="Rural" />
              <Area type="monotone" dataKey="urban" stroke="#f59e0b" strokeWidth={3} fill="url(#urbanFill)" name="Urban" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="gap-2">
          <CardTitle>Funding mix</CardTitle>
          <CardDescription>Illustrative source mix; replace with verified reporting data before operational use.</CardDescription>
        </CardHeader>
        <CardContent className="h-80 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fundingMix}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={82}
                paddingAngle={4}
                stroke="#fff"
                strokeWidth={2}
              >
                {fundingMix.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="xl:col-span-3">
        <CardHeader className="gap-2">
          <CardTitle>Tier-wise contribution</CardTitle>
          <CardDescription>Illustrative tier shares, not audited or reported finance figures.</CardDescription>
        </CardHeader>
        <CardContent className="h-72 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tierMix} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 5" stroke="#eadcc5" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#78553b" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#78553b" }} />
              <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
              <Bar dataKey="value" radius={[10, 10, 4, 4]} fill="#ea580c" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
