import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout/layout';
import Home from './components/Home';
import CategoriesPage from './components/CategoriesPage';
import SpecialVideos from './components/SpecialVideos';
import VideoPage from './components/VideoPage';
import Login from './components/Login';
import Profile from './components/Profile';
import Plan from './components/Plan';
import Billing from './components/Billing';

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
                    <Route path="/user/profile" exact component={Profile}/>
                    <Route path="/user/plan" exact component={Plan}/>
                    <Route path="/user/billing" exact component={Billing}/>
                </Switch>
            </Layout>
           
        )
    }
}

export default Routes;