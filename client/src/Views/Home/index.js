import React from 'react';

import Banner from '../../components/widgets/Banner';
import MainContent from '../../components/widgets/MainContent';
import Videos from '../../components/widgets/Videos';


const Home = () => {
    return (
        <div id="home">
            <Banner/>
            <MainContent/>
            <Videos/>
        </div>
    )
}

export default Home;