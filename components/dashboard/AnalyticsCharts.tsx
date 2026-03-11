"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AnalyticsChartsProps {
  funnel: Array<{ step: string; value: number }>;
  utmBreakdown: Array<{ source: string; value: number }>;
}

const colors = ["#53B3FF", "#F5C842", "#8C6CFF", "#5AD3A7", "#FF8F6B"];

export function AnalyticsCharts({ funnel, utmBreakdown }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="glass-panel rounded-3xl p-4">
        <h2 className="text-lg">Tunnel de conversion</h2>
        <div className="mt-3 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={funnel}>
              <defs>
                <linearGradient id="funnelFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#53B3FF" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#53B3FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(240,238,248,0.12)" />
              <XAxis dataKey="step" stroke="rgba(240,238,248,0.75)" />
              <YAxis stroke="rgba(240,238,248,0.75)" />
              <Tooltip contentStyle={{ background: "#0d0b20", border: "1px solid rgba(240,238,248,.2)" }} />
              <Area type="monotone" dataKey="value" stroke="#53B3FF" fillOpacity={1} fill="url(#funnelFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-4">
        <h2 className="text-lg">Répartition des sources UTM</h2>
        <div className="mt-3 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={utmBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(240,238,248,0.12)" />
              <XAxis dataKey="source" stroke="rgba(240,238,248,0.75)" />
              <YAxis stroke="rgba(240,238,248,0.75)" />
              <Tooltip contentStyle={{ background: "#0d0b20", border: "1px solid rgba(240,238,248,.2)" }} />
              <Legend />
              <Bar dataKey="value" name="Part (%)">
                {utmBreakdown.map((entry, index) => (
                  <Cell key={entry.source} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
