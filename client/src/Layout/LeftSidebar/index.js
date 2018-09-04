import React, { Component } from 'react';
import { Sidebar, Sidenav, Nav, Dropdown, Icon } from 'rsuite';
import 'rsuite/dist/rsuite';
import 'rsuite/dist/styles/rsuite.css';

class LeftSidebar extends Component {

    state = {
      expand: true
    }

    constructor(props) {
        super(props)
        this.handleToggle = this.handleToggle.bind(this)
    }
    panelStyles = {
        padding: '15px 20px',
        color: '#aaa'
    };
      
    headerStyles = {
        padding: 20,
        fontSize: 16,
        background: '#34c3ff',
        color: ' #fff'
    };

    handleToggle() {
        this.setState({
            expand : !this.state.expand
        })
    }
    render() {
        return (
            <Sidebar
                width={this.state.expand ? 260 : 56}
                collapsible
                className="left-sidebar"
            >
                <Sidenav
                    expanded={this.state.expand}
                    defaultOpenKeys={['3']}
                    className="left-sidenav"
                >
                    <Sidenav.Body>
                        <Nav>
                            <Nav.Item eventKey="1">
                                Dashboard
                            </Nav.Item>
                            <Nav.Item eventKey="2">
                                User Group
                            </Nav.Item>
                            <Dropdown
                                eventKey="3"
                                trigger="hover"
                                title="Advanced"
                                icon={<Icon icon="magic" />}
                                placement="rightTop"
                            >
                                <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                                <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                                <Dropdown.Item eventKey="3-3">Brand</Dropdown.Item>
                                <Dropdown.Item eventKey="3-4">Loyalty</Dropdown.Item>
                                <Dropdown.Item eventKey="3-5">Visit Depth</Dropdown.Item>
                            </Dropdown>
                            <Dropdown
                                eventKey="4"
                                trigger="hover"
                                title="Settings"
                                icon={<Icon icon="gear-circle" />}
                                placement="rightTop"
                            >
                                <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                                <Dropdown.Item eventKey="4-2">Websites</Dropdown.Item>
                                <Dropdown.Item eventKey="4-3">Channels</Dropdown.Item>
                                <Dropdown.Item eventKey="4-4">Tags</Dropdown.Item>
                                <Dropdown.Item eventKey="4-5">Versions</Dropdown.Item>
                            </Dropdown>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
                <div></div>
            </Sidebar>
        )
    }
}


export default LeftSidebar;