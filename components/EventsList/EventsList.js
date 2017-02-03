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
import s from './EventsList.css';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';


class EventsList extends React.Component {
  render() {
    const {unreadEvents,isShowing,togglePopup} = this.props;
    let displayEvents = unreadEvents.map((item, i) =>
      i < 5 ?
       <ListItem key = {item.id}
             primaryText={item.title}
             secondaryText={""+(new Date(item.datetime))}
             onClick={this.props.handleEventRead.bind(this,item.id)}
          />:undefined
    );
    return (
      <div style = {isShowing ?
          {opacity:1, right: "25px", top:"60px", position:"absolute", transition: "all linear 0.4ss"}:
          {opacity:0, right: "25px", top:"-1000px", position:"absolute"}
      }>
        <List
          className={` ${s.eventsList}`}>
          {displayEvents}
          <p onClick={this.props.togglePopup} style={{color: "black", textDecoration: "underline", textAlign: "center"}}>
            Посмотреть все
          </p>
        </List>
      </div>
    );
  }

}

export default EventsList;
