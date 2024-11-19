const items = [
  { name: "Turkish coffee", image: "Images/Turkish-Coffee.jpg" },
  { name: "Americano", image: "Images/Americano.jpg" },
  { name: "Tea", image: "Images/Tea.jpg" },
  { name: "Green Tea", image: "images/green tea.avif" },
  { name: "Water", image: "Images/water.jpg" },
  { name: "classic coffee", image: "Images/classic-coffee.jpg" },
];

const menuList = document.getElementById("menu-list");

function createMenuItem(item) {
  const formattedId = item.name.replace(/\s+/g, "-");

  const li = document.createElement("li");
  li.classList.add("item");

  li.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <div class="quantity-controls">
      <h2>${item.name}</h2>
      <button class="decrease" data-item="${item.name}">-</button>
      <input class="ss" type="text" id="${formattedId}-quantity" value="0" />
      <button class="increase" data-item="${item.name}">+</button>
      ${
        item.name !== "Water"
          ? `
      <div class="select">
        <input type="radio" id="${formattedId}-sugar" name="${formattedId}-sugar" class="sugar" />
        <label for="${formattedId}-sugar">With Sugar</label>

        <input type="radio" id="${formattedId}-no-sugar" name="${formattedId}-sugar" class="no-sugar" />
        <label for="${formattedId}-no-sugar">Without Sugar</label>
      </div>`
          : ""
      }
    </div>
  `;

  menuList.appendChild(li);
}

items.forEach(createMenuItem);
