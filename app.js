document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const body = document.body;
    
    menuBtn.addEventListener('click', function() {
        body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a nav link (for mobile)
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            body.classList.remove('menu-open');
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Select the logo element - replace 'logo' with your logo's ID or use a class selector
    const logo = document.getElementById('logo');
    
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.reload();
        });
        
        logo.style.cursor = 'pointer';
    }
});

       
       
       // Filter Projects
        document.addEventListener('DOMContentLoaded', function() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    projectCards.forEach(card => {
                        // Show all projects if 'all' filter is selected
                        if (filterValue === 'all') {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.classList.add('show');
                            }, 10);
                        } else {
                            // Check if card has the selected category
                            if (card.getAttribute('data-category').includes(filterValue)) {
                                card.style.display = 'block';
                                setTimeout(() => {
                                    card.classList.add('show');
                                }, 10);
                            } else {
                                card.classList.remove('show');
                                setTimeout(() => {
                                    card.style.display = 'none';
                                }, 300);
                            }
                        }
                    });
                });
            });
            
            // Modal functionality
            const modalTriggers = document.querySelectorAll('.modal-trigger');
            const modals = document.querySelectorAll('.modal');
            const closeModals = document.querySelectorAll('.close-modal');
            
            modalTriggers.forEach(trigger => {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    const modalId = this.getAttribute('href');
                    const modal = document.querySelector(modalId);
                    modal.classList.add('show-modal');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            closeModals.forEach(closeBtn => {
                closeBtn.addEventListener('click', function() {
                    const modal = this.closest('.modal');
                    modal.classList.remove('show-modal');
                    document.body.style.overflow = 'auto';
                });
            });
            
            window.addEventListener('click', function(e) {
                modals.forEach(modal => {
                    if (e.target === modal) {
                        modal.classList.remove('show-modal');
                        document.body.style.overflow = 'auto';
                    }
                });
            });
        });



document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    

    const form = e.target;
    fetch('https://portfolio-yi7q.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        })
    }).then(res => res.json()).then(data => {
        if (data.success) {
            form.reset();
            document.getElementById('form-success').style.display = 'block';
            alert('Your message has been sent successfully!'); 
        } else {
            alert('Error sending message.');
        }
    }).catch(() => alert('Error sending message.'));
});