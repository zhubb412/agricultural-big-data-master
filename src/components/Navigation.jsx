import React from 'react';

import { $icon } from '../utils';

// 标题页面

export default function Navigation() {
    return (
        <div className='navigation'>
            <div className='center'>
                <div className='logo'>
                    <img src={require('../assets/icon/crops1.svg')} alt='' />
                </div>
                <div className='title' style={{ marginTop: '-100px' }}>
                    <p>鱼菜共生大数据平台 · 广西农职大</p>
                    <p>Smart Agriculture Big Data Platform · Large Screen Center</p>
                </div>
            </div>
            {/* <div className='tool'>
                <div className='tool-item'>
                    <img src={$icon('setting')} alt='' />
                    <span>设置</span>
                </div>
                <div className='tool-item'>
                    <img src={$icon('poweroff')} alt='' />
                    <span>退出</span>
                </div>
            </div> */}
        </div>
    );
}

