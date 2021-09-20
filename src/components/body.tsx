import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import styles from '../scss/body.module.scss'
import ProductForm from './productForm';

const Body = () => {
  const products: {
    image: string;
    name: string;
    description: string;
    price: number;
  }[] = useSelector((state: any) => state.products);

  const [addProduct, setAddProduct] = useState(false)

  return (
    <div className={styles.body}>
      <button onClick={() => setAddProduct(!addProduct)}>Add Product +</button>
      <div className={styles.row}>
        <div className={styles.products_list}>
          {products.length > 0 ? products.map((prod, i) => {
            return <div key={`${prod.name} ${i}`} className={styles.item}>
              <div className={styles.row}>
                <img src={prod.image} alt='Pruduct' />
                <div>
                  <div className={styles.title}>{prod.name} - {prod.price.toLocaleString()}$</div>
                  <div>{prod.description}</div>
                </div></div>
              <button>delete</button>
            </div>
          }) : 'Products List is empty'}
        </div>
        {addProduct && <ProductForm closeFunc={() => setAddProduct(false)} />}
      </div>
    </div>
  );
}

export default Body;