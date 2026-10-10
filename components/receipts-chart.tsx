"use client";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DEMO_RECEIPTS } from "@/lib/data";
export function ReceiptsChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={DEMO_RECEIPTS}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Legend />
          <Bar dataKey="SFC" stackId="a" fill="#0f766e" /><Bar dataKey="CFC" stackId="a" fill="#14b8a6" /><Bar dataKey="State grants" stackId="a" fill="#5eead4" /><Bar dataKey="Own sources" stackId="a" fill="#1e293b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
