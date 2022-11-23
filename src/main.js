let shop = document.getElementById('shop')
    /**
     *!Generet the shop list data in an array 
     * */

/**
 *!Store the data in the basket
 * */
let basket = JSON.parse(localStorage.getItem("data")) || []; //if we have local data we storage if no  we leave empthy the storage
/**
 *!Generet the shop list items using html code with js 
 * */

let generetShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || []
        return `  
        <div id=product-id-${id} class="item">
        <img width="220" src="${img}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>${price}</h2>
            </div>

            <div class="button">
                <i onclick="decrement('${id}')"class="bi bi-dash-lg">
            </i>
                <div id=${id} class="quantity">${search.item === undefined?0: search.item}</div>
                <i onclick="increment('${id}')"class="bi bi-plus-lg">
                
            </i>
            </div>

        </div>

    </div>
`
    }).join(""))


};
generetShop();

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
    // console.log(basket);
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
    // console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id); // x means that target every object one by one
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount"); //Select the cart icon on the right top
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();
/**
 *!
 * */