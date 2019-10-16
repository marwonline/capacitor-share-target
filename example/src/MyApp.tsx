import React, {ReactElement, useEffect, useMemo} from "react";
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom';

import {Home} from './views/Home';

import {Device, DeviceInfo, Plugins} from '@capacitor/core';
import styled from "@emotion/styled";

const {SplashScreen} = Plugins;

interface MenuEntry {
  path: string;
  title: string;
  exact?: boolean;
  constructor: () => ReactElement;
}

const NAVIGATION_ACTIVE_CLASS = 'nav-active';

class AppCore {
  private isRenderingDone = false;
  private info: DeviceInfo | null = null;
  private readonly menuData: MenuEntry[] = [
    {
      path: '/',
      title: 'Home',
      exact: true,
      constructor: Home
    }
  ];

  constructor() {
    this.retrieveDeviceData();
  }

  public renderingDone() {
    this.isRenderingDone = true;
    this.gg();
  }

  private async retrieveDeviceData() {
    this.info = await Device.getInfo();
    console.log(this.info);
    this.gg();
  }

  /**
   * Starting the app when it's ready!
   */
  private gg() {
    if (!this.isRenderingDone) {
      return;
    }
    if (this.info === null) {
      return;
    }
    SplashScreen.hide();
  }

  public get menu(): MenuEntry[] {
    return this.menuData;
  }

}

const runtime = new AppCore();

const Navigation = styled.nav`
  & {
    display: flex;
    justify-content: flex-end;
    width: 100vw;
  }
`;

const MenuItem = styled.div`
  display: inline-block;
  padding: 3px;
  & .${NAVIGATION_ACTIVE_CLASS} {
    text-decoration: none;
  }
`;

const Header = (): ReactElement => {
  const menuData = useMemo<MenuEntry[]>(() => {
    return runtime.menu;
  }, []);

  return (
    <Navigation>
      {
        menuData.map((data: MenuEntry, index: number): ReactElement => {
          return (
            <MenuItem key={index}>
              <NavLink activeClassName={NAVIGATION_ACTIVE_CLASS} to={data.path}>{data.title}</NavLink>
            </MenuItem>
          )
        })
      }
    </Navigation>
  )
};

const MyApp = (): ReactElement => {
  const menuData = useMemo<MenuEntry[]>(() => {
    return runtime.menu;
  }, []);

  useEffect(() => {
    runtime.renderingDone();
  }, []);

  return (
    <Router>
      <Header/>
      {
        menuData.map((item: MenuEntry, index: number): ReactElement => {
          return <Route key={index} exact={item.exact} path={item.path} component={item.constructor}/>;
        })
      }
    </Router>
  )
};

export default MyApp;