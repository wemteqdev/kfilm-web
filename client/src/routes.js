import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/layout';
import Home from './components/Home/index';
import Category from './components/Category/index';
// import NewsArticle from './components/Articles/News/Post/index';
// import VideoArticle from './components/Articles/Videos/Video/index'
// import NewsMain from './components/Articles/News/Main/index';
// import VideosMain from './components/Articles/Videos/Main/index';

class Routes extends Component {
    render(){
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/category" exact component={Category}/>
                    {/* <Route path="/videos/:id" exact component={VideoArticle}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/forgot-pass" exact component={ForgotPassword}/> */}
                </Switch>
            </Layout>
           
        )
    }
}

export default Routes;