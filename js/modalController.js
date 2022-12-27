import { modalDeliveryContainer, modalDeliveryForm } from './elemets.js';
import { clearCart } from './cart.js';

export function orderController(getCart) {
  modalDeliveryForm.addEventListener('change', () => {
    if (modalDeliveryForm.format.value === 'pickup') {
      modalDeliveryForm['address-info'].classList.add('modal-delivery__fieldset-input_hide');
    }

    if (modalDeliveryForm.format.value === 'delivery') {
      modalDeliveryForm['address-info'].classList.remove('modal-delivery__fieldset-input_hide');
    }
  });

  modalDeliveryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(modalDeliveryForm);
    const data = Object.fromEntries(formData);

    data.order = getCart();

    fetch('https://reqres.in/api/users', {
      method: 'post',
      body: JSON.stringify(data),
    }).then(response => response.json())
      .then(data => {
        clearCart();
        modalDeliveryContainer.insertAdjacentHTML('beforeend',
          `
          <h2>Спасибо за заказ!</h2>
          <h3>Ваш номер заказа ${data.id}</h3>
          <p>С вами свяжется ${data.manager}</p>
        `);
        modalDeliveryForm.reset();
        console.log(data);
      });
  })
}