// An array to store items
let items = [];

// Get references to HTML elements
const itemNameInput = document.getElementById("item-name");
const itemDescInput = document.getElementById("item-description");
const itemPriceInput = document.getElementById("item-price");
const itemQuantityInput = document.getElementById("item-quantity");
const addItemButton = document.getElementById("add-item");
const itemDetails = document.getElementById("item-details");

// Function to add an item
async function addItem() {
     const itemName = itemNameInput.value;
     const itemDesc = itemDescInput.value;
     const itemPrice = itemPriceInput.value;
     const itemQuantity = itemQuantityInput.value;

     const item = {
          name: itemName,
          description: itemDesc,
          price: itemPrice,
          quantity: itemQuantity
     };

     try {
          // Send the item data to the server using Axios POST request
          const response = await axios.post('https://crudcrud.com/api/641037f4ea0b46d4be35fc44bbadfebc/generalStore', item)
          console.log('Item added successfully:', response.data)
          items.push(item)
          clearInputs()
     }
     catch (error) {
          console.log('Error adding item:', error)
     }

     let itemDsiplay = document.createElement('li')
     itemDsiplay.textContent = `Item: ${itemName} Description: ${itemDesc} Price: Rs ${itemPrice} Qty: ${itemQuantity}`

     let btn1 = document.createElement('button')
     let btn2 = document.createElement('button')
     let btn3 = document.createElement('button')
     btn1.textContent = 'Buy 1'
     btn1.id = 'btn1'
     btn2.textContent = 'Buy 2'
     btn2.id = 'btn2'
     btn3.textContent = 'Buy 3'
     btn3.id = 'btn3'

     btn1.onclick = function (event) {
          event.target.parentElement.textContent = `Item: ${itemName} Description: ${itemDesc} Price: Rs ${itemPrice} Qty: ${parseInt(itemQuantity) - 1}`
          reduceQuantity(item, 1, itemContainer)
     }

     btn2.onclick = function (event) {
          event.target.parentElement.textContent = `Item: ${itemName} Description: ${itemDesc} Price: Rs ${itemPrice} Qty: ${parseInt(itemQuantity) - 2}`
          reduceQuantity(item, 2, itemContainer)
     }

     btn3.onclick = function (event) {
          event.target.parentElement.textContent = `Item: ${itemName} Description: ${itemDesc} Price: Rs ${itemPrice} Qty: ${parseInt(itemQuantity) - 3}`
          reduceQuantity(item, 3, itemContainer)
     }

     // btn2.onclick = function(event){}

     itemDsiplay.appendChild(btn1)
     itemDsiplay.appendChild(btn2)
     itemDsiplay.appendChild(btn3)
     itemDetails.appendChild(itemDsiplay)
}

function displayItems(items) {
     itemDetails.innerHTML = '';
     items.forEach((item, index) => {
          const itemContainer = document.createElement('li');
          itemContainer.textContent = `Item: ${item.name} Description: ${item.description} Price: Rs ${item.price} Qty: ${item.quantity}`;

          let btn1 = document.createElement('button');
          btn1.textContent = 'Buy 1';
          btn1.style.margin = '5px'
          btn1.onclick = function () {
               // Call the corresponding function to reduce the quantity by 1
               reduceQuantity(item, 1, itemContainer);
          }

          let btn2 = document.createElement('button');
          btn2.textContent = 'Buy 2';
          btn2.style.margin = '5px'
          btn2.onclick = function () {
               // Call the corresponding function to reduce the quantity by 2
               reduceQuantity(item, 2, itemContainer);
          }

          let btn3 = document.createElement('button');
          btn3.textContent = 'Buy 3';
          btn3.style.margin = '5px'
          btn3.onclick = function () {
               // Call the corresponding function to reduce the quantity by 3
               reduceQuantity(item, 3, itemContainer);
          }

          itemContainer.appendChild(btn1);
          itemContainer.appendChild(btn2);
          itemContainer.appendChild(btn3);
          itemDetails.appendChild(itemContainer);
     });
}

// Function to reduce quantity
async function reduceQuantity(item, amount, itemContainer) {
     // Make sure the quantity doesn't go below 0
     if (item.quantity >= amount) {
          item.quantity -= amount;
          const id = item._id
          delete item._id
          try {
               // Update the item data on the server using Axios PUT request
               const response = await axios.put(`https://crudcrud.com/api/641037f4ea0b46d4be35fc44bbadfebc/generalStore/${id}`, item)
               console.log('Item updated successfully:', response.data)
               await retrieveItems()
          }
          catch (error) {
               console.log('Error updating item:', error);
          }
     }
}

// Function to clear input fields
function clearInputs() {
     itemNameInput.value = "";
     itemDescInput.value = "";
     itemPriceInput.value = "";
     itemQuantityInput.value = "";
}

// Event listener for the "Add Item" button
addItemButton.addEventListener("click", addItem);

// Function to retrieve items from the server using Axios GET request
async function retrieveItems() {
     try {
          const response = await axios.get('https://crudcrud.com/api/641037f4ea0b46d4be35fc44bbadfebc/generalStore')
          console.log('Items retrieved successfully:', response.data);
          items = response.data;
          displayItems(items)
     }
     catch (error) {
          console.log('Error retrieving items:', error)
     }
}

// Call retrieveItems to get the initial data from the server
retrieveItems();
