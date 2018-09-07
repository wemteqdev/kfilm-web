import React, { Component } from 'react';

import Banner from '../../components/widgets/Banner';
import MainContent from '../../components/widgets/MainContent';
import Videos from '../../components/widgets/Videos';


export default class Home extends Component {
    render() {
        return (
            <div id="home">
                <Banner/>
                <MainContent/>
                <Videos/>
            </div>        
        )
    }
}
