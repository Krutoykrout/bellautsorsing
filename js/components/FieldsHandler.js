class FieldsHandler {
    constructor() {
        this._bindEvents();
    }
    _bindEvents() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => this._phoneMask(e));
        });

        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => this._handleFile(e));
        });
    }

    _handleFile(e) {
        const target = e.currentTarget;
        const files = target.files;
        const container = target.closest('.form-field');
        const fileNameElement = container.querySelector('.js-filename');
        const maxLength = 30;

        if (files.length > 0) {
            let fileName = files.length === 1
                ? files[0].name
                : `${files.length} файлов выбрано`;

            if (fileName.length > maxLength) {
                fileName = fileName.substring(0, maxLength) + '...';
            }

            fileNameElement.textContent = fileName;
        } else {
            fileNameElement.textContent = 'Файл не выбран';
        }
    }

    _phoneMask(e) {
        const target = e.currentTarget;
        let value = target.value.replace(/\D/g, '');

        if (value.startsWith('7') || value.startsWith('8')) {
            value = value.slice(1);
        }

        let maskedValue = '+7 (';

        if (value.length > 0) {
            maskedValue += value.substring(0, 3);
        }
        if (value.length >= 4) {
            maskedValue += ') ' + value.substring(3, 6);
        }
        if (value.length >= 7) {
            maskedValue += '-' + value.substring(6, 8);
        }
        if (value.length >= 9) {
            maskedValue += '-' + value.substring(8, 10);
        }

        target.value = maskedValue;
    }
}
