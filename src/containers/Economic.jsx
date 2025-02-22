// 左下角卡片 （农场数据）
import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import AnNumber from 'animated-number-react';

import Layout from '../layouts/Box';
import '../styles/containers/economic.scss';

const MarkTitle = ({ title }) => (
    <div className='mark-title'>
        <span className='dot' />{title}
    </div>
);

const AnimatedValue = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formatValue = (val) => Number(val).toFixed(1);

  return (
    <AnNumber
      value={displayValue}
      duration={1000}
      formatValue={formatValue}
    />
  );
};

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

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <Layout title='基地概况' minTitle='Economic data' style={{ marginTop: '-6px' }}>
            <div className='economic'>
                {/* 土壤湿度排名 */}    
                <div style={{ height: 2 }}></div>
                <MarkTitle title='农场土壤湿度排名前三位' />
                <div className='soil-data-table' style={{ 
                    border: '1px solid #23543b', 
                    padding: '0 20px',
                    animationDelay: '0.2s'
                }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', paddingRight: '30px' }}>排名</th>
                                <th style={{ textAlign: 'center', paddingRight: '30px' }}>时间</th>
                                <th style={{ textAlign: 'center' }}>土壤湿度(%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.industryOne.map((item, index) => (
                                <tr key={index} style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                                    <td style={{ textAlign: 'center', paddingRight: '30px' }}>{item.title}</td>
                                    <td style={{ textAlign: 'center', paddingRight: '30px' }}>{item.yo}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <AnimatedValue value={item.mo} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* 空气湿度排名 */}
                <div style={{ height: -10 }}></div>
                <MarkTitle title='农场空气湿度排名前三位' />
                <div className='soil-data-table' style={{ 
                    border: '1px solid #23543b', 
                    padding: '0 20px',
                    animationDelay: '0.4s'
                }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', paddingRight: '30px' }}>排名</th>
                                <th style={{ textAlign: 'center', paddingRight: '30px' }}>时间</th>
                                <th style={{ textAlign: 'center' }}>空气湿度(%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.industryTwo.map((item, index) => (
                                <tr key={index} style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                                    <td style={{ textAlign: 'center', paddingRight: '30px' }}>{item.title}</td>
                                    <td style={{ textAlign: 'center', paddingRight: '30px' }}>{item.yo}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <AnimatedValue value={item.mo} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ height: -10 }}></div>
                <MarkTitle title='农场光照强度排名前三位' />
                <div className='soil-data-table' style={{ 
                    border: '1px solid #23543b', 
                    padding: '0 20px',
                    animationDelay: '0.6s'
                }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', paddingRight: '30px' }}>排名</th>
                                <th style={{ textAlign: 'center', paddingRight: '30px' }}>时间</th>
                                <th style={{ textAlign: 'center' }}>光照强度(lux)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.industryThree.map((item, index) => (
                                <tr key={index} style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                                    <td style={{ textAlign: 'center', paddingRight: '30px' }}>{item.title}</td>
                                    <td style={{ textAlign: 'center', paddingRight: '30px' }}>{item.yo}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <AnimatedValue value={item.mo} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
