import React, { Component } from 'react'

import MainContent from '../widgets/MainContent/index';
import Videos from '../widgets/Videos/index';
import Categories from '../widgets/Categories/index';

export default class Home extends Component {
    render() {
        return (
            <div id="home">
                <Categories/>
                <MainContent/>
                <Videos/>
            </div>
        )
    }
}
