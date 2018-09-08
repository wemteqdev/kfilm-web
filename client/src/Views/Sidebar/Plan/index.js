import React, { Component } from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import serverURL from '../../../variables';

export default class Plan extends Component {

    state = {
        plans:[],
        subscription:[]
    }

    componentWillMount(){
        axios.get(`${serverURL}/api/user/subscriptions`)
        .then( response => {
            this.setState({subscription:response.data.data[0].stripe_plan});
        })
        axios.get(`${serverURL}/api/products`)
        .then( response => {
            this.setState({plans:response.data.data});
        })
    }

    onToken = (plan_id) => token => {
        axios.post(`${serverURL}/api/plans/${plan_id}/subscribe`, {
            method: 'POST',
            stripeToken: token.id,
        }).then(response => {
        }).catch(error => {

        });
    }

    showPlans() {
        if (this.state.plans.length === 0){
            return <div></div>
        }
        return this.state.plans[0].plans.map((plan, key) => {
                return (
                    <div key={key} className="col-4">
                        <div className="pricing">
                            <div className="price-head">
                                <span className="price-title">{this.state.plans[0].name}-{plan.nickname}</span>
                                <div className="price">
                                    <h3>${ plan.amount / 100 }<span className="duration">/ { plan.interval }</span></h3>
                                </div>
                            </div>
                            <ul className="price-content">
                                <li>
                                    <p>1GB Disk Space</p>
                                </li>
                                <li>
                                    <p>100 Email Account</p>
                                </li>
                                <li>
                                    <p>24/24 Support</p>
                                </li>
                            </ul>
                            <div className="price-btn">
                                { this.state.subscription !== plan.id && <StripeCheckout
                                    token={this.onToken(plan.id)}
                                    stripeKey="pk_test_ZaX66npOBaJhNzR80x8lBlS0"
                                    amount={plan.amount}
                                    name={plan.nickname}
                                    description="description"
                                >
                                    <button className="outline-btn">Purchase now</button>
                                </StripeCheckout>}
                            </div>
                        </div>
                    </div>
                )
            })
    }
    render() {
        return (
            <div className="container page-padding">
                <div className="row">
                    <div className="section-header text-center">
                        <h1 className="title">Pricing</h1>
                    </div>
                </div>
                <div className="row align-items-center justify-content-center">
                    { this.showPlans() }
                    
                </div>
            </div>
        )
    }
}
