import React, { Component } from 'react'
import BillingTable from './table';
import ReactLoading from 'react-loading';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { billLoadingAction } from '../../../actions';

class Billing extends Component {

    showBills() {
        if (!this.props.billLoading.billLoading){
            return <ReactLoading className="loading" type={'spinningBubbles'} color={'black'} height={40} width={40}/>
        }
    }

    componentWillMount = () => {
        if (this.props.billLoading.billLoading) {
            this.props.billLoadingSuccess()
        }
    }
    
    render() {
        return (
            <div>
                { this.showBills() }
                <BillingTable/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      billLoading: state.billLoading
    }
}

const mapDispatchToProps = dispatch => ({
    billLoadingSuccess: () => dispatch(billLoadingAction())
})

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Billing) );
