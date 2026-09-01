class FormHandler {
    constructor(form) {
        this.successModalId = 'form-success';
        this.endpoint = '/form-submit.php';
        this.method = 'POST'
        this.form = form;

        if (this.form) {
            this._bindEvents();
        } else {
            console.warn(`Форма с ID "${this.data.FORM_ID}" не найдена.`);
        }
    }
    _bindEvents() {
        // window.addEventListener('load', () => {
        //     this.smartCaptchaId = SmartCaptchaEx.addSmartCaptcha(this);
        // })
        this.form.addEventListener('submit', (e) => this._handleForm(e));
    }
    _handleForm(e) {
        e.preventDefault();
        this.submitForm()
    }

    async submitForm()
    {
        const hasErrors = this._validateForm();

        if (hasErrors) {
            return;
        }

        try {
            const formData = new FormData(this.form);

            if (this.data) {
                Object.keys(this.data).forEach(key => {
                    formData.append(key, this.data[key]);
                });
            }

            const response = await fetch(this.endpoint, {
                method: this.method,
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.status === 'success' || result.success) {
                this._handleResponse(result);
            } else {
                alert('Ошибка отправки формы');
            }

        } catch (error) {
            console.error('Ошибка отправки формы:', error);
            this._showError('Произошла ошибка при отправке формы');
        } finally {
            // this.preloader.remove(this.form);
        }
    }
    _handleResponse()
    {
        const successModal = document.querySelector(`#${this.successModalId}`);
        ModalObject.closeAllModals();

        if(successModal != null) {
            ModalObject.openModal(this.successModalId);
        }

    }
    _showError(error) {
        const errorContainer = this.form.querySelector('.form-errors');
        errorContainer.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = error;
        errorContainer.appendChild(p);
    }
    _validateForm() {
        this._clearErrors();

        let hasError = false;
        const fields = this.form.querySelectorAll('input, textarea, select');

        fields.forEach(field => {
            const container = field.closest('.form-field');
            const type = field.type;
            const value = field.value.trim();
            const isRequired = field.dataset.required !== undefined;

            if(container !== null) {
                if (isRequired) {
                    if ((type === 'checkbox' || type === 'radio') && !field.checked) {
                        field.closest('.form-field').classList.add('error');
                        hasError = true;
                    } else if ((type !== 'checkbox' && type !== 'radio') && !value) {
                        field.closest('.form-field').classList.add('error');
                        hasError = true;
                    }
                }

                if (type === 'tel') {
                    const isEmpty = !value || value.trim().length === 0;
                    const isInvalidEmail = value && !/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/.test(value.trim());

                    if (isEmpty || isInvalidEmail) {
                        field.closest('.form-field').classList.add('error');
                        hasError = true;
                    }
                }
            }

        });

        return hasError;
    }
    _clearErrors() {
        const fields = this.form.querySelectorAll('.error');
        fields.forEach(field => field.classList.remove('error'));
    }
}
