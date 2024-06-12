// Menu.js

import React, { useEffect, useState } from 'react';
import { ref as dbRef, onValue } from 'firebase/database';
import { database } from './Firebase';
import './Menu.css'; // Import the CSS file

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const menuItemsRef = dbRef(database, 'menuItems');
    const unsubscribe = onValue(menuItemsRef, (snapshot) => {
      const items = snapshot.val();
      const itemList = [];
      for (let id in items) {
        itemList.push({ id, ...items[id] });
      }
      setMenuItems(itemList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.itemName}</p>
            <p>{item.price}</p>
            <p>{item.description}</p>
            <img src={item.imageUrl} alt={item.itemName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
