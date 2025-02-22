import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';  // 导入蚂蚁金服的图表库
import AnNumber from 'animated-number-react';  // 导入数字动画组件

import Layout from '../layouts/Box';
import { $icon } from '../utils';

//中间页面


const MyChart = () => {
    const ref = useRef(null);
    const data = [
        { time: '1 月', type: '蔬菜类', value: 12000 },
        { time: '1 月', type: '鱼类', value: 10000 },
        { time: '2 月', type: '蔬菜类', value: 7000 },
        { time: '2 月', type: '鱼类', value: 4000 },
        { time: '3 月', type: '蔬菜类', value: 5000 },
        { time: '3 月', type: '鱼类', value: 8000 },
        { time: '4 月', type: '蔬菜类', value: 8000 },
        { time: '4 月', type: '鱼类', value: 9000 },
        { time: '5 月', type: '蔬菜类', value: 7000 },
        { time: '5 月', type: '鱼类', value: 8000 },
        { time: '6 月', type: '蔬菜类', value: 14000 },
        { time: '6 月', type: '鱼类', value: 8000 },
        { time: '7 月', type: '鱼类', value: 23000 },
        { time: '7 月', type: '蔬菜类', value: 17000 },
        { time: '8 月', type: '鱼类', value: 6666 },
        { time: '8 月', type: '蔬菜类', value: 5633 },
        { time: '9 月', type: '鱼类', value: 7432 },
        { time: '9 月', type: '蔬菜类', value: 7433 },
        { time: '10 月', type: '鱼类', value: 5352 },
        { time: '10 月', type: '蔬菜类', value: 2345 },
        { time: '11 月', type: '鱼类', value: 5322 },
        { time: '11 月', type: '蔬菜类', value: 4324 },
        { time: '12 月', type: '鱼类', value: 8000 },
        { time: '12 月', type: '蔬菜类', value: 12000 },
    ];

    useEffect(() => {
        if (!ref) return;

        // 创建图表实例
        const chart = new Chart({
            container: ref.current,
            autoFit: true,      // 自适应容器大小
            height: 260,        // 设置图表高度
        });

        // 载入数据
        chart.data(data);

        // 配置数值轴的别名
        chart.scale('value', { alias: '金额（千元）' });

        // 配置时间轴，移除刻度线
        chart.axis('time', { tickLine: null });

        // 配置数值轴的格式化和样式
        chart.axis('value', {
            label: {
                // 格式化数值显示，添加千位分隔符
                formatter: text => text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'),
            },
            title: {
                offset: 80,
                style: { fill: '#aaa' },
            },
        });

        // 设置图例位置在顶部
        chart.legend({ position: 'top' });
        
        // 配置提示框
        chart.tooltip({
            showCrosshairs: true,    // 显示十字准线
            shared: true,            // 同时显示多个数据的提示
            // 自定义提示内容格式
            formatter: (datum) => {
                return {
                    name: datum.type,     // 显示数据类型（蔬菜类/鱼类）
                    value: datum.value.toLocaleString() + ' 千元'  // 格式化数值并添加单位
                };
            },
            // 自定义提示框样式
            domStyles: {
                'g2-tooltip': {
                    background: 'rgba(0,0,0,0.8)',  // 半透明黑色背景
                    color: '#fff',                  // 白色文字
                    padding: '8px',
                    borderRadius: '4px',            // 圆角边框
                },
                'g2-tooltip-title': {
                    color: '#fff',
                    marginBottom: '8px',
                },
                'g2-tooltip-list-item': {
                    color: '#fff',
                    marginBottom: '4px',
                },
            }
        });

        // 启用鼠标悬停交互
        chart.interaction('active-region');

        // 配置柱状图
        chart
            .interval()
            .adjust('stack')           // 堆叠柱状图
            .position('time*value')    // X轴为时间，Y轴为数值
            .color('type', ['#0fc7abcc', '#ff0000dd']);  // 根据类型设置颜色

        // 渲染图表
        chart.render();
    }, [data]);

    return (
        <div ref={ref} />
    );
}

export default function Profittrend() {
    const data = {
        head: [
            { icon: $icon('shucai'), title: '蔬菜类', num: 0.37 },
            { icon: $icon('fishda'), title: '鱼类', num: 0.63 },
        ],
        // 蔬菜
        veget: [
            { title: '菜心', yo: 0.015, mo: 0.012 },
            { title: '空心菜', yo: 0.072, mo: -0.008 },
            { title: '西兰花', yo: -0.022, mo: -0.024 },
            { title: '芹菜', yo: 0.009, mo: -0.006 },
            { title: '韭菜', yo: 0.032, mo: 0.019 },
            { title: '白菜', yo: 0.009, mo: -0.006 },
            { title: '空心菜', yo: 0.032, mo: 0.019 },
            { title: '娃娃菜', yo: 0.009, mo: -0.006 },
            { title: '生菜', yo: 0.032, mo: 0.019 },
            { title: '波菜', yo: 0.032, mo: 0.019 },
            { title: '韭菜', yo: 0.032, mo: 0.019 },
            { title: '白菜', yo: 0.009, mo: -0.006 },
            { title: '空心菜', yo: 0.032, mo: 0.019 },
            { title: '娃娃菜', yo: 0.009, mo: -0.006 },
            { title: '生菜', yo: 0.032, mo: 0.019 },
            { title: '波菜', yo: 0.032, mo: 0.019 },
        ],
        // 鱼类
        meat: [
            { title: '石斑鱼', yo: 0.045, mo: -0.009 },
            { title: '鲈鱼', yo: 0.037, mo: -0.012 },
            { title: '东星斑', yo: 0.012, mo: 0.004 },
            { title: '金枪鱼', yo: -0.011, mo: -0.016 },
            { title: '鲫鱼', yo: -0.018, mo: 0.008 },
        ],
        devote: [
            { title: '猪肉', num: 0.6212 },
            { title: '牛肉', num: 0.2253 },
            { title: '韭菜', num: 0.0848 },
            { title: '鸡肉', num: 0.0691 },
            { title: '菜籽', num: 0.0211 },
        ],
    };

    const rootStyle = {
        margin: '0 auto',
        maxWidth: 1300,
        marginTop: '-90px'
    };

    return (
        <Layout title='盈利趋势' style={rootStyle}>
            <div className='profittrend'>
                <div className='header'>
                    <div className='header-left'>
                        <div className='header-icon'>
                            <img src={data.head[0].icon} alt='' />
                        </div>
                        <div>{data.head[0].title}</div>
                    </div>
                    <div className='header-pre'>
                        <div className='header-pre-line'>
                            <div style={{ width: data.head[0].num * 100 + '%' }}>
                                <AnNumber
                                    value={data.head[0].num * 100}
                                    formatValue={val => val.toFixed(0) + '%'}
                                    duration={1250}
                                />
                            </div>
                            <div style={{ width: data.head[1].num * 100 + '%' }}>
                                <AnNumber
                                    value={data.head[1].num * 100}
                                    formatValue={val => val.toFixed(0) + '%'}
                                    duration={1250}
                                />
                            </div>
                        </div>
                        <p>{data.head[0].title}/{data.head[1].title}盈利比例</p>
                    </div>
                    <div className='header-right'>
                        <div className='header-icon'>
                            <img src={data.head[1].icon} alt='' />
                        </div>
                        <div>{data.head[1].title}</div>
                    </div>
                </div>
                <div className='chart'>
                    <MyChart />
                </div>
                {/* 蔬菜当月增速同比/环比 */}
                <div className='dataview'>
                    <div className='table'>
                        <h3 className='table-title'>蔬菜当月增速同比/环比</h3>
                        {/* 设置滚轮 */}
                        <div className='table-panel' style={{ 
                            maxHeight: '200px',  // 设置最大高度
                            overflowY: 'auto',   // 添加垂直滚动条
                            overflowX: 'hidden'  // 隐藏水平滚动条
                        }}>
                            <div className='table-row'>
                                <span>名称</span>
                                <span>同比增速</span>
                                <span>环比增速</span>
                            </div>
                            {data.veget.map((item, index) => (
                                <div className='table-row' key={index}>
                                    <span>{item.title}</span>
                                    <div>
                                        <span>{item.yo * 10000 / 100}%</span>
                                        <img src={$icon(item.yo > 0 ? 'triangle-up' : 'triangle-down')} />
                                    </div>
                                    <div>
                                        <span>{item.mo * 10000 / 100}%</span>
                                        <img src={$icon(item.mo > 0 ? 'triangle-up' : 'triangle-down')} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* 鱼类当月增速同比/环比 */}
                    <div className='devote'>                        
                        <h3 className='devote-title'>鱼类当月增速同比/环比</h3>
                      <div className='table-panel' style={{ 
                            maxHeight: '200px',  // 设置最大高度
                            overflowY: 'auto',   // 添加垂直滚动条
                            overflowX: 'hidden'  // 隐藏水平滚动条
                        }}>
                            
                            <div className='table-row'>
                                <span>名称</span>
                                <span>同比增速</span>
                                <span>环比增速</span>
                            </div>
                            {data.veget.map((item, index) => (
                                <div className='table-row' key={index}>
                                    <span>{item.title}</span>
                                    <div>
                                        <span>{item.yo * 10000 / 100}%</span>
                                        <img src={$icon(item.yo > 0 ? 'triangle-up' : 'triangle-down')} />
                                    </div>
                                    <div>
                                        <span>{item.mo * 10000 / 100}%</span>
                                        <img src={$icon(item.mo > 0 ? 'triangle-up' : 'triangle-down')} />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}