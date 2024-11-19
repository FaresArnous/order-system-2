document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const decreaseButtons = document.querySelectorAll(".decrease");
  const increaseButtons = document.querySelectorAll(".increase");
  const submitButton = document.querySelector("#sub-btn button");

  const toasterContainer = document.createElement("div");
  toasterContainer.id = "toasterContainer";
  document.body.appendChild(toasterContainer);

  function showToaster(message, type) {
    const toaster = document.createElement("div");
    toaster.classList.add("toaster");

    if (type === "warning") {
      toaster.style.backgroundColor = "rgb(255, 204, 102)";
      toaster.style.borderLeft = "solid 5px rgb(255, 165, 0)";
      toaster.style.color = "rgb(255, 69, 0)";
    } else {
      toaster.style.backgroundColor = "rgb(183, 235, 183)";
      toaster.style.borderLeft = "solid 5px rgb(58, 238, 58)";
      toaster.style.color = "rgb(48, 239, 48)";
    }

    const messageElem = document.createElement("div");
    messageElem.classList.add("message");
    messageElem.innerHTML = message;

    toaster.appendChild(messageElem);
    toasterContainer.appendChild(toaster);

    setTimeout(() => {
      toaster.remove();
    }, 4000);
  }

  function updateQuantity(itemName, change) {
    const formattedId = itemName.replace(/\s+/g, "-");
    const inputElement = document.getElementById(`${formattedId}-quantity`);

    if (inputElement) {
      let currentValue = parseInt(inputElement.value, 10) || 0;
      currentValue = Math.max(currentValue + change, 0);
      inputElement.value = currentValue;
    } else {
      console.error(
        `Input element with ID '${formattedId}-quantity' not found.`
      );
    }
  }

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemName = button.getAttribute("data-item");
      updateQuantity(itemName, -1);
    });
  });

  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemName = button.getAttribute("data-item");
      updateQuantity(itemName, 1);
    });
  });

  submitButton.addEventListener("click", () => {
    const items = document.querySelectorAll(".item");
    const order = {};

    items.forEach((item) => {
      const itemName = item.querySelector("h2").textContent;
      const formattedId = itemName.replace(/\s+/g, "-");
      const quantityElement = document.getElementById(
        `${formattedId}-quantity`
      );

      if (quantityElement) {
        const quantity = parseInt(quantityElement.value, 10) || 0;
        if (quantity > 0) {
          order[itemName] = quantity;
        }
      }
    });

    if (Object.keys(order).length > 0) {
      showToaster("Successfully Submitted!", "success");

      // Emit only the current order without referencing localStorage
      socket.emit("new-order", order);
    } else {
      showToaster("You need to order something first", "warning");
    }

    // Reset quantities after submitting
    items.forEach((item) => {
      const itemName = item.querySelector("h2").textContent;
      const formattedId = itemName.replace(/\s+/g, "-");
      const quantityElement = document.getElementById(
        `${formattedId}-quantity`
      );

      if (quantityElement) {
        quantityElement.value = 0;
      }
    });
  });
});
