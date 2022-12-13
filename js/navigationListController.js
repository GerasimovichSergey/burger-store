import { catalogTitle, navigationList, navigationListItems } from './elemets.js';

export function navigationListController(callback) {
  navigationList.addEventListener('click', event => {
    const categoryItem = event.target.closest('.navigation__button');

    if (!categoryItem) return;

    navigationListItems.forEach(item => {
      if (item === categoryItem) {
        item.classList.add('navigation__button_active');
        catalogTitle.textContent = categoryItem.textContent;
        callback(item.dataset.category);
      } else {
        item.classList.remove('navigation__button_active');
      }
    })
  })
}