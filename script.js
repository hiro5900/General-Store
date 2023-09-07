// An array to store items
let items = [];

// Get references to HTML elements
const itemNameInput = document.getElementById("item-name");
const itemDescInput = document.getElementById("item-description");
const itemPriceInput = document.getElementById("item-price");
const itemQuantityInput = document.getElementById("item-quantity");
const addItemButton = document.getElementById("add-item");
const itemDetailsDiv = document.getElementById("item-details");

// Function to add an item
function addItem() {
     const itemName = itemNameInput.value;
     const itemDesc = itemDescInput.value;
     const itemPrice = itemPriceInput.value;
     const itemQuantity = itemQuantityInput.value;

     if (!itemName || !itemDesc || !itemPrice || !itemQuantity) {
          alert("Please fill in all fields.");
          return;
     }

     const item = {
          name: itemName,
          description: itemDesc,
          price: itemPrice,
          quantity: itemQuantity
     };

     // Send the item data to the server using Axios POST request
     axios.post('https://crudcrud.com/api/f65b2e7bff5146d88aa90ead71c758c8/generalStore', item)
          .then((response) => {
               console.log('Item added successfully:', response.data);
               items.push(item);
               displayItems();
               clearInputs();
          })
          .catch((error) => {
               console.error('Error adding item:', error);
          });
}

// Function to display items
function displayItems() {
     itemDetailsDiv.innerHTML = "";
     items.forEach((item, index) => {
          const itemDiv = document.createElement("div");
          itemDiv.innerHTML = `
            <p><b>Item Name:</b> ${item.name}</p>
            <p><b>Description:</b> ${item.description}</p>
            <p><b>Price:</b> $${item.price}</p>
            <p><b>Quantity:</b> ${item.quantity}</p>
            <button onclick="buyItem(${index}, 1)">Buy 1</button>
            <button onclick="buyItem(${index}, 2)">Buy 2</button>
            <button onclick="buyItem(${index}, 3)">Buy 3</button>
        `;
          itemDetailsDiv.appendChild(itemDiv);
     });
}

// Function to buy an item
function buyItem(index, quantityToBuy) {
     if (items[index].quantity >= quantityToBuy) {
          items[index].quantity -= quantityToBuy;
          displayItems();
     } else {
          alert("Not enough quantity available.");
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
function retrieveItems() {
     axios.get('https://crudcrud.com/api/f65b2e7bff5146d88aa90ead71c758c8/generalStore')
          .then((response) => {
               console.log('Items retrieved successfully:', response.data);
               items = response.data;
               displayItems(); 
          })
          .catch((error) => {
               console.error('Error retrieving items:', error);
          });
}

// Call retrieveItems to get the initial data from the server
retrieveItems();
