import React from 'react';
// 引入 ECharts 图表库
import * as echarts from 'echarts';
// 引入 React Hooks
import { useEffect, useRef } from 'react';
// 引入布局组件
import Layout from '../layouts/Box';

// 农场光照变化趋势

export default function Farming() {
    // 创建图表容器的引用
    const chartRef = useRef(null);
    
    useEffect(() => {
        // 生成24小时的时间数组 [0,1,2,...,23]
        const hours = Array.from({length: 24}, (_, i) => i);
        // 模拟24小时的光照强度数据
        const lightData = [
            0, 0, 0, 0, 30, 50, 200, 450, 600, 800, 1000, // 0-10点
            1100, 1200, 1300, 1400, 1300, 1100, 700, 600, 200, 0, 0, 0, 0  // 11-23点
        ];

        // 初始化 ECharts 实例
        const chart = echarts.init(chartRef.current);
        // 配置图表选项
        const option = {
            // 设置图表的内边距
            grid: {
                top: 30,
                bottom: 20,    // 减小底部边距
                left: 30,      // 给Y轴标签留足空间
                right: 20,
                containLabel: true  // 确保刻度标签在容器内
            },
            // 提示框配置
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    const value = params[0].value;
                    const hour = params[0].axisValue;
                    let text = `${hour}时 <br/>光照强度: ${value} lux`;
                    
                    // 当光照强度达到最高值时添加额外提示
                    if (value === Math.max(...lightData)) {
                        text += '<br/><span style="color: #0ee2e2">此时光照达到顶点</span>';
                    }
                    return text;
                }
            },
            // X轴配置
            xAxis: {
                type: 'category',
                data: hours.map(h => h + ''), // 转换为字符串数组
                axisLine: {
                    lineStyle: {
                        color: '#0ee2e2' // 坐标轴颜色
                    }
                },
                axisLabel: {
                    color: '#0ee2e2' // 刻度标签颜色
                }
            },
            // Y轴配置
            yAxis: {
                type: 'value',
                name: '光照强度(lux)', // Y轴名称
                min: 0,
                max: 2000,
                interval: 200, // 设置刻度间隔为200
                nameTextStyle: {
                    color: '#0ee2e2' // Y轴名称颜色
                },
                axisLine: {
                    lineStyle: {
                        color: '#0ee2e2' // 坐标轴颜色
                    }
                },
                axisLabel: {
                    color: '#0ee2e2' // 刻度标签颜色
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(14, 226, 226, 0.1)' // 分割线颜色
                    }
                }
            },
            // 数据系列配置
            series: [{
                data: lightData, // 光照数据
                type: 'line', // 图表类型：线图
                smooth: true, // 启用平滑曲线
                symbol: 'none', // 不显示数据点标记
                lineStyle: {
                    color: '#0ee2e2', // 线条颜色
                    width: 2 // 线条宽度
                },
                // 区域填充样式
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(14, 226, 226, 0.3)' // 渐变起始颜色
                        },
                        {
                            offset: 1,
                            color: 'rgba(14, 226, 226, 0)' // 渐变结束颜色
                        }
                    ])
                }
            }]
        };

        // 应用配置项
        chart.setOption(option);

        // 处理窗口大小变化，实现响应式
        const handleResize = () => {
            chart.resize();
        };
        window.addEventListener('resize', handleResize);

        // 组件卸载时的清理函数
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.dispose(); // 销毁图表实例
        };
    }, []); // 空依赖数组，仅在组件挂载时执行一次

    return (
        // 使用布局组件包装图表
        <Layout title='农场光照趋势' style={{ marginTop: '30px', width: '50%'}}>
            {/* 图表容器 */}
            <div ref={chartRef} style={{ height: '300px', width: '100%' }}></div>
        </Layout>
    );
}