import * as React from 'react';
import * as ReactDom from 'react-dom';
import MyApp from './MyApp';

function loadApp(): void {
  const container = document.getElementById('react_container');
  if (container) {
    ReactDom.render(
      <MyApp/>,
      container
    )
  }
}

loadApp();