import React, { Component } from 'react'
import axios from 'axios';
import { Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { billLoadingAction } from '../../../actions';

class BillingTable extends Component {
    state = {
        invoices:[]
    }

    componentWillMount = () => {
        axios.get(`http://korfilm.loc/api/user/invoices`)
        .then( response => {
            this.setState({
                invoices:response.data.data,
            });
            this.props.billLoadingSuccess()
        })
    }
    
    showInvoices() {
        return this.state.invoices.map((item, i) => {
            return (
                <tr key={i + 1}>
                    <td>{ item.date }</td>
                    <td>${ item.total / 100 }</td>
                </tr>
            )
        })
    }

    showPage() {
        return (
            <div className="container clearfix">
                <div className="text-center page-title">
                    <h2>BILLING</h2>
                </div>
                <Table className="bill-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.showInvoices() }
                    </tbody>
                </Table>
            </div>
        )
    }
    render() {
        return (
            this.showPage()
        )
    }
}

const mapDispatchToProps = dispatch => ({
    billLoadingSuccess: () => dispatch(billLoadingAction())
})

export default withRouter( connect(null, mapDispatchToProps)(BillingTable) );
