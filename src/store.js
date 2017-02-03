/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { createStore } from 'redux';

// Centralized application state
// For more information visit http://redux.js.org/
const initialState = { Events: [
  {
    id: 17,
    title: 'Test test test 17',
    unread: true,
    datetime: new Date(),
  },
  {
    id: 16,
    title: 'Test test test 16',
    unread: true,
    datetime: new Date().setHours((new Date()).getHours() - 2),
  },
  {
    id: 14,
    title: 'Test test test 14',
    unread: true,
    datetime: new Date().setDate((new Date()).getDate() - 1),
  },
  {
    id: 13,
    title: 'Test test test 13',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 3),
  },
  {
    id: 12,
    title: 'Test test test 12',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 8),
  },
  {
    id: 11,
    title: 'Test test test 11',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 31),
  },
  {
    id: 10,
    title: 'Test test test 10',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 160),
  }
] };

const store = createStore((state = initialState, action) => {
  // TODO: Add action handlers (aka "reducers")
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, Events:  [...state.Events, action.payload] };
    case 'READ_EVENT':
      let currIdx;
      for(let i = 0; i < state.Events.length; i++){
        if (state.Events[i].id == action.payload){
          currIdx = i;
        };
      }
      return { ...state, Events: [...state.Events.slice(0,currIdx),
        {...state.Events[currIdx], ...state.Events[currIdx].unread = false},
        ...state.Events.slice(currIdx + 1)] };
    case 'MARK_ALL_READ':
      return { ...state, Events: (state.Events) + 1 };
    case 'DELETE_ALL':
      return { ...state, Events: state.Events.slice(state.Events.length) };
    default:
      return state;
  }
});

export default store;
