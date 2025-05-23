import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import styles from './Statistics_DataTable.module.css';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTooltip, Legend);

const defaultStats = {
  repairs: '750K',
  cancels: '7,500',
  totalEarned: '7,500',
  distributions: '7,500'
};

const defaultTechData = [
  {
    id: 'T1AM3',
    name: 'Ahmed Mostafa Shawky',
    requests: '312',
    revenue: '$3,120'
  },
  {
    id: 'T1AM3',
    name: 'Ahmed Mostafa Shawky',
    requests: '312',
    revenue: '$3,120'
  },
  {
    id: 'T1AM3',
    name: 'Ahmed Mostafa Shawky',
    requests: '312',
    revenue: '$3,120'
  }
];

const defaultGraphData = {
  days: ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'M', 'T', 'W'],
  values: [40, 60, 80, 120, 90, 140, 50, 70, 60, 40]
};

const pieData = [
  { name: 'Short', value: 251000, color: '#3a57e8' },
  { name: 'Long', value: 176000, color: '#85f4fa' }
];

const Statistics_DataTable = ({ 
  stats = defaultStats,
  techData = defaultTechData,
  graphData = defaultGraphData 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');

  const barData = {
    labels: graphData.days,
    datasets: [
      {
        label: 'Conversions',
        data: graphData.values,
        backgroundColor: '#3a57e8',
      }
    ]
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 160,
        ticks: {
          stepSize: 40
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className={styles.container}>
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <div className={styles.statValue}>{stats.repairs}</div>
          <div className={styles.statLabel}>Repairs</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statBox}>
          <div className={styles.statValue}>{stats.cancels}</div>
          <div className={styles.statLabel}>Cancels</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statBox}>
          <div className={styles.statValue}>{stats.totalEarned}</div>
          <div className={styles.statLabel}>Total Earned</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statBox}>
          <div className={styles.statValue}>{stats.distributions}</div>
          <div className={styles.statLabel}>Distributions</div>
        </div>
      </div>

      <div className={styles.chartsContainer}>
        <div className={styles.servicesChart}>
          <div className={styles.chartHeader}>
            <h3>Services Done</h3>
            <div className={styles.periodSelector}>
              <span>{selectedPeriod}</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z9NwpippvFKitUFI/iconly-l.png" alt="dropdown" />
            </div>
          </div>
          <div className={styles.donutChart}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.metrics}>
              {pieData.map((entry, index) => (
                <div key={index} className={styles.metric}>
                  <div className={styles.dot} style={{ background: entry.color }}></div>
                  <div>
                    <div className={styles.metricValue}>{entry.value.toLocaleString()}</div>
                    <div className={styles.metricLabel}>{entry.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.conversionsChart}>
          <div className={styles.chartHeader}>
            <h3>Conversions</h3>
            <div className={styles.periodSelector}>
              <span>{selectedPeriod}</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z9NwpippvFKitUFI/iconly-l-2.png" alt="dropdown" />
            </div>
          </div>
          <div className={styles.barChart}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Technician ID</div>
          <div className={styles.headerCell}>Technician name</div>
          <div className={styles.headerCell}>Requests handled</div>
          <div className={styles.headerCell}>Revenue for the month</div>
        </div>
        <div className={styles.tableBody}>
          {techData.map((tech, index) => (
            <div key={index} className={styles.tableRow}>
              <div className={styles.cell}>{tech.id}</div>
              <div className={styles.cell}>{tech.name}</div>
              <div className={styles.cell}>{tech.requests}</div>
              <div className={styles.cell}>{tech.revenue}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics_DataTable;
