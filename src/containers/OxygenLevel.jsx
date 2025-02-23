import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Layout from '../layouts/Box';

export default function OxygenLevel() {
    // 创建图表DOM引用
    const chartRef = useRef(null);
    
    useEffect(() => {
        // 生成24小时的时间数组（0-23小时）
        const hours = Array.from({length: 24}, (_, i) => i);
        
        // 模拟24小时的含氧量数据 (正常水产养殖含氧量在5-8mg/L之间)
        const oxygenData = [
            6.5, 6.3, 6.0, 5.8, 5.5, 5.3, 5.0, 5.2, 5.5, 6.0, 6.5, // 0-10点
            7.0, 7.5, 8.0, 8.2, 8.0, 7.8, 7.5, 7.2, 7.0, 6.8, 6.5, 6.3, 6.0  // 11-23点
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
                    let text = `${hour}时 <br/>`;
                    
                    // 为极端含氧量添加警告样式
                    const oxygenValueStyle = value >= 8.0 || value < 5.0 ? 'color: #ff0000;' : '';
                    text += `<span style="${oxygenValueStyle}">含氧量: ${value}mg/L</span>`;
                    
                    // 根据含氧量范围添加不同的提示信息
                    if (value >= 5.0 && value <= 8.0) {
                        text += '<br/><span style="color: #0ee2e2">含氧量适宜</span>';
                    } else if (value > 8.0) {
                        text += '<br/><span style="color: #ff0000">含氧量过高!!!</span>';
                    } else if (value < 5.0) {
                        text += '<br/><span style="color: #ff0000">含氧量过低!!!</span>';
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
                        color: '#0ee2e2'  // 设置坐标轴颜色
                    }
                },
                axisLabel: {
                    color: '#0ee2e2'  // 设置刻度标签颜色
                }
            },
            // 配置Y轴
            yAxis: {
                type: 'value',
                name: '含氧量(mg/L)',
                min: 3.0,
                max: 12.0,
                interval: 0.5,
                nameTextStyle: {
                    color: '#0ee2e2'  // 设置坐标轴名称颜色
                },
                axisLine: {
                    lineStyle: {
                        color: '#0ee2e2'  // 设置坐标轴颜色
                    }
                },
                axisLabel: {
                    color: '#0ee2e2'  // 设置刻度标签颜色
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(14, 226, 226, 0.1)'  // 设置分割线颜色
                    }
                }
            },
            // 配置视觉映射组件
            visualMap: {
                show: false,
                pieces: [
                    {
                        gt: 8.0,  // 含氧量大于8.0时显示红色
                        color: '#ff0000'
                    },
                    {
                        lte: 5.0,  // 含氧量小于等于5.0时显示红色
                        color: '#ff0000'
                    },
                    {
                        gt: 5.0,   // 含氧量在5.0-8.0之间显示青色
                        lte: 8.0,
                        color: '#0ee2e2'
                    }
                ]
            },
            // 配置数据系列
            series: [{
                data: oxygenData,
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
        <Layout title='渔场含氧量变化趋势' style={{ width: '48%', marginTop: '-20px', marginLeft: '50.5%' }}>
            <div ref={chartRef} style={{ height: '300px', width: '102%', marginLeft: '-3%' }}></div>
        </Layout>
    );
} 