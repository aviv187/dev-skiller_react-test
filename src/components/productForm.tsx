import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addProduct, editProduct } from '../redux/products';

import styles from '../scss/form.module.scss';

import { Product } from '../modules/product';

interface ProductFormProps {
  closeFunc: Function;
  oldProduct?: {
    key: number,
    product: Product
  };
}

const ProductForm: React.FC<ProductFormProps> = ({ closeFunc, oldProduct }) => {
  const dispatch = useDispatch();

  const [img, setImg] = useState<string | undefined>();

  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageInput: any = event.target;

    if (imageInput.files && imageInput.files[0]) {
      const img = imageInput.files[0];

      setImg(URL.createObjectURL(img));
    }
  };

  const saveProduct = () => {
    const inputs: any = formRef.current!.elements;

    const image = imageRef.current;
    const name = inputs.name.value.replace(/\s+/g, ' ').trim();;
    const description = inputs.description.value.replace(/\s+/g, ' ').trim();;
    const price = inputs.price.value;

    if (!image || name === '' || description === '' || price === '') {
      alert('All Fields Must be filled');
      return;
    }

    let imgUrl: string;

    // check if the user change the picture (for the upadte)
    if (inputs.image.value === '') {
      imgUrl = oldProduct!.product.image
    } else {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx!.canvas.width = image.width;
      ctx!.canvas.height = image.height;
      ctx!.drawImage(image, 0, 0);

      imgUrl = canvas.toDataURL();
    }

    const storage: any = localStorage.getItem('products');
    const storageProducts = JSON.parse(storage);

    if (oldProduct) {
      // adit item in redux
      if (imgUrl === oldProduct.product.image &&
        name === oldProduct.product.name &&
        description === oldProduct.product.description &&
        price === oldProduct.product.price) {
        alert('Nothing changed!');
        return;
      }

      dispatch(editProduct(oldProduct.key, { image: imgUrl, name, description, price }));

      // edit item in local storage
      storageProducts.splice(oldProduct.key, 1, { image: imgUrl, name, description, price });
      localStorage.setItem('products', JSON.stringify(storageProducts));

      closeFunc();
    } else {
      // add item to redux
      dispatch(addProduct({ image: imgUrl, name, description, price }));

      // add item to local storage
      storageProducts.push({ image: imgUrl, name, description, price });
      localStorage.setItem('products', JSON.stringify(storageProducts));
    }

    closeFunc()
  }

  useEffect(() => {
    if (oldProduct) {
      setImg(oldProduct.product.image);
    } else {
      setImg(undefined);
    }
  }, [oldProduct])

  return (
    <form ref={formRef} className={styles.form} key={`${oldProduct?.product.name} ${oldProduct?.key}`}>
      {img && <img ref={imageRef} src={img} alt='product' />}
      <div className={styles.row}>
        <label>Select Image:</label>
        <input type="file" accept="image/*" onChange={onImageChange} name='image' />
      </div>
      <div className={styles.row}>
        <label>Name: </label>
        <input name='name' type='text' placeholder='Product Name' defaultValue={oldProduct?.product.name} />
      </div>
      <div className={styles.row}>
        <label>Description: </label>
        <input name='description' type='text' placeholder='Product Description' defaultValue={oldProduct?.product.description} />
      </div>
      <div className={styles.row}>
        <label>Price: </label>
        <input name='price' type='number' min={0} placeholder='Product Price' defaultValue={oldProduct?.product.price} />
      </div>
      <div className={styles.button} onClick={saveProduct}>Save</div>
    </form>
  );
}

export default ProductForm;