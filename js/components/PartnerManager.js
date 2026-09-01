class PartnersManager {
    constructor() {
        this.container = document.querySelector('.js-partners-container');
        if (!this.container) return;

        this.items = Array.from(this.container.querySelectorAll('.js-partner-item'));
        this.showMoreButton = document.querySelector('.js-partners-show-more');
        this.isShowingAll = false;

        this.initialDesktopCount = parseInt(this.container.dataset.initialDesktop, 10) || 5;
        this.initialMobileCount = parseInt(this.container.dataset.initialMobile, 10) || 3;

        this._bindEvents();
        this._renderPartners();
    }

    _bindEvents() {
        if (this.showMoreButton) {
            this.showMoreButton.addEventListener('click', this._togglePartners.bind(this));
        }
        window.addEventListener('resize', this._renderPartners.bind(this));
    }

    _getVisibleCount() {
        return window.innerWidth < 1200 ? this.initialMobileCount : this.initialDesktopCount;
    }

    _renderPartners() {
        const visibleCount = this._getVisibleCount();
        this.isShowingAll = false;

        this.items.forEach((item, index) => {
            if (index >= visibleCount) {
                item.classList.add('hidden');
            } else {
                item.classList.remove('hidden');
            }
        });

        this._updateButtonText();
    }

    _togglePartners(event) {
        if (event) event.preventDefault();

        this.isShowingAll = !this.isShowingAll;
        const visibleCount = this._getVisibleCount();

        this.items.forEach((item, index) => {
            if (this.isShowingAll) {
                item.classList.remove('hidden');
            } else {
                if (index >= visibleCount) {
                    item.classList.add('hidden');
                }
            }
        });

        this._updateButtonText();
    }

    _updateButtonText() {
        if (!this.showMoreButton) return;

        if (this.items.length <= this._getVisibleCount()) {
            this.showMoreButton.style.display = 'none';
        } else {
            this.showMoreButton.style.display = '';
            this.showMoreButton.textContent = this.isShowingAll ? 'Скрыть' : 'Показать еще';
        }
    }
}