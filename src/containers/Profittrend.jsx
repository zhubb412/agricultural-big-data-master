import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Layout from '../layouts/Box';

// 农场温度变化趋势

export default function Profittrend() {
    // 创建图表DOM引用
    const chartRef = useRef(null);
    
    useEffect(() => {
        // 生成24小时的时间数组（0-23小时）
        const hours = Array.from({length: 24}, (_, i) => i);
        
        // 模拟24小时的温度数据
        const tempData = [
            13, 30, 11, 10, 11, 12, 14, 27, 18, 20, 22, // 0-10点
            24, 26, 28, 30, 29, 27, 25, 23, 21, 19, 17, 15, 14  // 11-23点
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
                    let text = `${hour}时 <br/>温度: ${value}°C`;
                    
                    // 根据温度范围添加不同的提示信息
                    if (value >= 25) {
                        text += '<br/><span style="color: #ff4d4f">温度偏高</span>';
                    } else if (value <= 15) {
                        text += '<br/><span style="color: #69c0ff">温度偏低</span>';
                    } else {
                        text += '<br/><span style="color: #0ee2e2">温度适宜</span>';
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
                name: '温度(°C)',
                min: 0,
                max: 35,
                interval: 5,
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
                        gt: 25,  // 温度大于25度显示红色
                        color: '#ff4d4f'
                    },
                    {
                        lte: 15,  // 温度小于等于15度显示蓝色
                        color: '#69c0ff'
                    },
                    {
                        gt: 15,   // 温度在15-25度之间显示青色
                        lte: 25,
                        color: '#0ee2e2'
                    }
                ]
            },
            // 配置数据系列
            series: [{
                data: tempData,
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
        <Layout title='农场温度变化趋势' style={{ width: '48%', marginTop: '-120px',marginLeft:'-1%' }}>
            <div ref={chartRef} style={{ height: '300px', width: '100%' }}></div>
        </Layout>
    );
}
