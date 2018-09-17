import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout';
import Auth from './Layout/Auth';
import Home from './Views/Home';
import CategoriesPage from './components/CategoriesPage';
import HotPage from './components/HotPage';
import PopularPage from './components/PopularPage';
import TrendingPage from './components/TrendingPage';
import VideoPage from './components/VideoPage';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import EmailVerification from './components/EmailVerification';
import Register from './components/Register';
import Profile from './Views/Sidebar/Profile';
import Plan from './Views/Sidebar/Plan';
import Billing from './Views/Sidebar/Billing';
import Histories from './Views/Sidebar/Histories';
import Favorites from './Views/Sidebar/Favorites';
import ProVideos from './Views/Sidebar/ProVideos';

const Routes = () => {
    return(
        <Layout>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/hot" exact component={HotPage}/>
                <Route path="/popular" exact component={PopularPage}/>
                <Route path="/trending" exact component={TrendingPage}/>
                <Route path="/categories/:slug" exact component={CategoriesPage}/>
                <Route path="/videos/:slug" exact component={VideoPage}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/login/forgot_password" exact component={ForgotPassword}/>
                <Route path="/email-verification" exact component={EmailVerification}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/user/password/reset/:token" exact component={ResetPassword}/>
                <Auth>
                    <Route path="/user/profile" exact component={Profile}/>
                    <Route path="/user/plan" exact component={Plan}/>
                    <Route path="/user/billing" exact component={Billing}/>
                    <Route path="/user/history" exact component={Histories}/>
                    <Route path="/user/favorites" exact component={Favorites}/>
                    <Route path="/user/pro-videos" exact component={ProVideos}/>
                    <Route path="/user/videos/:slug" exact component={VideoPage}/>
                </Auth>
            </Switch>
        </Layout>
        
    )
}

export default Routes;