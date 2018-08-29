import React, { Component } from 'react';
import './topbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SocialLinks extends Component {
  render() {
    return (
      <div className="socialLinks">
        <a ><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
        <a ><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
        <a ><FontAwesomeIcon icon={['fab', 'google-plus']} /></a>
        <a ><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
        <a ><FontAwesomeIcon icon={['fab', 'vimeo']} /></a>
        <a ><FontAwesomeIcon icon={['fab', 'youtube']} /></a>
      </div>
    );
  }
}

export default SocialLinks;
