import React, {ReactElement, useEffect} from "react";
import {Provider} from 'react-redux'

import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import {IShareTargetPlugin, ShareTargetEventData} from "@marwonline/capacitor-share-target/src";

import {Home} from './views/Home';

import {Plugins} from '@capacitor/core';
import styled from "@emotion/styled";
import {DeviceView} from "./views/DeviceView";
import store, {ingestIntent} from "./redux/store";

const {SplashScreen} = Plugins;
const ShareTargetPlugin = Plugins.ShareTargetPlugin as IShareTargetPlugin;

if (ShareTargetPlugin) {
  ShareTargetPlugin.addListener('text', (data: ShareTargetEventData) => {
    store.dispatch(ingestIntent(data));
  });
  ShareTargetPlugin.addListener('image', (data: ShareTargetEventData) => {
    store.dispatch(ingestIntent(data));
  });
}

const Navigation = styled.nav`
  & {
    display: flex;
    justify-content: flex-end;
    width: 100vw;
  }
  & a {
    display: inline-block;
    padding: 3px;
    font-weight: bold;
    text-decoration: none;
  }
`;

const Header = (): ReactElement => {
  return (
    <Navigation>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/device">Device</NavLink>
    </Navigation>
  )
};

const MyApp = (): ReactElement => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/device" component={DeviceView}/>
        </Switch>
      </Router>
    </Provider>
  )
};

export default MyApp;