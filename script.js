// script.js

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
});


document.addEventListener("DOMContentLoaded", function() {
    var acc = document.querySelectorAll(".accordion-button");

    acc.forEach(function(button) {
        button.addEventListener("click", function() {
            this.classList.toggle("active");

            var panel = this.nextElementSibling;
            panel.classList.toggle("show");
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const donationAmountInput = document.getElementById('donation-amount');
    const paypalButtonContainer = document.getElementById('paypal-button-container');

    const renderPayPalButton = () => {
        paypal.Buttons({
            createOrder: (data, actions) => {
                const amount = parseFloat(donationAmountInput.value).toFixed(2);
                if (isNaN(amount) || amount <= 0) {
                    throw new Error('Please enter a valid donation amount.');
                }
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: amount
                        }
                    }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then(details => {
                    alert('Thank you for your donation, ' + details.payer.name.given_name + '!');
                    // Optionally, redirect to a thank you page or update the UI to reflect the donation.
                });
            },
            onError: (err) => {
                paypalButtonContainer.innerHTML = `<p>Error: ${err.message}</p>`;
            }
        }).render('#paypal-button-container');
    };

    renderPayPalButton();

    // Update the PayPal button state based on the input
    donationAmountInput.addEventListener('input', () => {
        paypalButtonContainer.innerHTML = ''; // Clear the existing button
        const amount = parseFloat(donationAmountInput.value).toFixed(2);
        if (!isNaN(amount) && amount > 0) {
            renderPayPalButton(); // Re-render the PayPal button if the input is valid
        } else {
            paypalButtonContainer.innerHTML = '<p>Please enter a valid donation amount.</p>';
        }
    });
});



