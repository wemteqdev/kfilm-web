import React, { Component } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSidebarAction } from '../../actions';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class LeftSidebar extends Component {

    constructor(props) {
        super(props)
        this.onNav = this.onNav.bind(this)
    }
    onToggle() {
    }

    onNav(selected) {
        this.props.history.push('/user/' + selected)
    }
    render() {
        return (
            <SideNav
                onSelect={(selected) => {
                    this.onNav(selected)
                }}
                onToggle={this.onToggle}
                className="sidebar"
                expanded={true}
            >
                <SideNav.Nav defaultSelected="home" className="sidenav">
                    <NavItem eventKey="profile">
                        <NavIcon>
                            <FontAwesomeIcon icon="user"/>
                        </NavIcon>
                        <NavText>
                                Profile
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="billing">
                        <NavIcon>
                            <FontAwesomeIcon icon="home"/>
                        </NavIcon>
                        <NavText>
                            Billing
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="history">
                        <NavIcon>
                            <FontAwesomeIcon icon="history"/>
                        </NavIcon>
                        <NavText>
                            History
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="pro-videos">
                        <NavIcon>
                            <FontAwesomeIcon icon="film"/>
                        </NavIcon>
                        <NavText>
                            Pro Videos
                        </NavText>
                    </NavItem>
                    {
                        this.props.sidebar.toggleSidebar &&
                        <div className="d-flex text-center plan-nav-item">
                            <div className="justify-content-center align-self-center mx-auto plan-upgrade">
                                <h2>korfilm Pro</h2>
                                <span>Powerful privacy options<br/> and advanced stats</span>
                                <div className="plan-button">
                                    <Link to="/user/plan" className="btn btn-danger btn-lg">Upgrade</Link>
                                </div>
                            </div>
                        </div>
                    }
                    </SideNav.Nav>
            </SideNav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      sidebar: state.sidebar
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    toogleSidebar: () => dispatch(toggleSidebarAction()),
  })
  
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(LeftSidebar));
