const socket = io(); // Connect to the server

// Handle incoming order updates
socket.on("order-update", (order) => {
  const orderSummary = document.getElementById("order-summary");

  const newOrderContainer = document.createElement("div");
  newOrderContainer.classList.add("new-order");

  const orderHeading = document.createElement("h3");
  orderHeading.textContent = "New Order";

  newOrderContainer.appendChild(orderHeading);

  // Iterate through the order items and display each one
  for (const item in order) {
    const orderItem = document.createElement("div");
    orderItem.classList.add("order-item");

    const itemName = document.createElement("span");
    itemName.classList.add("item-name");
    itemName.textContent = item;

    const itemQuantity = document.createElement("span");
    itemQuantity.classList.add("item-quantity");
    itemQuantity.textContent = `x${order[item]}`;

    orderItem.appendChild(itemName);
    orderItem.appendChild(itemQuantity);

    newOrderContainer.appendChild(orderItem);
  }

  // Create the clear button for the order
  const clearButton = document.createElement("button");
  clearButton.classList.add("clear-btn");
  clearButton.textContent = "Clear Order";

  // Clear order on click with confirmation
  clearButton.addEventListener("click", () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to clear this order?"
    );
    if (isConfirmed) {
      orderSummary.removeChild(newOrderContainer);

      let existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      existingOrders = existingOrders.filter(
        (o) => JSON.stringify(o) !== JSON.stringify(order)
      );
      localStorage.setItem("orders", JSON.stringify(existingOrders)); // Update localStorage
    }
  });

  newOrderContainer.appendChild(clearButton);

  // Add separator line
  const separatorLine = document.createElement("hr");
  separatorLine.id = "line";
  newOrderContainer.appendChild(separatorLine);

  orderSummary.appendChild(newOrderContainer);

  let existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
  existingOrders.push(order); // Add the new order
  localStorage.setItem("orders", JSON.stringify(existingOrders)); // Update localStorage
});

document.addEventListener("DOMContentLoaded", () => {
  const orderSummary = document.getElementById("order-summary");
  let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  savedOrders.forEach((order) => {
    const newOrderContainer = document.createElement("div");
    newOrderContainer.classList.add("new-order");

    const orderHeading = document.createElement("h3");
    orderHeading.textContent = "New Order";

    newOrderContainer.appendChild(orderHeading);

    for (const item in order) {
      const orderItem = document.createElement("div");
      orderItem.classList.add("order-item");

      const itemName = document.createElement("span");
      itemName.classList.add("item-name");
      itemName.textContent = item;

      const itemQuantity = document.createElement("span");
      itemQuantity.classList.add("item-quantity");
      itemQuantity.textContent = `x${order[item]}`;

      orderItem.appendChild(itemName);
      orderItem.appendChild(itemQuantity);

      newOrderContainer.appendChild(orderItem);
    }

    const clearButton = document.createElement("button");
    clearButton.classList.add("clear-btn");
    clearButton.textContent = "Clear Order";

    clearButton.addEventListener("click", () => {
      const isConfirmed = window.confirm(
        "Are you sure you want to clear this order?"
      );
      if (isConfirmed) {
        orderSummary.removeChild(newOrderContainer);

        let existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        existingOrders = existingOrders.filter(
          (o) => JSON.stringify(o) !== JSON.stringify(order)
        );
        localStorage.setItem("orders", JSON.stringify(existingOrders));
      }
    });

    newOrderContainer.appendChild(clearButton);

    const separatorLine = document.createElement("hr");
    separatorLine.id = "line";
    newOrderContainer.appendChild(separatorLine);

    orderSummary.appendChild(newOrderContainer);
  });
});
