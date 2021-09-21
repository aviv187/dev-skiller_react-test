import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setProducts } from './redux/products';

import Header from './components/header';
import Body from './components/body';

import styles from './scss/app.module.scss';
import { Product } from './modules/product';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      setTimeout(() => {
        let pruducts: any = localStorage.getItem('products');

        // search for products in the local storage and set them
        if (!pruducts) {
          // set some demo data
          const demoData: Product[] = [
            { name: 'products 1', image: 'some-url', description: 'black', price: 10 },
            { name: 'products 2', image: 'some-url', description: 'pink', price: 100 },
            { name: 'products 3', image: 'some-url', description: 'blue', price: 1 }
          ];

          dispatch(setProducts(demoData));

          localStorage.setItem('products', JSON.stringify(demoData));
        } else {
          dispatch(setProducts(JSON.parse(pruducts)));
        }

      }, 1000);
    }

    getData();
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <Header></Header>
      <Body />
    </div>
  );
}

export default App;
