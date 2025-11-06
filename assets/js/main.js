document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.querySelector('#current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const message = document.createElement('p');
      message.className = 'newsletter-message';
      message.textContent = `Спасибо! Мы отправим лучшие предложения на ${emailInput.value.trim()}.`;
      newsletterForm.replaceWith(message);
    });
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const destination = formData.get('destination');

      const responseCard = document.createElement('div');
      responseCard.className = 'contact-card highlight-box';
      responseCard.innerHTML = `
        <h3>Запрос получен!</h3>
        <p>Спасибо, ${name}. Наш консультант свяжется с вами в ближайшее время, чтобы обсудить путешествие в ${destination}.</p>
        <p>Мы уже подобрали лучшие предложения и программы по вашим интересам.</p>
      `;

      contactForm.replaceWith(responseCard);
    });
  }
});
