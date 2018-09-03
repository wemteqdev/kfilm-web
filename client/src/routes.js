import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout/layout';
import Home from './components/Home';
import CategoriesPage from './components/CategoriesPage';
import SpecialVideos from './components/SpecialVideos';
import VideoPage from './components/VideoPage';
import Login from './components/Login';

class Routes extends Component {
    render(){
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/hot" exact component={SpecialVideos} slug="hot"/>
                    <Route path="/popular" exact component={SpecialVideos} slug="popular"/>
                    <Route path="/trending" exact component={SpecialVideos} slug="trending"/>
                    <Route path="/recent" exact component={SpecialVideos} slug="recent"/>
                    <Route path="/promotion" exact component={SpecialVideos} slug="promotion"/>
                    <Route path="/categories/:slug" exact component={CategoriesPage}/>
                    <Route path="/videos/:slug" exact component={VideoPage}/>
                    <Route path="/login" exact component={Login}/>
                </Switch>
            </Layout>
           
        )
    }
}

export default Routes;