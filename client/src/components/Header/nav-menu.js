import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const NavMenu = () => {

    const items = [
        {
            icon: 'home',
            text: 'Home',
            link: '/'
        },
        {
            icon: 'user',
            text: 'About',
            link: '/about-us'
        },
        {
            icon: 'envelope',
            text: 'Contact',
            link: '/contact-us'
        }
    ]

    const showItems = () => {
        return items.map( (item, i) => {
            return (
                <li key={i} className='nav-item'>
                    <Link to={item.link}><FontAwesomeIcon icon={item.icon}/> {item.text}</Link>
                </li>
            )
        } )
    }
    return (
        <div className="top-bar-middle">
            <ul className="menu">
                { showItems() }
            </ul>
        </div>
    );
}

export default NavMenu;
