const storage = {

  storeUnit: function(isC) {
    localStorage.setItem('unit', JSON.stringify(isC));
  },

  getUnit: function() {
    let unit;
    if (localStorage.getItem('unit') === null) {
      unit = true;
    } else {
      unit = JSON.parse(localStorage.getItem('unit'));
    }
    return unit;
  },

  storeItem: function(item) {
    let items;
    if (localStorage.getItem('items') === null) {
      items = [];
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
    } else {
      items = JSON.parse(localStorage.getItem('items'));
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
    }
  },

  getItemsFromStorage: function() {
    let items;
    if (localStorage.getItem('items') === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
  },

  updateItemStorage: function(updatedItem) {
    let items = JSON.parse(localStorage.getItem('items'));
    items.forEach(function(item, index) {
      if (updatedItem.id === item.id) {
        items.splice(index, 1, updatedItem);
      }
    });
    localStorage.setItem('items', JSON.stringify(items));
  },

  deleteItemFromStorage: function(id) {
    let items = JSON.parse(localStorage.getItem('items'));
    items.forEach(function(item, index) {
      if (id === item.id) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem('items', JSON.stringify(items));
  }
}

export default storage;
