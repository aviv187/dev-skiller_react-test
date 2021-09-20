import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setProducts } from './redux/products';

import Header from './components/header';
import Body from './components/body';

import styles from './scss/app.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const pruducts: any = localStorage.getItem('products') ?? [];

    // search for products in the local storage and set them
    if (pruducts)
      dispatch(setProducts(JSON.parse(pruducts)));
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <Header></Header>
      <Body />
    </div>
  );
}

export default App;
