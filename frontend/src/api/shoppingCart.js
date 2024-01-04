export const getCarts = () => {
    if (localStorage.getItem("shoppingCarts") == null) {
        localStorage.setItem("shoppingCarts", JSON.stringify({}));
    }
    return JSON.parse(localStorage.getItem("shoppingCarts"));
}

export const saveCarts = (carts) => {
    localStorage.setItem("shoppingCarts", JSON.stringify(carts));
}

const getCart = (carts, storeId) => {
    if (carts[storeId] == null) {
        carts[storeId] = {};
    }
    return carts[storeId];
}

const setCart = (storeId, goodsId, amount) => {
    const carts = getCarts();
    const cart = getCart(carts, storeId);
    if (amount === 0) {
        delete cart[goodsId];
    } else {
        cart[goodsId] = amount;
    }
    saveCarts(carts);
}

export {
    getCart,
    setCart
}