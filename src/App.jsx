import React from 'react';
// 主应用组件
import Navigation from './components/Navigation';
import Natural from './containers/Natural';
import Economic from './containers/Economic';
import Farming from './containers/Farming';
import Industrial from './containers/Industrial';
import Advantage from './containers/Advantage';
import Profittrend from './containers/Profittrend';
import PHzhiBH from './containers/PHzhiBH';
import OxygenLevel from './containers/OxygenLevel';
import SoilMoisture from './containers/SoilMoisture';
import YaXiaoSuanYanBH from './containers/YaXiaoSuanYanBH';

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
                    <div className='main-center-charts'>
                        <Farming />
                        <PHzhiBH />
                        <YaXiaoSuanYanBH />
                        <OxygenLevel />
                        <SoilMoisture />
                    </div>
                </div>
            </section>
            {/* <footer>
                <p>QUKUAILIAN © 2025 <a href='https://github.com/zhubb412' target='_blank'>GXNZD</a></p>
            </footer> */}
        </div>
    );
}



