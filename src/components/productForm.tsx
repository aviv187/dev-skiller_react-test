import React, { ChangeEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/products';

import styles from '../scss/form.module.scss';

interface ProductFormProps {
  closeFunc: Function
}

const ProductForm: React.FC<ProductFormProps> = ({ closeFunc }) => {
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

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx!.drawImage(image, 0, 0, image.offsetWidth, image.offsetHeight);

    const imgUrl = canvas.toDataURL();

    dispatch(addProduct({ image: imgUrl, name, description, price }));

    closeFunc()
  }

  return (
    <form ref={formRef} className={styles.form}>
      {img && <img ref={imageRef} src={img} alt='product' />}
      <div className={styles.row}>
        <label>Select Image:</label>
        <input type="file" accept="image/*" onChange={onImageChange} />
      </div>
      <div className={styles.row}>
        <label>Name: </label>
        <input name='name' type='text' placeholder='Product Name' />
      </div>
      <div className={styles.row}>
        <label>Description: </label>
        <input name='description' type='text' placeholder='Product Description' />
      </div>
      <div className={styles.row}>
        <label>Price: </label>
        <input name='price' type='number' placeholder='Product Price' />
      </div>
      <div className={styles.button} onClick={saveProduct}>Save</div>
    </form>
  );
}

export default ProductForm;