import React from 'react';

import CreateProduct from './components/ceatreProduct';
import Header from './components/header';

import styles from './scss/app.module.scss'

function App() {
  return (
    <div className={styles.App}>
      <Header></Header>
      <CreateProduct />
    </div>
  );
}

export default App;
