// App.js

import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, database } from './Firebase'; // Import Firebase instances
import { push, ref as dbRef } from 'firebase/database';
import Menu from './Menu'; // Import the Menu component
import './App.css'; // Import the CSS file

function App() {
  const [formData, setFormData] = useState({
    name: '',
    itemName: '',
    price: '',
    description: '',
    image: null,
    imageData: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imageData: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageRef = ref(storage, `images/${formData.image.name}`);
      await uploadBytes(imageRef, formData.image);
      const imageUrl = await getDownloadURL(imageRef);

      const itemData = {
        name: formData.name,
        itemName: formData.itemName,
        price: formData.price,
        description: formData.description,
        imageUrl: imageUrl
      };

      await push(dbRef(database, 'menuItems'), itemData);

      alert('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit data');
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Name: </label><br />
          <input type='text' name="name" value={formData.name} onChange={handleChange} /><br /><br />

          <label>Item Name: </label><br />
          <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} /><br /><br />

          <label>Price: </label><br />
          <input type="number" name="price" value={formData.price} onChange={handleChange} /><br /><br />

          <label>Description: </label><br />
          <input type="text" name="description" value={formData.description} onChange={handleChange} /><br /><br />

          <label>File: </label><br />
          <input type="file" name="image" onChange={handleChange} /><br /><br />

          <input type="submit" value='Add' />
        </form>
      </div>
      <Menu /> {/* Render the Menu component */}
    </div>
  );
}

export default App;
