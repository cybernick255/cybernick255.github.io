    function openModal(id) {
      const modal = document.getElementById(id);
      modal.style.display = 'flex';
      if (modal.querySelector('.image-grid')) {
        initSlider(modal);
      }
    }

    function closeModal(id) {
      document.getElementById(id).style.display = 'none';
    }

    window.onclick = function(event) {
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    };

    function initSlider(modal) {
      const imageGrid = modal.querySelector('.image-grid');
      const images = imageGrid.querySelectorAll('img');
      let currentIndex = 0;

      if (!modal.querySelector('.slider-nav')) {
        const nav = document.createElement('div');
        nav.className = 'slider-nav';

        const leftBtn = document.createElement('button');
        leftBtn.className = 'slider-button';
        leftBtn.innerHTML = '&#10094;';
        leftBtn.onclick = () => showSlide(currentIndex - 1);

        const rightBtn = document.createElement('button');
        rightBtn.className = 'slider-button';
        rightBtn.innerHTML = '&#10095;';
        rightBtn.onclick = () => showSlide(currentIndex + 1);

        nav.appendChild(leftBtn);
        nav.appendChild(rightBtn);
        imageGrid.parentElement.appendChild(nav);
      }

      if (!modal.querySelector('.slider-indicators')) {
        const indicators = document.createElement('div');
        indicators.className = 'slider-indicators';

        for (let i = 0; i < images.length; i++) {
          const dot = document.createElement('div');
          dot.onclick = () => showSlide(i);
          indicators.appendChild(dot);
        }

        imageGrid.parentElement.appendChild(indicators);
      }

      const indicatorDots = modal.querySelectorAll('.slider-indicators div');

      function showSlide(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        imageGrid.scrollTo({ left: images[0].clientWidth * index, behavior: 'smooth' });

        indicatorDots.forEach(dot => dot.classList.remove('active'));
        indicatorDots[index].classList.add('active');

        currentIndex = index;
      }

      showSlide(currentIndex);
    }