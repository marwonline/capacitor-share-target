import React, {ReactElement, useEffect} from "react";
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import {IShareTargetPlugin, ShareTargetEventData} from "@marwonline/capacitor-share-target/src";

import {Home} from './views/Home';

import {Plugins} from '@capacitor/core';
import styled from "@emotion/styled";
import {DeviceView} from "./views/DeviceView";

const {SplashScreen} = Plugins;
const ShareTargetPlugin = Plugins.ShareTargetPlugin as IShareTargetPlugin;

if (ShareTargetPlugin) {
  ShareTargetPlugin.addListener('text', (data: ShareTargetEventData) => {
    alert(JSON.stringify(data));
  });
  ShareTargetPlugin.addListener('image', (data: ShareTargetEventData) => {
    alert(JSON.stringify(data));
  });
}

const NAVIGATION_ACTIVE_CLASS = 'nav-active';

class AppCore {
  private isRenderingDone = false;

  constructor() {
    this.retrieveDeviceData();
  }

  public renderingDone() {
    this.isRenderingDone = true;
    this.gg();
  }

  private async retrieveDeviceData() {
    this.gg();
  }

  /**
   * Starting the app when it's ready!
   */
  private gg() {
    if (!this.isRenderingDone) {
      return;
    }
    SplashScreen.hide();
  }
}

const runtime = new AppCore();

const Navigation = styled.nav`
  & {
    display: flex;
    justify-content: flex-end;
    width: 100vw;
  }
  & a {
    display: inline-block;
    padding: 3px;

  }
  & a.${NAVIGATION_ACTIVE_CLASS} {
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
    runtime.renderingDone();
  }, []);

  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/device" component={DeviceView}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  )
};

export default MyApp;