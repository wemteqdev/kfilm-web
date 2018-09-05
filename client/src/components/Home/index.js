import React, { Component } from 'react';

import Banner from '../widgets/Banner';
import MainContent from '../widgets/MainContent';
import Videos from '../widgets/Videos';


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
