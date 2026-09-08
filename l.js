function placeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("🛒 Order Placed");
        }, 1000);
    });
}

function makePayment() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("💳 Payment Successful");
        }, 2000);
    });
}

function prepareFood() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("👨‍🍳 Food Prepared");
        }, 1500);
    });
}

function deliverFood() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("🚚 Food Delivered");
        }, 1000);
    });
}

placeOrder()
    .then(result => {
        console.log(result);
        return makePayment();
    })
    .then(result => {
        console.log(result);
        return prepareFood();
    })
    .then(result => {
        console.log(result);
        return deliverFood();
    })
    .then(result => {
        console.log(result);
        console.log("🎉 Order Completed");
    })
    .catch(error => {
        console.log(error);
    });