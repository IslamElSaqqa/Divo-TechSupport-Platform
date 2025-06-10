import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Graphs.module.css';

const defaultData = {
  servicesDone: {
    short: 251000,
    long: 176000
  },
  conversions: [
    { day: 'S', value1: 40, value2: 30 },
    { day: 'M', value1: 50, value2: 45 },
    { day: 'T', value1: 35, value2: 40 },
    { day: 'W', value1: 45, value2: 35 },
    { day: 'T', value1: 40, value2: 50 },
    { day: 'F', value1: 55, value2: 45 },
    { day: 'S', value1: 30, value2: 35 },
    { day: 'M', value1: 45, value2: 40 },
    { day: 'T', value1: 40, value2: 35 },
    { day: 'W', value1: 35, value2: 30 }
  ]
};

const pieData = [
  { name: 'Short', value: 251000, color: '#3a57e8' },
  { name: 'Long', value: 176000, color: '#85f4fa' }
];

const Graphs = ({ data = defaultData }) => {
  return (
    <div className={styles.container}>
      <div className={styles.servicesDone}>
        <div className={styles.header}>
          <span className={styles.title}>Services Done</span>
          <div className={styles.dropdown}>
            <span>This Week</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z9NwpippvFKitUFI/iconly-l.png" alt="dropdown" />
          </div>
        </div>
        <div className={styles.serviceContent}>
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
          <div className={styles.legend}>
            {pieData.map((entry, index) => (
              <div key={index} className={styles.legendItem}>
                <div className={styles.dot} style={{ background: entry.color }}></div>
                <div className={styles.legendText}>
                  <span>{entry.name}</span>
                  <span className={styles.value}>{entry.value.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.conversions}>
        <div className={styles.header}>
          <span className={styles.title}>Conversions</span>
          <div className={styles.dropdown}>
            <span>This Week</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z9NwpippvFKitUFI/iconly-l-2.png" alt="dropdown" />
          </div>
        </div>
        <div className={styles.chartArea}>
          <div className={styles.yAxis}>
            <span>160</span>
            <span>120</span>
            <span>80</span>
            <span>40</span>
            <span>0</span>
          </div>
          <div className={styles.barChart}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z9NwpippvFKitUFI/group-40.png" alt="bar chart" />
          </div>
          <div className={styles.xAxis}>
            {defaultData.conversions.map((item, index) => (
              <span key={index}>{item.day}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
