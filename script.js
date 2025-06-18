const lazyLoaders = document.querySelectorAll('.lazy-loader');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

const dogs = document.getElementById("dogs");

const dogObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
                for (let i = 0; i <= 500; i++) {
                    setTimeout(() => {
                        dogs.innerHTML = `${i}<br>`;
                    }, i * 5);
                }
            dogObserver.unobserve(dogs);
        }
    });
}, {
    threshold: 0.1
});

dogObserver.observe(dogs);
const coverage = document.getElementById("coverage");

const coverageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
                for (let i = 0; i <= 100; i++) {
                    setTimeout(() => {
                        coverage.innerHTML = `${i}%<br>`;
                    }, i * 25);
                }
            coverageObserver.unobserve(coverage);
        }
    });
}, {
    threshold: 0.1
});

coverageObserver.observe(coverage);


lazyLoaders.forEach(loader => {
    observer.observe(loader);
});

