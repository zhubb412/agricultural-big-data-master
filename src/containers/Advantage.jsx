// 右下角卡片 （渔场数据）
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import AnNumber from 'animated-number-react';

import Layout from '../layouts/Box';

const MarkTitle = ({ title }) => (
    <div className='mark-title'>
        <span className='dot' />{title}
    </div>
);

export default function Economic() {
    const data = {
        industryOne: [
            { title: 1, yo: '09:08:14', mo: 100 },
            { title: 2, yo: '10:26:56', mo: 100 },
            { title: 3, yo: '11:15:38', mo: 100 },
        ],
        industryTwo: [
            { title: 1, yo: '09:08:14', mo: 60 },
            { title: 2, yo: '10:26:56', mo: 50 },
            { title: 3, yo: '11:15:38', mo: 40 },
        ],
        industryThree: [
            { title: 1, yo: '09:08:14', mo: 1363.2 },
            { title: 2, yo: '10:26:56', mo: 1329.6 },
            { title: 3, yo: '11:15:38', mo: 1229.8 },
        ],
    };

    return (
        <Layout title='渔场概况' minTitle='Economic data' style={{ marginTop: '-6px' }}>
            <div className='economic'>
                {/* 水温排名 */}    
                <div style={{ height: 2 }}></div>
                <MarkTitle title='渔场水温排名前三位' />
                <div className='soil-data-table' style={{ border: '1px solid #23543b', padding: '0 20px' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', width: '25%' }}>排名</th>
                                <th style={{ textAlign: 'center', width: '45%' }}>时间</th>
                                <th style={{ textAlign: 'center', width: '30%' }}>水温(℃)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 水温取值 */}
                            {data.industryOne.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ textAlign: 'center' }}>{item.title}</td>
                                    <td style={{ textAlign: 'center' }}>{item.yo}</td>
                                    <td style={{ textAlign: 'center' }}>{item.mo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* PH值排名 */}
                <div style={{ height: -10 }}></div>
                <MarkTitle title='渔场PH值排名前三位' />
                <div className='soil-data-table' style={{ border: '1px solid #23543b', padding: '0 20px' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', width: '25%' }}>排名</th>
                                <th style={{ textAlign: 'center', width: '45%' }}>时间</th>
                                <th style={{ textAlign: 'center', width: '30%' }}>PH值</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* PH值取值 */}
                            {data.industryTwo.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ textAlign: 'center' }}>{item.title}</td>
                                    <td style={{ textAlign: 'center' }}>{item.yo}</td>
                                    <td style={{ textAlign: 'center' }}>{item.mo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* 含氧量排名 */}
                <div style={{ height: -10 }}></div>
                <MarkTitle title='渔场含氧量排名前三位' />
                <div className='soil-data-table' style={{ border: '1px solid #23543b', padding: '0 20px' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', width: '25%' }}>排名</th>
                                <th style={{ textAlign: 'center', width: '45%' }}>时间</th>
                                <th style={{ textAlign: 'center', width: '30%' }}>含氧量(mg/L)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 含氧量取值 */}
                            {data.industryThree.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ textAlign: 'center' }}>{item.title}</td>
                                    <td style={{ textAlign: 'center' }}>{item.yo}</td>
                                    <td style={{ textAlign: 'center' }}>{item.mo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
