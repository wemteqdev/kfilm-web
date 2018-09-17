import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { isValid } from '../functions'

const Auth = (props) => {

    const isUserVerified = () => {
        return isValid(props.login.user) && props.login.user.data.email_verified === true;
    }

    return (
        isUserVerified() && props.children
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

export default withRouter( connect(mapStateToProps, null)(Auth));