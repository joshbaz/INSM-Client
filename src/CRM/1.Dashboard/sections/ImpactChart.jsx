import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { month: "Jan", impact: 45 },
  { month: "Feb", impact: 52 },
  { month: "Mar", impact: 48 },
  { month: "Apr", impact: 61 },
  { month: "May", impact: 55 },
  { month: "Jun", impact: 67 },
  { month: "Jul", impact: 72 },
];

const ImpactChart = () => {
  return (
    <div className="bg-brand-white p-6 rounded-2xl border border-brand-dark-200/10 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-primary font-bold text-brand-dark">Impact Velocity</h3>
          <p className="text-xs font-secondary text-brand-dark-400">Monthly beneficiary growth rate</p>
        </div>
        <select className="bg-brand-white border border-brand-dark-200/20 rounded-lg px-3 py-1.5 text-xs font-bold text-brand-dark-400 outline-none focus:border-brand-gold">
          <option>Last 6 Months</option>
          <option>Full Year</option>
        </select>
      </div>

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5DAD4" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#6b6c6d', fontWeight: 'bold' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#6b6c6d', fontWeight: 'bold' }} 
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: '#090a0c',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '8px 12px',
              }}
              itemStyle={{ color: '#D4AF37' }}
              formatter={(value) => [`${value}%`, 'Growth']}
            />
            <Bar dataKey="impact" radius={[6, 6, 0, 0]} barSize={32}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === data.length - 1 ? "#D4AF37" : "#001F3F"} 
                  className="transition-colors duration-300 hover:fill-brand-gold"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ImpactChart;
