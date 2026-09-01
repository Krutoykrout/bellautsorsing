class Modal {
    constructor() {
        this.modalClass = 'modal';
        this.modalAttr = 'data-modal';
        this.closeAttr = 'data-close';
        this.activeClass = 'modal--active';
        this.init();
    }

    init() {
        this._bindEvents();
    }

    _bindEvents() {
        document.querySelectorAll(`[${this.modalAttr}]`).forEach(button => {
            button.addEventListener('click', (event) => this._openModal(event));
        });

        document.querySelectorAll(`.${this.modalClass} [${this.closeAttr}]`).forEach(button => {
            button.addEventListener('click', (event) => this._closeModal(event));
        });

        document.querySelectorAll(`.${this.modalClass}`).forEach(modal => {
            modal.addEventListener('click', (event) => {
                if (event.target.classList.contains(this.modalClass)) {
                    this._hideModal(modal);
                }
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    _openModal(event) {
        const target = event.currentTarget;

        if (!target.hasAttribute(this.modalAttr)) return;

        event.preventDefault();
        const modalId = target.getAttribute(this.modalAttr);

        this.openModal(modalId);
    }

    _closeModal(event) {
        event.preventDefault();
        const modal = event.currentTarget.closest(`.${this.modalClass}`);
        if (modal) {
            this._hideModal(modal);
        }
    }

    _hideModal(modal) {
        modal.classList.remove(this.activeClass);
        document.body.classList.remove('modal-open');
    }

    closeAllModals() {
        document.querySelectorAll(`.${this.modalClass}.${this.activeClass}`).forEach(modal => {
            this._hideModal(modal);
        });
    }

    openModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add(this.activeClass);
            document.body.classList.add('modal-open');
        }
    }
}
