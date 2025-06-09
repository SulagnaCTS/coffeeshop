function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.name === productName);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(productName + " added to cart!");
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";
    cart.forEach(item => {
        cartItems.innerHTML += `<p>${item.name} x ${item.quantity} - $${item.price * item.quantity}</p>`;
    });
}

function checkout() {
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart");
    displayCart();
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("cart-items")) {
        displayCart();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission

            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            console.log("Email:", email);
            console.log("Password:", password);
        });
    }
});
gtag('event', 'contactform_event', {
    username: name,
    useremail: email,
    userpassword: password,
    submission_count: 1
})

