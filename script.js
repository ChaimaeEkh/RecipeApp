document.addEventListener("DOMContentLoaded", function() {
    function animateOnScroll() {
      const elements = document.querySelectorAll('.cards > div, .potatoes, .services');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
          element.classList.add('animate');
        } else {
          element.classList.remove('animate');
        }
      });
    }
  
    animateOnScroll();
  
    window.addEventListener('scroll', animateOnScroll);
  
    // Fonction de recherche
    function searchRecipes() {
      const searchInput = document.querySelector('input[type="search"]');
      const cards = document.querySelectorAll('.cards > div');
      
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        cards.forEach(card => {
          const title = card.querySelector('.title').textContent.toLowerCase();
          const price = card.querySelector('.price').textContent.toLowerCase();
          
          if (title.includes(searchTerm) || price.includes(searchTerm)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }
  
    searchRecipes();
  
    function animateCards() {
      const cards = document.querySelectorAll('.cards > div');
      
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'scale(1.05) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'scale(1) translateY(0)';
        });
      });
    }
  
    animateCards();
  
    function animateHeroImage() {
      const heroImage = document.querySelector('.image-plat img');
      
      window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        heroImage.style.transform = `perspective(1000px) rotateY(${mouseX * 20}deg) rotateX(${-mouseY * 20}deg)`;
      });
    }
  
    animateHeroImage();
  
    function addServiceIcons() {
      const services = document.querySelectorAll('.services span');
      const icons = ['bi-calendar-check', 'bi-cup-straw', 'bi-award', 'bi-truck'];
      
      services.forEach((service, index) => {
        if (icons[index]) {
          service.insertAdjacentHTML('afterbegin', `<i class="bi ${icons[index]}"></i> `);
        }
      });
    }
  
    addServiceIcons();
  
    //menu
    function handleResponsiveNavbar() {
      const menuToggle = document.querySelector('.menu-toggle');
      const navUl = document.querySelector('nav ul');
  
      menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('show');
      });
    }
  
    handleResponsiveNavbar();
  
    // les étoiles 
    function displayStars() {
      const cards = document.querySelectorAll('.cards > div');
      
      cards.forEach(card => {
        const starsContainer = card.querySelector('.stars');
        const rating = parseFloat(starsContainer.dataset.rating) || 0;
        
        let starsHTML = '<i class="bi bi-star-fill"></i> ';
        starsHTML += rating.toFixed(1);
        
        starsContainer.innerHTML = starsHTML;
      });
    }
  
    displayStars();
  
    function testimonialSlider() {
      const testimonials = document.querySelectorAll('.testimonial');
      let currentTestimonial = 0;
  
      function showNextTestimonial() {
        testimonials[currentTestimonial].style.display = 'none';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.display = 'block';
      }
  
      setInterval(showNextTestimonial, 5000); 
    }
  
    // Gestion de la soumission 
    function handleNewsletterSubmit() {
      const form = document.querySelector('.newsletter-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with: ${email}`);
        form.reset();
      });
    }

    testimonialSlider();
    handleNewsletterSubmit();
  
    // Gestion du panier
    const cartIcon = document.querySelector(".cart-icon");
    const cartSection = document.querySelector(".cart");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.querySelector(".cart-count");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    function updateCartDisplay() {
      cartItemsContainer.innerHTML = "";
      let total = 0;
      let count = 0;
  
      cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
  
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
  
        cartItem.innerHTML = `
          <div class="cart-item-content">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
              <h4>${item.title}</h4>
              <p>$${item.price.toFixed(2)}</p>
              <div class="quantity-controls">
                <button class="quantity-btn minus" data-title="${item.title}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-title="${item.title}">+</button>
              </div>
            </div>
          </div>
          <button class="remove-btn" data-title="${item.title}">X</button>
        `;
  
        cartItemsContainer.appendChild(cartItem);
      });
  
      cartTotal.textContent = `$${total.toFixed(2)}`;
      cartCount.textContent = count;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    function addToCart(item) {
      const existingItem = cart.find(cartItem => cartItem.title === item.title);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ ...item, quantity: 1 });
      }
      updateCartDisplay();
    }
  
    function updateCartItemQuantity(title, change) {
      const item = cart.find(cartItem => cartItem.title === title);
      if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
          removeFromCart(title);
        } else {
          updateCartDisplay();
        }
      }
    }
  
    function removeFromCart(title) {
      cart = cart.filter(item => item.title !== title);
      updateCartDisplay();
    }
  
    cartIcon.addEventListener("click", function() {
      cartSection.style.display = cartSection.style.display === "none" ? "block" : "none";
    });
  
    document.addEventListener("click", function(event) {
      if (event.target.classList.contains("add-to-cart")) {
        const card = event.target.closest(".menu-item");
        const title = card.querySelector("h3").textContent;
        const price = parseFloat(card.querySelector(".price").textContent.replace("$", ""));
        const image = card.querySelector("img").getAttribute("src");
  
        addToCart({ title, price, image });
        alert(`${title} has been added to the cart!`);
      }
    });
  
    cartItemsContainer.addEventListener("click", function(e) {
      if (e.target.classList.contains("quantity-btn")) {
        const title = e.target.getAttribute("data-title");
        const change = e.target.classList.contains("plus") ? 1 : -1;
        updateCartItemQuantity(title, change);
      } else if (e.target.classList.contains("remove-btn")) {
        const title = e.target.getAttribute("data-title");
        removeFromCart(title);
      }
    });
  
    updateCartDisplay();
  
    // Filtrage des plats
    document.querySelectorAll('.menu-filter').forEach(filterSection => {
        const menuItems = filterSection.closest('section').querySelectorAll('.menu-item');
        const filterButtons = filterSection.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                menuItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });
});