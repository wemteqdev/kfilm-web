import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

class Auth extends Component {

    render() {
        return (
            this.props.login.user != null && this.props.login.user.data.email_verified === true && this.props.children
        );
    }
};

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

  
export default withRouter( connect(mapStateToProps, null)(Auth));