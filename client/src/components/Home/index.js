import React, { Component } from 'react';

import Banner from '../widgets/Banner';
import MainContent from '../widgets/MainContent';
import Videos from '../widgets/Videos';
import { Fade } from 'reactstrap';


export default class Home extends Component {
    render() {
        return (
            <Fade in={true} tag="div">
                <div id="home">
                    <Banner/>
                    <MainContent/>
                    <Videos/>
                </div>
            </Fade>
        )
    }
}
