/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {connect} from 'react-redux';
import Link from '../Link';
import EventsList from '../EventsList';
import s from './Header.css';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const mapStateToProps = (state) => {
  return {
    events: state.Events
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onEventRead: (id) => {
      dispatch({
        type: "READ_EVENT",
        payload: id
      })
    },
  }
}


class Header extends React.Component {

  handleEventRead(id) {
    const {onEventRead} = this.props;
    onEventRead(id);
  }

  render() {
    const {events,onEventRead} = this.props;

    let unreadEvents = events.filter((item)=>{
      return item.unread
    });

    return (
      <header className={`mdl-layout__header ${s.header}`} ref={node => (this.root = node)}>
        <div className={`mdl-layout__header-row ${s.row}`}>
          <Link className={`mdl-layout-title ${s.title}`} to="/">
            Панель уведомлений
          </Link>
          <div className="mdl-layout-spacer"></div>

            <Badge
              badgeContent={unreadEvents.length}
              badgeStyle={{top: 15, right: 15, display: unreadEvents.length > 0 ? "flex" : "none"}}
            >
              <IconButton
                onMouseEnter={this.props.togglePopup}
              >
                <NotificationsIcon />
              </IconButton>
            </Badge>
            <EventsList
              isShowing = {this.props.isShowing}
              togglePopup={this.props.togglePopup}
              unreadEvents = {unreadEvents}
              handleEventRead = {onEventRead}
            />
        </div>
      </header>
    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
