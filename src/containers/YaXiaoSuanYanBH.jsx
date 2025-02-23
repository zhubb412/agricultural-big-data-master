/**
 * 亚硝酸盐含量变化监测组件
 * 用于展示24小时内水产养殖池塘亚硝酸盐含量的变化趋势
 * 包含异常值警告和适宜值提示功能
 */

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Layout from '../layouts/Box';

export default function YaXiaoSuanYanBH() {
    // 创建图表DOM引用
    const chartRef = useRef(null);
    
    useEffect(() => {
        // 生成24小时的时间数组（0-23小时）
        const hours = Array.from({length: 24}, (_, i) => i);
        
        // 模拟24小时的亚硝酸盐含量数据 (正常水产养殖亚硝酸盐含量在0.3-1.0mg/L之间)
        // 包含了一些异常值用于测试告警功能
        const nitriteData = [
            0.5, 0.6, 0.7, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.4, 0.5, // 0-10点
            1.2, 1.5, 1.3, 1.1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.5  // 11-23点
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
                    
                    // 为极端亚硝酸盐含量添加红色警告样式
                    const nitriteStyle = value > 1.0 ? 'color: #ff0000;' : '';
                    text += `<span style="${nitriteStyle}">亚硝酸盐含量: ${value}mg/L</span>`;
                    
                    // 根据亚硝酸盐含量范围添加不同的提示信息
                    if (value >= 0.3 && value <= 1.0) {
                        text += '<br/><span style="color: #0ee2e2">此时亚硝酸盐含量适宜</span>';
                    } else if (value > 1.0) {
                        text += '<br/><span style="color: #ff0000">亚硝酸盐含量过高，需要处理!</span>';
                    } else if (value < 0.3) {
                        text += '<br/><span style="color: #ff9900">亚硝酸盐含量偏低</span>';
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
                name: '亚硝酸盐(mg/L)',
                min: 0,
                max: 2.0,
                interval: 0.2,
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
            // 配置视觉映射组件，用于不同区间的颜色显示
            visualMap: {
                show: false,
                pieces: [
                    {
                        gt: 1.0,  // 亚硝酸盐含量大于1.0时显示红色
                        color: '#ff0000'
                    },
                    {
                        lte: 0.3,  // 亚硝酸盐含量小于等于0.3时显示橙色
                        color: '#ff9900'
                    },
                    {
                        gt: 0.3,   // 亚硝酸盐含量在0.3-1.0之间显示青色
                        lte: 1.0,
                        color: '#0ee2e2'
                    }
                ]
            },
            // 配置数据系列
            series: [{
                data: nitriteData,
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
        <Layout title='渔场亚硝酸盐含量变化趋势' style={{ width: '48%', marginTop: '-1050px', marginLeft: '50.5%' }}>
            <div ref={chartRef} style={{ height: '300px', width: '102%' ,marginLeft: '-3%'}}></div>
        </Layout>
    );
} 