import { catalogTitle, navigationList, navigationListItems } from './elemets.js';

export function navigationListController() {
  navigationList.addEventListener('click', event => {
    const categoryItem = event.target.closest('.navigation__button');

    if (!categoryItem) return;

    navigationListItems.forEach(item => {
      if (item === categoryItem) {
        item.classList.add('navigation__button_active');
        catalogTitle.textContent = categoryItem.textContent;
      } else {
        item.classList.remove('navigation__button_active');
      }
    })
  })
}