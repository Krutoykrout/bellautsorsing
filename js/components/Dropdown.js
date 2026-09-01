class Dropdown {
    static initAll(selector = '.js-dropdown') {
        document.querySelectorAll(selector).forEach((element) => {
            if (!element.dataset.dropdownInited) {
                new Dropdown(element);
            }
        });
    }

    constructor(dropdownElement) {
        this.dropdown = dropdownElement;
        this.header = this.dropdown.querySelector('.js-dropdown-header');
        this.content = this.dropdown.querySelector('.js-dropdown-content');

        if (!this.header || !this.content) return;

        this.dropdown.dataset.dropdownInited = 'true';
        this._bindEvents();
    }

    _bindEvents() {
        this.header.addEventListener('click', () => this.toggle());
    }

    toggle() {
        const isOpen = this.dropdown.classList.contains('active');

        // Закрыть все другие
        document.querySelectorAll('.js-dropdown.active').forEach(dropdown => {
            if (dropdown !== this.dropdown) {
                const instance = dropdown.dataset.dropdownInstance;
                if (instance && window[instance]) {
                    window[instance].close();
                } else {
                    dropdown.classList.remove('active');
                    const content = dropdown.querySelector('.js-dropdown-content');
                    if (content) content.style.maxHeight = null;
                }
            }
        });

        if (isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.dropdown.classList.add('active');
        this.content.style.maxHeight = this.content.scrollHeight + 'px';
        this.content.addEventListener('transitionend', function handler(e) {
            if (e.propertyName === 'max-height') {
                this.style.maxHeight = 'none';
                this.removeEventListener('transitionend', handler);
            }
        });
    }

    close() {
        const height = this.content.scrollHeight;
        this.content.style.maxHeight = height + 'px';
        void this.content.offsetHeight;
        this.content.style.maxHeight = '0px';

        this.dropdown.classList.remove('active');
    }
}

window.Dropdown = Dropdown;
