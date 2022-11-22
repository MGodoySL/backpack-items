const form = document.querySelector("#novoItem");
const listItems = document.querySelector("#listItems");
const itemsCollection = JSON.parse(localStorage.getItem("items")) || [];

itemsCollection.forEach((e) => {
    addItem(e);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameItem = e.target.elements["nome"];
    const qntItem = e.target.elements["quantidade"];

    const currentItem = {
        name: nameItem.value,
        qntItem: qntItem.value,
    };

    const validatingItem = itemsCollection.find((e) => e.name === nameItem.value);

    if (validatingItem) {
        currentItem.id = validatingItem.id;
        updateItem(currentItem);
        itemsCollection[itemsCollection.findIndex(e => e.id === validatingItem.id)] = currentItem
    } else {
        currentItem.id = itemsCollection[itemsCollection.length - 1] ? (itemsCollection[itemsCollection.length -1]).id + 1 : 0
        addItem(currentItem);
        itemsCollection.push(currentItem);
    }

    localStorage.setItem("items", JSON.stringify(itemsCollection));
    nameItem.value = "";
    qntItem.value = "";
});

function updateItem(currentItem) {
    document.querySelector(`[data-id="${currentItem.id}"]`).innerHTML = currentItem.qntItem;
}

function addItem(currentItem) {
    const newItem = document.createElement("li");
    newItem.classList.add("item");

    const itemQnt = setItemQuantity(currentItem);
    const removeButton = createRemoveButton(currentItem.id);
    newItem.appendChild(itemQnt);
    newItem.innerHTML += currentItem.name;
    newItem.appendChild(removeButton);

    listItems.appendChild(newItem);
}

function setItemQuantity(currentItem) {
    const itemQnt = document.createElement("strong");
    itemQnt.innerHTML = currentItem.qntItem;
    itemQnt.dataset.id = currentItem.id;

    return itemQnt;
}

function createRemoveButton(id) {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = "X";

    buttonElement.addEventListener("click", function () {
        deleteItem(this.parentNode, id);
    });

    return buttonElement;
}

function deleteItem(element, id) {
    element.remove();
    itemsCollection.splice(itemsCollection.findIndex(e => e.id === id), 1)
    localStorage.setItem("items", JSON.stringify(itemsCollection));
}
