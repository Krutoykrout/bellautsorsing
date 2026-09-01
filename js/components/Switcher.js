class Switcher {
    constructor(switcherClass) {
        this.switcher = document.querySelector(`.${switcherClass}`);

        if(this.switcher !== null) {
            this.switcherItems = this.switcher.querySelectorAll('[data-switcher-content]');
            this.switcherContents = this.switcher.querySelectorAll('[data-switcher-content-id]');
        }

        this.init();
    }

    init() {
        this._bindEvents();
    }

    _bindEvents() {
        this.switcherItems.forEach(item => {
            item.addEventListener('click', this._onItemClick.bind(this));
        })
    }

    _onItemClick(e) {
        const target = e.currentTarget;
        const contentId = target.dataset.switcherContent;

        this._setActiveItem(target);
        this._setActiveContent(contentId);
    }

    _setActiveItem(activeItem) {
        this.switcherItems.forEach(item => {
            item.classList.toggle('active', item === activeItem);
        });
    }

    _setActiveContent(activeId) {
        this.switcherContents.forEach(content => {
            const isActive = content.dataset.switcherContentId === activeId;
            content.classList.toggle('active', isActive);
        });
    }
}