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
  { name: "SFC grants", value: 38, color: "#0ea5e9" },
  { name: "CFC grants", value: 22, color: "#14b8a6" },
  { name: "State grants", value: 21, color: "#a78bfa" },
  { name: "Own sources", value: 19, color: "#f59e0b" },
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
          <CardDescription>Rural and urban local-body receipts across the last five financial years</CardDescription>
        </CardHeader>
        <CardContent className="h-80 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="ruralFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="urbanFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
              <Tooltip
                contentStyle={{ borderRadius: 16, border: "1px solid #dbeafe", boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)" }}
              />
              <Legend />
              <Area type="monotone" dataKey="rural" stroke="#0ea5e9" strokeWidth={3} fill="url(#ruralFill)" name="Rural" />
              <Area type="monotone" dataKey="urban" stroke="#14b8a6" strokeWidth={3} fill="url(#urbanFill)" name="Urban" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="gap-2">
          <CardTitle>Funding mix</CardTitle>
          <CardDescription>Share of total receipts by grant and self-generated sources</CardDescription>
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
          <CardDescription>Estimated share of total public finance activity across the rural-urban system</CardDescription>
        </CardHeader>
        <CardContent className="h-72 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tierMix} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
              <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
