import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeProduct } from '../redux/products';

import styles from '../scss/body.module.scss'
import ProductForm from './productForm';

const Body = () => {
  const dispatch = useDispatch();

  const products: {
    image: string;
    name: string;
    description: string;
    price: number;
  }[] = useSelector((state: any) => state.products);

  const [addProduct, setAddProduct] = useState(false);
  const [selectedProd, setSelectedProd] = useState<null | number>(null);

  return (
    <div className={styles.body} >
      <button onClick={() => setAddProduct(!addProduct)}>Add Product +</button>
      <div className={styles.row}>
        <div className={styles.products_list}>
          {products.length > 0 ? products.map((prod, i) => {
            return <div key={`${prod.name} ${i}`} className={`${styles.item} ${selectedProd === i && styles.selected}`} onClick={() => setSelectedProd(i)}>
              <div className={styles.row}>
                <img src={prod.image} alt='Pruduct' />
                <div>
                  <div className={styles.title}>{prod.name}</div>
                  <div>{prod.description}</div>
                  <div>{prod.price.toLocaleString()}$</div>
                </div></div>
              <button onClick={() => {
                dispatch(removeProduct(i));
              }}>delete</button>
            </div>

          }) : 'Products List is empty'}
        </div>
        {addProduct && <ProductForm closeFunc={() => setAddProduct(false)} />}
      </div>
    </div>
  );
}

export default Body;