import React from 'react';

import Header from './components/header';
import Body from './components/body';

import styles from './scss/app.module.scss'

function App() {
  return (
    <div className={styles.App}>
      <Header></Header>
      <Body />
    </div>
  );
}

export default App;
