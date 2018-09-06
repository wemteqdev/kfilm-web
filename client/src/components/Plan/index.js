import React, { Component } from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

export default class Plan extends Component {

    state = {
        plans:[],
        subscription:[]
    }

    componentWillMount(){
        axios.get(`http://korfilm.loc/api/user/subscriptions`)
        .then( response => {
            this.setState({subscription:response.data.data[0].stripe_plan});
        })
        axios.get(`http://korfilm.loc/api/products`)
        .then( response => {
            this.setState({plans:response.data.data});
        })
    }

    onToken = (plan_id) => token => {
        axios.post(`http://korfilm.loc/api/plans/${plan_id}/subscribe`, {
            method: 'POST',
            stripeToken: token.id,
        }).then(response => {
            console.log(response)
        }).catch(error => {

        });
    }

    showPlans() {
        if (this.state.plans.length === 0){
            return <div></div>
        }
        return this.state.plans[0].plans.map((plan, key) => {
                return (
                    <div key={key} className="card mb-4 shadow-sm col-3 mx-3 text-center">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">{this.state.plans[0].name}-{plan.nickname}</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">${ plan.amount / 100 } <small className="text-muted">/ { plan.interval }</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>20 users included</li>
                                    <li>10 GB of storage</li>
                                    <li>Priority email support</li>
                                    <li>Help center access</li>
                                </ul>
                                { this.state.subscription !== plan.id && <StripeCheckout
                                    token={this.onToken(plan.id)}
                                    stripeKey="pk_test_ZaX66npOBaJhNzR80x8lBlS0"
                                    amount={plan.amount}
                                    name={plan.nickname}
                                    description="description"
                                />}
                            </div>
                    </div>
                )
            })
    }
    render() {
        return (
            <div className="pricing-page bgWhite">
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Pricing</h1>
                    <p className="lead"></p>
                </div>
                <div className="row justify-content-center align-items-center">
                    { this.showPlans() }
                </div>
            </div>
        )
    }
}
