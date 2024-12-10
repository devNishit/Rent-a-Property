const stars = document.querySelectorAll('.rating input[type="radio"]');

stars.forEach(star => {
    star.addEventListener('change', function() {
        const ratingValue = parseInt(this.value);
        const allStars = document.querySelectorAll('.star');
        
        allStars.forEach((star, index) => {
            if (index < ratingValue) {
                star.style.color = '#ffd000';
            } else {
                star.style.color = '#828282';
            }
        });
    });
});
