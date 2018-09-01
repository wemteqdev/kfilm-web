import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout/layout';
import Home from './components/Home';
import CategoriesPage from './components/CategoriesPage';
import VideoPage from './components/VideoPage';

class Routes extends Component {
    render(){
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/categories/:slug" exact component={CategoriesPage}/>
                    <Route path="/videos/:slug" exact component={VideoPage}/>
                    {/* <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/forgot-pass" exact component={ForgotPassword}/> */}
                </Switch>
            </Layout>
           
        )
    }
}

export default Routes;