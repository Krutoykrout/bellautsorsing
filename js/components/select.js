class Select {
    static initAll(selector = '.js-select') {
        document.querySelectorAll(selector).forEach((element) => {
            if (!element.dataset.selectInited) {
                new Select(element);
            }
        });
    }

    constructor(selectElement) {
        this.select = selectElement;
        this.select.dataset.selectInited = 'true';
        this.header = this.select.querySelector('.js-select-header');
        this.itemsContainer = this.select.querySelector('.js-select-items');
        this.items = this.select.querySelectorAll('.js-select-item');

        if (!this.header || !this.itemsContainer || this.items.length === 0) return;

        this._bindEvents();
    }

    _bindEvents() {
        this.header.addEventListener('click', () => this.toggle());

        this.items.forEach(item => {
            item.addEventListener('click', () => this.selectItem(item));
        });

        document.addEventListener('click', (e) => {
            if (!this.select.contains(e.target)) {
                this.close();
            }
        });
    }

    toggle() {
        const isOpen = !this.itemsContainer.hidden;
        this.itemsContainer.hidden = isOpen;
        this.select.classList.toggle('active', !isOpen);
    }

    close() {
        this.itemsContainer.hidden = true;
        this.select.classList.remove('active');
    }

    selectItem(item) {
        this.header.textContent = item.textContent;
        this.header.dataset.option = item.dataset.option;

        this.items.forEach(option => {
            option.classList.remove('unactive');
        });
        item.classList.add('unactive');

        this.close();

        const event = new CustomEvent('select:change', {
            detail: {
                value: item.dataset.option,
                label: item.textContent
            }
        });
        this.select.dispatchEvent(event);
    }

    getValue() {
        return this.header.dataset.option;
    }
}

window.Select = Select;
