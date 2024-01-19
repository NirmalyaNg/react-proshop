import axios from 'axios';
import { storage } from '../firebase';

export const fetchProducts = async () => {
  const { data } = await axios.get('/api/products');
  const { products } = data;
  return products;
};

export const uploadImage = async (image) => {
  const storageRef = storage.ref();
  const imageRef = storageRef.child(`images/${image.name}`);

  const uploadTask = imageRef.put(image);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => reject(error),
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((url) => resolve(url))
          .catch((e) => reject(e));
      }
    );
  });
};
