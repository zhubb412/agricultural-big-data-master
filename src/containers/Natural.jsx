import React from 'react';

import Layout from '../layouts/Box';
import { $icon } from '../utils';

// 农场条件页面

const Box = ({ icon, list = [] }) => (
    <div className='box'>
        <div className='box-icon'>
            <img src={icon} alt='' />
            {[...new Array(4)].map((v, i) => <span key={i} className='dot' />)}
        </div>
        <div className='box-right'>
            {list.map((item, index) => (
                <div key={index} className='box-item'>
                    <h4>{item.title}</h4>
                    <h2>{item.val}</h2>
                </div>
            ))}
        </div>
    </div>
);

export default function Natural() {
    const data = [
        [
            
            { icon: $icon('wendu'), list: [{ title: '平均温度(℃)', val: '384.5mm' }] },
            { icon: $icon('shidu'), list: [{ title: '平均湿度(%)', val: '3.4m/s' }] },
        ],
        [
            { icon: $icon('qiya'), list: [{ title: '平均气压(kpa)', val: '3.4m/s' }] },
            { icon: $icon('guangzhao'), list: [{ title: '平均光照(lux)', val: '3.4m/s' }] },
           
        ] ,
        [
            { icon: $icon('turanshidu'), list: [{ title: '平均土壤湿度(%)', val: '3.4m/s' }] },
          
            { icon: $icon('kqzhiliang'), list: [{ title: '平均空气质量(m)', val: '13.7°C' }] },
        ] 
    ];

    return (
        <Layout title='农场条件' minTitle='Natural conditions'>
            <div className='natural'>
                {data.map((item, index) => (
                    <div className='natural-list' key={index}>
                        {Array.isArray(item) ?
                            <div className='natural-row'>
                                {item.map((v, idx) => <Box key={idx} {...v} />)}
                            </div> :
                            <div className='natural-row'>
                                <Box {...item} />
                            </div>
                        }
                    </div>
                ))}
            </div>
        </Layout>
    );
}