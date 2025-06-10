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
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalRevenue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let totalItems = getCartItemCount();

    gtag('event', 'purchase', {
        value: totalRevenue,  // Total revenue
        currency: "USD",
        cartcount: totalItems // Total items in cart
    });

    alert("Thank you for your purchase!");
    localStorage.removeItem("cart");
    displayCart();
}


// Function to get total cart item count
function getCartItemCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Function to track page views
function trackPageView() {
    gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        user_id: localStorage.getItem("user_id") || "guest",
        referral_source: document.referrer || "Direct",
        session_duration: performance.now() // Time since page load
    });
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("cart-items")) {
        displayCart();
    }

    // Track page view when the page loads
    trackPageView();

    let form = document.getElementById("contact-form"); // Ensure your form has this ID
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission

            let name = document.getElementById("name")?.value || "Unknown";
            let email = document.getElementById("email")?.value || "Unknown";
            let password = document.getElementById("password")?.value || "Unknown";
            let count = getCartItemCount(); // Get cart item count

            gtag('event', 'contact_form_submission', {
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

