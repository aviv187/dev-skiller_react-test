import React from 'react';

import Header from './components/header';

import styles from './scss/app.module.scss'

function App() {
  return (
    <div className={styles.App}>
      <header className="App-header">
        <Header></Header>
      </header>
    </div>
  );
}

export default App;
