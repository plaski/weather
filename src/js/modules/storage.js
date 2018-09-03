const storage = {

  storeUnit: function(isC) {
    localStorage.setItem('weatherUnit', JSON.stringify(isC));
  },

  getUnit: function() {
    let weatherUnit;
    if (localStorage.getItem('unit') === null) {
      weatherUnit = true;
    } else {
      weatherUnit = JSON.parse(localStorage.getItem('unit'));
    }
    return weatherUnit;
  },

  storeItem: function(item) {
    let weatherItems;
    if (localStorage.getItem('weatherItems') === null) {
      weatherItems = [];
      weatherItems.push(item);
      localStorage.setItem('weatherItems', JSON.stringify(weatherItems));
    } else {
      weatherItems = JSON.parse(localStorage.getItem('items'));
      weatherItems.push(item);
      localStorage.setItem('weatherItems', JSON.stringify(weatherItems));
    }
  },

  getItemsFromStorage: function() {
    let weatherItems;
    if (localStorage.getItem('weatherItems') === null) {
      weatherItems = [];
    } else {
      weatherItems = JSON.parse(localStorage.getItem('weatherItems'));
    }
    return weatherItems;
  },

  updateItemStorage: function(updatedItem) {
    let weatherItems = JSON.parse(localStorage.getItem('weatherItems'));
    weatherItems.forEach(function(item, index) {
      if (updatedItem.id === item.id) {
        weatherItems.splice(index, 1, updatedItem);
      }
    });
    localStorage.setItem('weatherItems', JSON.stringify(weatherItems));
  },

  deleteItemFromStorage: function(id) {
    let weatherItems = JSON.parse(localStorage.getItem('weatherItems'));
    weatherItems.forEach(function(item, index) {
      if (id === item.id) {
        weatherItems.splice(index, 1);
      }
    });
    localStorage.setItem('weatherItems', JSON.stringify(weatherItems));
  }
}

export default storage;
