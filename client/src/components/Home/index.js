import React, { Component } from 'react'

import MainImage from '../vertical-slider/main-image';
import Premium from '../premium/premium';
import VideoContent from '../main-content/video-content';
import Sidebar from '../main-content/sidebar';
import Movies from '../movies/movies';


export default class Home extends Component {
    render() {
        return (
            <div id="home">
                <section id="verticalSlider">
                    <div className="row bgWhite">
                        <div className="col-12">
                            <MainImage/>
                        </div>
                    </div>
                </section>
                <Premium/>
                <section id="mainContent">
                    <div className="row ">
                        <div className="bgWhite col-8">
                        <VideoContent/>
                        </div>
                        <div className="col-4">
                            <Sidebar/>
                        </div>
                    </div>
                </section>
                <Movies />
            </div>
        )
    }
}
