// Переключение между секциями (прокрутка к нужной секции)
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Убираем активный класс у всех пунктов меню
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });

        // Добавляем активный класс к выбранному пункту
        item.classList.add('active');

        // Получаем секцию для прокрутки
        const sectionName = item.getAttribute('data-section');
        const sectionId = sectionName + '-section';

        // Прокручиваем к выбранной секции
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const contentArea = document.querySelector('.content-area');
            const offsetTop = targetSection.offsetTop - 24; // Учитываем padding контент-области

            contentArea.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Обработка кнопки выхода
document.querySelectorAll('.icon-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const icon = button.textContent;
        if (icon === '🚪') {
            if (confirm('Вы действительно хотите выйти?')) {
                window.location.href = 'index.html';
                localStorage.removeItem("uname")
                localStorage.removeItem("password")
            }
        } else if (icon === '🌙') {
            // Переключение темы (можно добавить позже)
            console.log('Переключение темы');
        }
    });
});

// Обработка кнопок открытия счета/продукта
document.querySelectorAll('.text-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const text = button.textContent.trim();
        if (text.includes('Открыть счет')) {
            const modal = document.getElementById('openAccountModal');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } else if (text.includes('Открыть продукт')) {
            const modal = document.getElementById('openProductModal');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Закрытие модального окна открытия счета
const closeAccountModal = document.getElementById('closeAccountModal');
const accountModal = document.getElementById('openAccountModal');
if (closeAccountModal && accountModal) {
    closeAccountModal.addEventListener('click', () => {
        accountModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Закрытие при клике вне модального окна
    accountModal.addEventListener('click', (e) => {
        if (e.target === accountModal) {
            accountModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Закрытие модального окна открытия продукта
const closeProductModal = document.getElementById('closeProductModal');
const productModal = document.getElementById('openProductModal');
if (closeProductModal && productModal) {
    closeProductModal.addEventListener('click', () => {
        productModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Закрытие при клике вне модального окна
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Обработка формы открытия счета
const accountForm = document.getElementById('accountForm');
if (accountForm) {
    accountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const accountType = document.getElementById('accountType').value;
        const initialBalance = document.getElementById('initialBalance').value;

        // Визуальная обратная связь
        const button = accountForm.querySelector('.modal-button');
        const originalText = button.textContent;
        button.textContent = 'Создание...';
        button.disabled = true;

        // Здесь должна быть логика создания счета
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            alert(`Счет "${accountType}" успешно создан`);
            accountModal.style.display = 'none';
            document.body.style.overflow = '';
            accountForm.reset();
            document.getElementById('initialBalance').value = '0';
        }, 1500);
    });
}

// Обработка формы открытия продукта
const productForm = document.getElementById('productForm');
if (productForm) {
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productType = document.getElementById('productType').value;
        const productAmount = document.getElementById('productAmount').value;

        // Визуальная обратная связь
        const button = productForm.querySelector('.modal-button');
        const originalText = button.textContent;
        button.textContent = 'Создание...';
        button.disabled = true;

        // Здесь должна быть логика создания продукта
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            alert(`Продукт "${productType}" успешно создан`);
            productModal.style.display = 'none';
            document.body.style.overflow = '';
            productForm.reset();
            document.getElementById('productAmount').value = '0';
        }, 1500);
    });
}

// Обработка формы переводов
const transferForm = document.querySelector('.transfer-form');
if (transferForm) {
    transferForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fromAccount = document.getElementById('fromAccount').value;
        const toAccount = document.getElementById('toAccount').value;
        const amount = document.getElementById('amount').value;

        if (!fromAccount || !toAccount || !amount || parseFloat(amount) <= 0) {
            alert('Пожалуйста, заполните все поля корректно');
            return;
        }

        // Визуальная обратная связь
        const button = transferForm.querySelector('.transfer-button');
        const originalText = button.textContent;
        button.textContent = 'Перевод...';
        button.disabled = true;

        // Здесь должна быть логика отправки перевода на сервер
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            alert(`Перевод ${amount} Р выполнен успешно`);
            transferForm.reset();
            document.getElementById('amount').value = '1000';
        }, 1500);
    });
}

// Обработка кнопок закрытия счетов
document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const accountCard = button.closest('.account-card');
        const accountTitle = accountCard.querySelector('.account-title').textContent;
        if (confirm(`Вы действительно хотите закрыть счет "${accountTitle}"?`)) {
            // Здесь должна быть логика закрытия счета
            console.log('Закрытие счета:', accountTitle);
        }
    });
});

async function auth(uname, passw) {
    let vauth = await doHTTP(VBANK+"auth/bank-token", {}, {}, {"client_id": "team211", "client_secret": passw})
    let aauth = await doHTTP(ABANK+"auth/bank-token", {}, {}, {"client_id": "team211", "client_secret": passw})
    if ("access_token" in vauth && "access_token" in aauth) {
        VTOKEN = "Bearer " + vauth["access_token"]
        ATOKEN = "Bearer " + aauth["access_token"]
        let vconsent = localStorage.getItem("vconsent")
        let aconsent = localStorage.getItem("aconsent")
        if (vconsent == null || aconsent == null) {
            await getConsent(uname, passw)
        } else {
            VBANK_CONSENT_ID = vconsent
            ABANK_CONSENT_ID = aconsent
            USERNAME = uname
            localStorage.setItem("uname", uname)
            localStorage.setItem("password", passw)
        }
    }
    else
        return window.location.href = "/index.html"
}

async function getConsent(uname, passw) {
    let vconsent = await doHTTP(VBANK+"account-consents/request", {"Authorization": VTOKEN, "X-Requesting-Bank": "team211"}, {"client_id": uname, "permissions": ["ReadAccountsDetail", "ReadBalances", "ReadTransactionsDetail"], "reason": "", "requesting_bank": "team211", "requesting_bank_name": "team211"}, {})
    let aconsent = await doHTTP(ABANK+"account-consents/request", {"Authorization": VTOKEN, "X-Requesting-Bank": "team211"}, {"client_id": uname, "permissions": ["ReadAccountsDetail", "ReadBalances", "ReadTransactionsDetail"], "reason": "...", "requesting_bank": "team211", "requesting_bank_name": "Team 211 App"}, {})
    if ("detail" in vconsent && "detail" in aconsent) {
        return window.location.href = "/index.html"
    }
    VBANK_CONSENT_ID = vconsent["consent_id"]
    ABANK_CONSENT_ID = aconsent["consent_id"]
    USERNAME = uname
    localStorage.setItem("vconsent", VBANK_CONSENT_ID)
    localStorage.setItem("aconsent", ABANK_CONSENT_ID)
    localStorage.setItem("uname", uname)
    localStorage.setItem("password", passw)
    window.location.href = "/dashboard.html"
}

window.onload = async function() {
    if (localStorage.getItem("uname") == null || localStorage.getItem("password") == null) {
        return window.location.href = "/index.html"
    }
    if (VTOKEN in [null, undefined] || ATOKEN in [null, undefined]) {
        await auth(localStorage.getItem("uname"), localStorage.getItem("password"))
    }
    USERNAME = localStorage.getItem("uname")
    VBANK_CONSENT_ID = localStorage.getItem("vconsent")
    ABANK_CONSENT_ID = localStorage.getItem("aconsent")
    let vaccounts = await doHTTP(VBANK+"accounts", {"Authorization": VTOKEN, "X-Requesting-Bank": "team211", "X-Consent-Id": VBANK_CONSENT_ID}, null, {"client_id": USERNAME})
    let aaccounts = await doHTTP(ABANK+"accounts", {"Authorization": VTOKEN, "X-Requesting-Bank": "team211", "X-Consent-Id": ABANK_CONSENT_ID}, null, {"client_id": USERNAME})
    console.log(vaccounts)

}