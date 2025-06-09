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

    let form = document.getElementById("contact-form"); // Ensure your form has this ID
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission

            let name = document.getElementById("name")?.value || "Unknown";
            let email = document.getElementById("email")?.value || "Unknown";
            let password = document.getElementById("password")?.value || "Unknown";
            let count = getCartItemCount(); // Get cart item count

            gtag('event', 'contactform_event', {
                username: name,
                useremail: email,
                userpassword: password,
                cartcount: count,
                submission_count: 1
            });

            alert("Form submitted successfully!");
        });
    }
});
