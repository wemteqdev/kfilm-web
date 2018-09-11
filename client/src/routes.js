import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout/layout';
import Home from './Views/Home';
import CategoriesPage from './components/CategoriesPage';
import SpecialVideos from './components/SpecialVideos';
import VideoPage from './components/VideoPage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './Views/Sidebar/Profile';
import Plan from './Views/Sidebar/Plan';
import Billing from './Views/Sidebar/Billing';
import Histories from './Views/Sidebar/Histories';
import Favorites from './Views/Sidebar/Favorites';
import ProVideos from './Views/Sidebar/ProVideos';
import Auth from './Layout/Auth';

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
                    <Route path="/register" exact component={Register}/>
                    <Auth>
                        <Route path="/user/profile" exact component={Profile}/>
                        <Route path="/user/plan" exact component={Plan}/>
                        <Route path="/user/billing" exact component={Billing}/>
                        <Route path="/user/history" exact component={Histories}/>
                        <Route path="/user/favorites" exact component={Favorites}/>
                        <Route path="/user/pro-videos" exact component={ProVideos}/>
                    </Auth>
                </Switch>
            </Layout>
           
        )
    }
}

export default Routes;