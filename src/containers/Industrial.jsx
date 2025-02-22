import React from 'react';

import Layout from '../layouts/Box';
import { $icon } from '../utils';

// 渔场条件页面

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
            
            { icon: $icon('shuizhi'), list: [{ title: '平均水质', val: '384.5mm' }] },
            { icon: $icon('shuiwen'), list: [{ title: '平均水温', val: '3.4m/s' }] },
        ],
        [
            { icon: $icon('PHzhi'), list: [{ title: '平均PH值', val: '3.4m/s' }] },
            { icon: $icon('hanyangliang'), list: [{ title: '含氧量', val: '3.4m/s' }] },
           
        ] ,
        [
            { icon: $icon('yaxiaosuanyan'), list: [{ title: '亚硝酸盐含量', val: '3.4m/s' }] },        
            
        ]   
    ];

    return (
        <Layout title='渔场条件' minTitle='Natural conditions'>
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