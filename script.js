// Scroll animation
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScroll() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScroll);
handleScroll();

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Calorie calculator
const calorieForm = document.getElementById('calorie-form');
if (calorieForm) {
    calorieForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const recipeName = document.getElementById('recipe-name').value;
        const ingredients = document.getElementById('ingredients').value.split(',');
        const servings = parseInt(document.getElementById('servings').value);
        
        // This is a mock calculation. In a real scenario, you'd need a database of ingredient calories.
        const totalCalories = ingredients.length * 100;
        const caloriesPerServing = Math.round(totalCalories / servings);
        
        document.getElementById('calorie-result').innerHTML = `
            <p>Estimated calories for ${recipeName}:</p>
            <p>Total: ${totalCalories} calories</p>
            <p>Per serving: ${caloriesPerServing} calories</p>
        `;
    });
}

// Contact form submission using EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var templateParams = {
            to_name: this.from_name.value,
            mail: this.from_email.value,
            message: this.message.value
        };
        
        emailjs.send('service_xtyieyc', 'template_70mw9p5', templateParams)
            .then(function() {
                console.log('SUCCESS!');
                document.getElementById('form-status').textContent = 'Message sent successfully!';
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                document.getElementById('form-status').textContent = 'Failed to send message. Please try again.';
            });
    });
}