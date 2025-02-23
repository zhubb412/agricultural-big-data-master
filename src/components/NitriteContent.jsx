import React from 'react';
import { Line } from '@ant-design/plots';

const NitriteContent = () => {
  // 模拟亚硝酸盐含量数据
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: i.toString(),
    value: Math.random() * (0.5 - 0.1) + 0.1, // 生成0.1到0.5之间的随机值
  }));

  const config = {
    data,
    padding: 'auto',
    xField: 'time',
    yField: 'value',
    xAxis: {
      title: {
        text: '时间（小时）',
      },
    },
    yAxis: {
      title: {
        text: '亚硝酸盐含量（mg/L）',
      },
      min: 0,
      max: 0.6,
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
    color: '#00ff9d',
    tooltip: {
      formatter: (datum) => {
        return { name: '亚硝酸盐含量', value: datum.value.toFixed(3) + ' mg/L' };
      },
    },
  };

  return (
    <div style={{ 
      background: '#1E1E1E', 
      padding: '20px',
      borderRadius: '8px',
      color: '#fff'
    }}>
      <h3 style={{ 
        color: '#00ff9d',
        marginBottom: '20px',
        fontSize: '16px'
      }}>亚硝酸盐含量(mg/L)</h3>
      <Line {...config} />
    </div>
  );
};

export default NitriteContent; 