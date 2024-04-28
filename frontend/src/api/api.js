import axios from 'axios';
import { storage } from '../firebase';

export const fetchProducts = async (pageNumber = 1, min = null, max = null) => {
  const params = {
    pageNumber,
  };
  min && (params.min = min);
  max && (params.max = max);
  const { data } = await axios.get('/api/products', {
    params,
  });
  return data;
};

export const fetchTopProducts = async () => {
  const { data } = await axios.get('/api/products/top-products');
  return data;
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
