// script.js
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartList = document.getElementById('cart-list');
const finalizeOrderButton = document.getElementById('finalize-order');

let cartItems = [];

function addToCart(item) {
    cartItems.push(item);
    renderCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    renderCart();
}

function renderCart() {
    cartList.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <span>R$ ${item.price.toFixed(2)}</span>
            <button class="remove-from-cart" data-index="${index}">Remover</button>
        `;

        totalPrice += item.price;
        cartList.appendChild(li);
    });

    finalizeOrderButton.innerHTML = `Finalizar Pedido - R$ ${totalPrice.toFixed(2)}`;

    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');

    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const menuItem = button.parentElement;
        const name = menuItem.querySelector('span:nth-child(1)').innerText;
        const price = parseFloat(menuItem.querySelector('span:nth-child(2)').innerText.replace('R$ ', ''));

        addToCart({ name, price });
    });
});

finalizeOrderButton.addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    alert(`Pedido finalizado! Valor total: R$ ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}`);
    cartItems = [];
    renderCart();
});