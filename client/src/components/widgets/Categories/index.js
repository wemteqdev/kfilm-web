import React, { Component } from 'react';
import axios from 'axios';
import Carousel from './CategoriesCarousel/carousel';
import './categories.scss'

class Categories extends Component {

    state = {
        categories:[],
    }

    componentWillMount(){
        axios.get(`http://korfilm.loc/api/categories`)
        .then( response => {
            this.setState({categories:response.data.data});
        })
    }

    showCarousel = () => {
        if (this.state.categories.length === 0)
            return <div></div>
        else
            return <Carousel name='Categories' categories={this.state.categories} icon='th'/> 
    }

    render() {
        return (
            <div>
                { this.showCarousel() }
            </div>
        )
    }
}

export default Categories;
