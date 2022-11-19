const form = document.querySelector("#novoItem");
const listItems = document.querySelector("#listItems");
const itemsCollection = JSON.parse(localStorage.getItem("items")) || [];

itemsCollection.forEach((e) => {
    addItem(e.name, e.quantity);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameItem = e.target.elements["nome"];
    const qntItem = e.target.elements["quantidade"];

    itemsCollection.push({ name: nameItem.value, quantity: qntItem.value });
    localStorage.setItem("items", JSON.stringify(itemsCollection));
    
    addItem(nameItem.value, qntItem.value);

    nameItem.value = "";
    qntItem.value = "";
});

function addItem(name, qnt) {
    const newItem = document.createElement("li");
    newItem.classList.add("item");

    const itemQnt = document.createElement("strong");
    itemQnt.innerHTML = qnt;

    newItem.appendChild(itemQnt);
    newItem.innerHTML += name;

    listItems.appendChild(newItem);

};
