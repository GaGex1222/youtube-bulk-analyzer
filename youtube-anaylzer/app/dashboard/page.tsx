'use client'
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { Video, Activity } from "lucide-react";

const sampleStats = {
  totalVideos: 45,
  totalSummarized: 37,
};

const weeklySummariesData = [
  { day: '21/05', summaries: 8 },
  { day: 'Tue', summaries: 6 },
  { day: 'Wed', summaries: 5 },
  { day: 'Thu', summaries: 7 },
  { day: 'Fri', summaries: 9 },
  { day: 'Sat', summaries: 3 },
  { day: 'Sun', summaries: 4 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-100 text-red-900 px-6 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-12">
        <StatCard icon={<Activity />} label="Summarized" value={sampleStats.totalSummarized} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <ChartCard title="Weekly Summaries">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklySummariesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="summaries" stroke="#dc2626" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="bg-white shadow-lg p-6 rounded-xl flex items-center gap-4">
    <div className="text-red-600">{icon}</div>
    <div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-sm text-red-800">{label}</div>
    </div>
  </div>
);

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white shadow-lg p-6 rounded-xl">
    <h2 className="text-xl font-semibold mb-4 text-red-800">{title}</h2>
    {children}
  </div>
);

export default Dashboard;
