let showHamburguerOptions = false;
let showFriesOptions = false;
let showDrinkOptions = false;
let showDessertOptions = false;
let total = 0;
let cart = [];

function toggleOptions(option) {
    document.getElementById(option).style.display = showHamburguerOptions? 'none' : 'block';
    showHamburguerOptions =!showHamburguerOptions;
}

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    total += price;
    updateCart();
}

function removeFromCart(index) {
    const item = cart[index];
    total -= item.price;
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - R$ ${item.price}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(index);
        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);
    });
    document.getElementById('total-price').textContent = `Valor Total do Pedido: R$ ${total}`;
}