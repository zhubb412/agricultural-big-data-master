import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Layout from '../layouts/Box';
import '../styles/containers/soilMoisture.scss';

// 农场土壤湿度变化趋势

export default function SoilMoisture() {
    // 创建图表DOM引用
    const chartRef = useRef(null);
    
    useEffect(() => {
        // 生成24小时的时间数组（0-23小时）
        const hours = Array.from({length: 24}, (_, i) => i);
        
        // 模拟24小时的土壤湿度数据
        const moistureData = [
            60, 58, 55, 52, 50, 48, 45, 42, 40, 45, 50, // 0-10点
            55, 60, 65, 70, 75, 80, 85, 82, 78, 75, 70, 65, 62  // 11-23点
        ];

        // 初始化 ECharts 实例
        const chart = echarts.init(chartRef.current);
        
        // 配置图表选项
        const option = {
            // 设置图表的网格布局
            grid: {
                top: 30,
                bottom: 20,
                left: 30,
                right: 20,
                containLabel: true
            },
            // 配置提示框组件
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    const value = params[0].value;
                    const hour = params[0].axisValue;
                    let text = `${hour}时 <br/>土壤湿度: ${value}%`;
                    
                    // 根据湿度范围添加不同的提示信息
                    if (value >= 80) {
                        text += '<br/><span style="color: #ff4d4f">土壤过湿</span>';
                    } else if (value <= 40) {
                        text += '<br/><span style="color: #ff4d4f">土壤过干</span>';
                    } else {
                        text += '<br/><span style="color: #0ee2e2">湿度适宜</span>';
                    }
                    
                    return text;
                }
            },
            // 配置X轴
            xAxis: {
                type: 'category',
                data: hours.map(h => h + ''),
                axisLine: {
                    lineStyle: {
                        color: '#0ee2e2'
                    }
                },
                axisLabel: {
                    color: '#0ee2e2'
                }
            },
            // 配置Y轴
            yAxis: {
                type: 'value',
                name: '土壤湿度(%)',
                min: 0,
                max: 100,
                interval: 10,
                nameTextStyle: {
                    color: '#0ee2e2'
                },
                axisLine: {
                    lineStyle: {
                        color: '#0ee2e2'
                    }
                },
                axisLabel: {
                    color: '#0ee2e2'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(14, 226, 226, 0.1)'
                    }
                }
            },
            // 配置数据系列
            series: [{
                data: moistureData,
                type: 'line',
                smooth: true,  // 启用平滑曲线
                symbol: 'none', // 不显示数据点标记
                lineStyle: {
                    width: 2
                },
                // 配置区域填充样式
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(14, 226, 226, 0.3)'  // 渐变起始颜色
                        },
                        {
                            offset: 1,
                            color: 'rgba(14, 226, 226, 0)'    // 渐变结束颜色
                        }
                    ])
                }
            }]
        };

        // 应用配置项到图表
        chart.setOption(option);

        // 处理窗口大小变化，保持图表响应式
        const handleResize = () => {
            chart.resize();
        };
        window.addEventListener('resize', handleResize);

        // 组件卸载时的清理函数
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.dispose();  // 销毁图表实例
        };
    }, []);  // 空依赖数组表示仅在组件挂载时执行一次

    // 渲染组件
    return (
        <Layout title='农场土壤湿度变化趋势' style={{width:'47%',marginTop: '-400px'}}>
            <div ref={chartRef} className='soil-moisture-chart'></div>
        </Layout>
    );
} 