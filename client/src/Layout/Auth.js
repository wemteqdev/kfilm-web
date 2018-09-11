import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class Auth extends Component {
    componentWillMount = () => {
        setTimeout(()=>{
            let isLoggedIn = this.props.login.user != null;
            if (isLoggedIn === false) {
                this.props.history.push('/login')
            }
        }, 2000)
    }

    render() {
        return (
            this.props.login.user != null && this.props.children
        );
    }
};

const mapStateToProps = (state) => {
    return {
      login: state.login
    }
}

  
export default withRouter( connect(mapStateToProps, null)(Auth));