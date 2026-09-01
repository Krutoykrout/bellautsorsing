const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
};

const BASE_URI = {
    ruspetrol: 'https://lk.ruspetrol.ru/',
    toplivnayakarta: 'https://lk.toplivnaya-karta.ru/',
    toplivnyekarty: 'https://lk.toplivnye-karty.ru/',
};

class ApiClient {
    constructor(serviceName = "ruspetrol", headers = {}) {
        this.serviceName = this.#normalizeServiceName(serviceName);
        this.baseUrl = this.#getServiceUrl(this.serviceName);
        this.headers = { ...DEFAULT_HEADERS, ...headers };
        this.debug = true;
    }

    // Приватные методы
    #normalizeServiceName(name) {
        return String(name).trim().toLowerCase() || 'ruspetrol';
    }

    #getServiceUrl(serviceName) {
        if (!BASE_URI[serviceName]) {
            throw new Error(`Unknown service "${serviceName}"`);
        }
        return BASE_URI[serviceName];
    }

    #setCookie(name, value, minutes) {
        const date = new Date();
        date.setTime(date.getTime() + minutes * 60 * 1000);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    #getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Публичные методы
    async getUser() {
        try {
            const response = await this.request('GET', 'api/getUser');
            return response.success ? response.data : false;
        } catch (error) {
            console.error('getUser error:', error);
            return false;
        }
    }

    async authorize(login, password) {
        try {
            const response = await this.request('GET', 'api/authorize', {
                login,
                password
            });

            if (response.success) {
                window.location.href = this.baseUrl;
            }

            return response;
        } catch (error) {
            console.error('Authorization error:', error);
            throw error;
        }
    }

    async mobileAuth(domain, phone) {
        const validatedPhone = this.#validatePhoneNumber(phone);
        console.log('validatePhoneNumber',validatedPhone);
        if (!validatedPhone) {
            throw new Error('Неверный формат номера телефона');
            //return { success: false, error: 'Неверный формат номера телефона' };
        }
        phone = validatedPhone;
        const cookieName = `auth_phone_${phone}`;
        const existingCookie = this.#getCookie(cookieName);

        if (existingCookie) {
            throw new Error('Повторный запрос возможен только через 5 минут');
        }

        try {
            // Устанавливаем куку на 5 минут
            this.#setCookie(cookieName, 'pending', 5);

            const response = await this.request('GET', 'api/getauthorizationcode', {
                domain,
                phoneNumber: phone
            });
            console.log('phone response',response);
            if (response.success) {
                window.location.href = `${this.baseUrl}Identity/LoginConfirmation?form-type=auth-phone&phoneNumber=${phone}`;
            }

            return response;
        } catch (error) {
            console.error('Mobile auth error:', error);
            throw error;
        }
    }

    async request(method, endpoint, params = {}, data = null) {
        let url = this.#buildUrl(endpoint);

        if (params) {
            const query = Object.keys(params)
                .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                .join('&');
            url += `?${query}`;
        }

        const config = {
            method,
            headers: this.headers,
            credentials: 'include'
        };

        if (method === "POST" && data) {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const result = await this.#parseResponse(response);
            return { success: true, data: result };

        } catch (error) {
            console.error('Request failed:', error);
            return { success: false, error: error.message };
        }
    }

    #buildUrl(endpoint) {
        return `${this.baseUrl}/${endpoint}`.replace(/([^:]\/)\/+/g, '$1');
    }

    async #parseResponse(response) {
        const contentType = response.headers.get('content-type');
        return contentType?.includes('application/json')
            ? response.json()
            : response.text();
    }

    #validatePhoneNumber(phone) {
        // Удаляем все символы, кроме цифр
        const cleanedPhone = phone.replace(/\D/g, '');

        // Проверяем длину номера (для России обычно 11 цифр, включая код страны 7)
        if (cleanedPhone.length === 11) {
            return cleanedPhone;
        } else if (cleanedPhone.length === 10) {
            // Если номер без кода страны (начинается с 9), добавляем 7
            if (/^9/.test(cleanedPhone)) {
                return '7' + cleanedPhone;
            }
        }

        return false; // Некорректная длина
    }

}