import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import styles from '../scss/body.module.scss'
import CreateProduct from './ceatreProduct';

const Body = () => {
  const products: {
    img: string;
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
          {products.map((prod, i) => {
            return <div key={`${prod.name} ${i}`} className={styles.item}>
              <img src={prod.img} alt='Pruduct' />
              <div>
                <div>{prod.name} - {prod.price}$</div>
                <div>{prod.description}</div>
              </div>
            </div>
          })}
        </div>
        {addProduct && <CreateProduct />}
      </div>
    </div>
  );
}

export default Body;