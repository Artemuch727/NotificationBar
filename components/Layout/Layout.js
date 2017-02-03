/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import Header from './Header';
import EventsForm from '../EventsForm';
import Footer from '../Footer';
import s from './Layout.css';


class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state  = {
        popupIsShowing: false
    }
  }

  togglePopup(){
    this.setState({popupIsShowing: !this.state.popupIsShowing})
  }

  componentDidMount() {
    //window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
   // window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout" ref={node => (this.root = node)}>
        <div className="mdl-layout__inner-container" style={{minHeight: "400px"}}>
          <Header
            togglePopup = {this.togglePopup.bind(this)}
            isShowing = {this.state.popupIsShowing}/>
          <EventsForm
            togglePopup = {this.togglePopup.bind(this)}/>
          <main className="mdl-layout__content">
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

export default Layout;
