let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || []; //if we have local data we storage if no  we leave empthy the storage
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount"); //Select the cart icon on the right top
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return ShoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <div class="cart-item">
            <img width="100" src=${search.img} alt=""/>
         
            <div class="details">

            <div class="title-price-x">
            <h4 class="title-price">
            <p>${search.name}</p>
            <p class="cart-item-price">$ ${search.price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>


            <div class="button">
                <i onclick="decrement('${id}')"class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${item}</div>
                <i onclick="increment('${id}')"class="bi bi-plus-lg"></i>
        </div>
            <h3>$ ${item*search.price}</h3>
            </div>
            </div>
            </div>
            `;
        }).join("");

    } else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
    }
}
generateCartItems();
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if (search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1,
        })
    } else {
        search.item += 1;
    }
    generateCartItems();
    update(selectedItem);
    localStorage.setItem("data", JSON.stringify(basket));
}


let decrement = (id) => {

    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if (search.item === 0)
        basket.push({
            id: selectedItem,
            item: 1,
        });
    else {
        search.item -= 1;
    }
    update(selectedItem);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id); // x means that target every object one by one
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
}

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}
let clearCart = () => {
    basket = [];
    calculation();
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
        <h2>Total Bill: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>`;

    } else return;
}
TotalAmount();