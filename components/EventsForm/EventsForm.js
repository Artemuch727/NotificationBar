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
import s from './EventsForm.css';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const mapStateToProps = (state) => {
  return {
    events: state.Events
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEventAdd: (newEvent) => {
      dispatch({
          type: "ADD_EVENT",
          payload: newEvent
      })
    },
    onDeleteAll: () => {
      dispatch({
          type: "DELETE_ALL"
      })
    },
    onEventRead: (id) => {
      dispatch({
        type: "READ_EVENT",
        payload: id
      })
    },
  }
};

class EventsForm extends React.Component {
  constructor(props) {
		super(props);
		this.state  = {
        eventDescr: ""
    }
  }


  generateRandomEvents(){
    const {onEventAdd,events} = this.props;
    CreateRandomEvents();

    function CreateRandomEvents(){
      function randWDclassic(n){
        var s ='', abd ='abcdefghijklmnopqrstuvwxyz0123456789', aL = abd.length;
        while(s.length < n)
          s += abd[Math.random() * aL|0];
        return s;
      }

      function getMaxId(arrEvents) {
        function compareNumeric(a, b) {
          return b - a;
        }

        let maxId = (arrEvents.map((item)=>{
          return item.id;
        })).sort(compareNumeric);
        return (++maxId[0] || 1);
      }

      onEventAdd({
        id: getMaxId(events),
        title: randWDclassic(13) + ' ' + randWDclassic(7) + ' ' + randWDclassic(10),
        unread: true,
        datetime: new Date(),
      });
    }
  }

  componentDidMount() {
    var timerId = setInterval(() => { this.generateRandomEvents() }, 20000);
  }

  handleReadAll(){
    const {events,onEventRead,togglePopup} = this.props;

    let unreadEvents = events.filter((item)=>{
      return item.unread
    })
    for (let i = 0; i < unreadEvents.length; i++){
      onEventRead(unreadEvents[i].id);
    }
    togglePopup();
  }

  handleDeleteEvents() {
    const {onDeleteAll,events,togglePopup} = this.props;
    onDeleteAll();
    togglePopup();
  }

  handleSubmitEvent() {
    const {onEventAdd,events} = this.props;
    function getMaxId(arrEvents) {
      function compareNumeric(a, b) {
        return b - a;
      }

      let maxId = (arrEvents.map((item)=>{
        return item.id;
      })).sort(compareNumeric);
      return (++maxId[0] || 1);
    }

    onEventAdd({
      id: getMaxId(events),
      title: this.state.eventDescr,
      unread: true,
      datetime: new Date(),
    });

    this.setState({eventDescr: ""})
  }

  eventEdit(e) {
    this.setState({eventDescr: e.target.value})
  }

  render() {
    return (
          <div className={` ${s.eventsForm}`}>
            <div className={` ${s.eventsForm__input}`}>
              <TextField
                hintText="Название события"
                floatingLabelText="Введите название события"
                style={{width: "350px"}}
                onInput = {this.eventEdit.bind(this)}
              />
              <FlatButton
                label="Отправить"
                onClick={() => {this.handleSubmitEvent()}}
              />
            </div>

            <FlatButton
              label="Пометить все события прочтенными"
              onClick={() => {this.handleReadAll()}}
            />
            <FlatButton
              label="Удалить все события"
              onClick={() => {this.handleDeleteEvents()}}
            />
            <FlatButton
              label="Скрыть показать popUp уведомлений"
              onClick={this.props.togglePopup}
            />
          </div>
    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(EventsForm);
