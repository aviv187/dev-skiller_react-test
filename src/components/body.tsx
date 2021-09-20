import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeProduct } from '../redux/products';

import ProductForm from './productForm';

import styles from '../scss/body.module.scss'

import { Product } from '../modules/product'

const Body = () => {
  const dispatch = useDispatch();

  const products: Product[] = useSelector((state: any) => state.products);

  const [addProduct, setAddProduct] = useState(false);
  const [selectedProd, setSelectedProd] = useState<null | number>(null);

  const [filter, setFilter] = useState('');

  return (
    <div className={styles.body} >
      <div className={styles.row}>
        <button onClick={() => setAddProduct(!addProduct)}>Add Product +</button>
        {/* filter input */}
        <input type="text" onChange={e => { setFilter(e.target.value) }} placeholder='Filter by Product Name' />
      </div>
      <div className={styles.row}>
        {/* list of all the products that passed the filter text */}
        <div className={styles.products_list}>
          {products.length > 0 ? products.map((prod, i) => {
            if (prod.name.includes(filter))
              return <div
                key={`${prod.name} ${i}`}
                className={`${styles.item} ${selectedProd === i && styles.selected}`}
                onClick={e => {
                  if (!(e.target instanceof HTMLButtonElement)) {
                    setSelectedProd(i);
                  }
                }}>
                <div className={styles.row}>
                  <img src={prod.image} alt='Pruduct' />
                  <div>
                    <div className={styles.title}>{prod.name}</div>
                    <div>{prod.description}</div>
                    <div className={styles.title} >{prod.price.toLocaleString()}$</div>
                  </div></div>
                <button onClick={() => {
                  if (selectedProd === i) {
                    setSelectedProd(null);
                  } else if (selectedProd && selectedProd > i) {
                    setSelectedProd(selectedProd - 1);
                  }

                  // delete item from redux
                  dispatch(removeProduct(i));

                  // delete from local storage
                  const storage: any = localStorage.getItem('products');
                  const storageProducts = JSON.parse(storage);
                  storageProducts.splice(i, 1)

                  localStorage.setItem('products', JSON.stringify(storageProducts));
                }}>delete</button>
              </div>

            return false;

          }) : 'Products List is empty'}
        </div>
        {addProduct && <ProductForm closeFunc={() => setAddProduct(false)} />}
      </div>
    </div>
  );
}

export default Body;