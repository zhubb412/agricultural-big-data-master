import React from 'react';
// 主应用组件
import Navigation from './components/Navigation';
import Natural from './containers/Natural';
import Economic from './containers/Economic';
import Farming from './containers/Farming';
import Industrial from './containers/Industrial';
import Advantage from './containers/Advantage';
import Profittrend from './containers/Profittrend';

export default function App() {
    return (
        <div className='app'>
            <Navigation />
            <section className='main'>
                <div className='main-left'>
                    <Natural />
                    <Economic />
                </div>
                <div className='main-right'>
                    <Industrial />
                    <Advantage />
                </div>
                <div className='main-center'>
                    <div className='main-center-panel'>
                        <Profittrend />
                    </div>

                    <Farming />
                </div>
            </section>
            {/* <footer>
                <p>QUKUAILIAN © 2025 <a href='https://github.com/zhubb412' target='_blank'>GXNZD</a></p>
            </footer> */}
        </div>
    );
}



