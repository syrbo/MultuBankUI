
// Переключение между секциями (показ/скрытие секций)
document.querySelectorAll('.nav-item').forEach(async item => {
    item.addEventListener('click', async (e) => {
        e.preventDefault();

        // Убираем активный класс у всех пунктов меню
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });

        // Добавляем активный класс к выбранному пункту
        item.classList.add('active');

        // Получаем секцию для показа
        const sectionName = item.getAttribute('data-section');
        const sectionId = sectionName + '-section';

        // Скрываем все секции
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });

        // Показываем выбранную секцию
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';

            // Если это секция истории, инициализируем диаграммы
            if (sectionName === 'history') {
                await initializeHistoryCharts();
            }
        } else if (sectionName === 'home') {
            // Показываем главную секцию (счета и продукты)
            document.getElementById('accounts-section').style.display = 'block';
            document.getElementById('products-section').style.display = 'block';
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
    console.log("auth")
    let vauth = await doHTTP(VBANK + "auth/bank-token", {}, {}, { "client_id": "team211", "client_secret": passw })
    let aauth = await doHTTP(ABANK + "auth/bank-token", {}, {}, { "client_id": "team211", "client_secret": passw })
    let sauth = await doHTTP(SBANK+  "auth/bank-token", {}, {}, { "client_id": "team211", "client_secret": passw })
    if ("access_token" in vauth && "access_token" in aauth && "access_token" in sauth) {
        VTOKEN = "Bearer " + vauth["access_token"]
        ATOKEN = "Bearer " + aauth["access_token"]
        STOKEN = "Bearer " + sauth["access_token"]
        let vconsent = localStorage.getItem("vconsent")
        let aconsent = localStorage.getItem("aconsent")
        let sconsent = localStorage.getItem("sconsent")
        if (sconsent == null) {
            sconsent = await doHTTP(SBANK+"account-consents/request", {"Authorization": STOKEN, "X-Requesting-Bank": "team211"}, {"client_id": uname, "permissions": ["ReadAccountsDetail", "ReadBalances", "ReadTransactionsDetail"], "reason": "", "requesting_bank": "team211", "requesting_bank_name": "team211"}, {})
            console.log(sconsent)
            SBANK_CONSENT_ID = sconsent['request_id']
        } else SBANK_CONSENT_ID = sconsent
        localStorage.setItem("sconsent", SBANK_CONSENT_ID)
        let check = await doHTTP(SBANK+"account-consents/"+SBANK_CONSENT_ID, {"Authorization": STOKEN, "X-Requesting-Bank": "team211"}, null, {})
        if (SBANK_CONSENT_ID.search("req") != -1) {
           
            console.log(check['data']["status"])
            if (check['data']['status'] == "Authorized") {
                
                SBANK_CONSENT_ID = check['data']['consentId']
                localStorage.setItem("sconsent", SBANK_CONSENT_ID)
            } else
                alert("Подтвердите доступ к Smart Bank через его приложение")
        }
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
    let vconsent = await doHTTP(VBANK + "account-consents/request", { "Authorization": VTOKEN, "X-Requesting-Bank": "team211" }, { "client_id": uname, "permissions": ["ReadAccountsDetail", "ReadBalances", "ReadTransactionsDetail"], "reason": "", "requesting_bank": "team211", "requesting_bank_name": "team211" }, {})
    let aconsent = await doHTTP(ABANK + "account-consents/request", { "Authorization": ATOKEN, "X-Requesting-Bank": "team211" }, { "client_id": uname, "permissions": ["ReadAccountsDetail", "ReadBalances", "ReadTransactionsDetail"], "reason": "...", "requesting_bank": "team211", "requesting_bank_name": "Team 211 App" }, {})
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

async function getProductConsents() {
    if (VBANK_PCONSENT_ID == "" || VBANK_PCONSENT_ID == null) {
        let vconsent = await doHTTP(VBANK+"product-agreement-consents/request", {"Authorization": VTOKEN}, {"requesting_bank": "team211","client_id": USERNAME,"read_product_agreements": true,"open_product_agreements": true,"close_product_agreements": false,"allowed_product_types": ["deposit", "card"],"max_amount": 9999999999.99,}, {"client_id": USERNAME})
        console.log(vconsent)
        VBANK_PCONSENT_ID = vconsent['consent_id']
        localStorage.setItem("vpconsent", VBANK_PCONSENT_ID)
    }
    if (ABANK_PCONSENT_ID == "" || ABANK_PCONSENT_ID == null) {
        let aconsent = await doHTTP(ABANK+"product-agreement-consents/request", {"Authorization": ATOKEN}, {"requesting_bank": "team211","client_id": USERNAME,"read_product_agreements": true,"open_product_agreements": true,"close_product_agreements": false,"allowed_product_types": ["deposit", "card"],"max_amount": 9999999999.99,}, {"client_id": USERNAME})
        ABANK_PCONSENT_ID = aconsent['consent_id']
        localStorage.setItem("apconsent", ABANK_PCONSENT_ID)
    }
    if (SBANK_CONSENT_ID.search("consent") != -1) {
        if (SBANK_PCONSENT_ID == "" || SBANK_PCONSENT_ID == null) {
            let sconsent = await doHTTP(SBANK+"product-agreement-consents/request", {"Authorization": STOKEN}, {"requesting_bank": "team211","client_id": USERNAME,"read_product_agreements": true,"open_product_agreements": true,"close_product_agreements": false,"allowed_product_types": ["deposit", "card"],"max_amount": 9999999999.99,}, {"client_id": USERNAME})
            SBANK_PCONSENT_ID = sconsent['consent_id']
            localStorage.setItem("spconsent", SBANK_PCONSENT_ID)
        } 
    }
}

window.onload = async function () {
    if (localStorage.getItem("uname") == null || localStorage.getItem("password") == null) {
        return window.location.href = "/index.html"
    }
    if (VTOKEN == "" || ATOKEN == "" || STOKEN == "") {
        await auth(localStorage.getItem("uname"), localStorage.getItem("password"))
    }
    USERNAME = localStorage.getItem("uname")
    VBANK_CONSENT_ID  = localStorage.getItem("vconsent")
    ABANK_CONSENT_ID  = localStorage.getItem("aconsent")
    SBANK_CONSENT_ID  = localStorage.getItem("sconsent")
    VBANK_PCONSENT_ID = localStorage.getItem("vpconsent")
    ABANK_PCONSENT_ID = localStorage.getItem("apconsent")
    SBANK_PCONSENT_ID = localStorage.getItem("spconsent")
    IS_PREMIUM        = localStorage.getItem("premium")
    if (IS_PREMIUM == null) IS_PREMIUM = false
    let check = await doHTTP(SBANK+"account-consents/"+SBANK_CONSENT_ID, {"Authorization": STOKEN, "X-Requesting-Bank": "team211"}, null, {})
    if ("detail" in check) {
        localStorage.removeItem("sconsent")
        SBANK_CONSENT_ID = ""
        sconsent = await doHTTP(SBANK+"account-consents/request", {"Authorization": STOKEN, "X-Requesting-Bank": "team211"}, {"client_id": USERNAME, "permissions": ["ReadAccountsDetail", "ReadBalances", "ReadTransactionsDetail"], "reason": "", "requesting_bank": "team211", "requesting_bank_name": "team211"}, {})
        SBANK_CONSENT_ID = sconsent['request_id']
        alert("Подтвердите доступ к Smart Bank через его приложение")
    } else {
        if (check['data']['status'] == 'Revoked') {
        localStorage.removeItem("sconsent")
        SBANK_CONSENT_ID = ""
        sconsent = await doHTTP(SBANK+"account-consents/request", {"Authorization": STOKEN, "X-Requesting-Bank": "team211"}, {"client_id": USERNAME, "permissions": ["ReadAccountsDetail", "ReadBalances", "ReadTransactionsDetail"], "reason": "", "requesting_bank": "team211", "requesting_bank_name": "team211"}, {})
        SBANK_CONSENT_ID = sconsent['request_id']
        alert("Подтвердите доступ к Smart Bank через его приложение")
    }
    }
    
    document.getElementById("greeting").innerHTML = "Добрый день, " + USERNAME
    getProductConsents()
    
    let vaccounts = await doHTTP(VBANK + "accounts", { "Authorization": VTOKEN, "X-Requesting-Bank": "team211", "X-Consent-Id": VBANK_CONSENT_ID }, null, { "client_id": USERNAME })
    let aaccounts = await doHTTP(ABANK + "accounts", { "Authorization": VTOKEN, "X-Requesting-Bank": "team211", "X-Consent-Id": ABANK_CONSENT_ID }, null, { "client_id": USERNAME })
    if (SBANK_CONSENT_ID.search("consent") != -1) {
        let saccounts = await doHTTP(SBANK + "accounts", { "Authorization": STOKEN, "X-Requesting-Bank": "team211", "X-Consent-Id": SBANK_CONSENT_ID }, null, { "client_id": USERNAME })
        if (!("detail" in saccounts)) {
            saccounts = saccounts["data"]["account"]
            const sbankPromises = saccounts.map(async (acc) => {
                let balance = await doHTTP(SBANK + "accounts/" + acc["accountId"] + "/balances", { "Authorization": STOKEN, "X-Requesting-Bank": "team211", "X-Consent-Id": SBANK_CONSENT_ID }, null, { "client_id": USERNAME })
                console.log(balance)
                balance = parseFloat(balance['data']['balance'][0]['amount']['amount'])
                ACCOUNTS['sbank']['total_balance'] += balance
                ACCOUNTS['sbank']['accounts'][acc.accountId] = { acc: acc['accountId'], balance: balance, accId: acc['account'][0]['identification'], type: (acc['accountSubType'] == 'Checking' ? 'Расчётный' : 'Накопительный') }
                //ACCOUNTS['sbank']["accounts"].push({ acc: acc['accountId'], balance: balance, accId: acc['account'][0]['identification'], type: (acc['accountSubType'] == 'Checking' ? 'Расчётный' : 'Накопительный') })
            })
            await Promise.all(sbankPromises)
        }
    }
    if (!("detail" in vaccounts)) {
        vaccounts = vaccounts["data"]["account"]
        const vbankPromises = vaccounts.map(async (acc) => {
            let balance = await doHTTP(VBANK + "accounts/" + acc["accountId"] + "/balances", { "Authorization": VTOKEN, "X-Requesting-Bank": "team211", "X-Consent-Id": VBANK_CONSENT_ID }, null, { "client_id": USERNAME })
            balance = parseFloat(balance['data']['balance'][0]['amount']['amount'])
            ACCOUNTS['vbank']['total_balance'] += balance
            ACCOUNTS['vbank']['accounts'][acc.accountId] = { acc: acc['accountId'], balance: balance, accId: acc['account'][0]['identification'], type: (acc['accountSubType'] == 'Checking' ? 'Расчётный' : 'Накопительный') }
            //ACCOUNTS['vbank']["accounts"].push({ acc: acc['accountId'], balance: balance, accId: acc['account'][0]['identification'], type: (acc['accountSubType'] == 'Checking' ? 'Расчётный' : 'Накопительный') })
        })
        await Promise.all(vbankPromises)
    }
    if (!("detail" in aaccounts)) {
        aaccounts = aaccounts["data"]["account"]
        const abankPromises = aaccounts.map(async (acc) => {
            let balance = await doHTTP(ABANK + "accounts/" + acc["accountId"] + "/balances", { "Authorization": ATOKEN, "X-Requesting-Bank": "team211", "X-Consent-Id": ABANK_CONSENT_ID }, null, { "client_id": USERNAME })
            balance = parseFloat(balance['data']['balance'][0]['amount']['amount'])
            ACCOUNTS['abank']['total_balance'] += balance
            ACCOUNTS['abank']['accounts'][acc.accountId] = { acc: acc['accountId'], balance: balance, accId: acc['account'][0]['identification'], type: (acc['accountSubType'] == 'Checking' ? 'Расчётный' : 'Накопительный') }
            //ACCOUNTS['abank']["accounts"].push({ acc: acc['accountId'], balance: balance, accId: acc['account'][0]['identification'], type: (acc['accountSubType'] == 'Checking' ? 'Расчётный' : 'Накопительный') })
        })
        await Promise.all(abankPromises)
    }
    await getTransactions()
    console.log(ACCOUNTS)
    console.log(ACCOUNTS['abank']['total_balance'] + ACCOUNTS['vbank']['total_balance'] + ACCOUNTS['sbank']['total_balance'])

    // Обновляем общий баланс
    const totalBalance = ACCOUNTS['abank']['total_balance'] + ACCOUNTS['vbank']['total_balance'] + ACCOUNTS['sbank']['total_balance']
    document.getElementById("totalBalance").textContent = totalBalance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₽'

    // Отрисовываем счета
    renderAccounts()

    // Отрисовываем продукты
    await getProducts()
    renderProducts()

    // Обновляем количество счетов
    const totalAccountsCount = Object.values(ACCOUNTS['vbank']['accounts']).length + Object.values(ACCOUNTS['abank']['accounts']).length + Object.values(ACCOUNTS['sbank']['accounts']).length
    document.getElementById("totalAccounts").textContent = totalAccountsCount

    // Обработчик клика для поиска
    document.querySelector('.search-container').addEventListener('click', () => {
        const searchText = prompt('Введите запрос для поиска:')
        if (searchText) {
            console.log('Поиск:', searchText)
            // Здесь можно добавить логику поиска
            alert('Поиск: ' + searchText)
        }
    })

    // Скрываем все секции кроме главной при загрузке
    document.querySelectorAll('.content-section').forEach(section => {
        if (section.id !== 'accounts-section' && section.id !== 'products-section') {
            section.style.display = 'none';
        }
    })
}

// Функция для отрисовки счетов
function renderAccounts() {
    const accountsContainer = document.getElementById('accountsContainer')
    accountsContainer.innerHTML = '' // Очищаем контейнер

    // Получаем все счета из всех банков
    let allAccounts = []

    Object.values(ACCOUNTS['vbank']['accounts']).forEach(acc => {
        allAccounts.push({ ...acc, bank: 'VBank' })
    })
    Object.values(ACCOUNTS['abank']['accounts']).forEach(acc => {
        allAccounts.push({ ...acc, bank: 'ABank' })
    })
    Object.values(ACCOUNTS['sbank']['accounts']).forEach(acc => {
        allAccounts.push({ ...acc, bank: 'SBank' })
    })

    // Создаем div для каждого счета
    allAccounts.forEach((account, index) => {
        const accountDiv = document.createElement('div')
        accountDiv.className = 'account-item'
        // Форматируем номер счета с пробелами
        const displayAccountNumber = (account.accId || account.acc || '').toString()
        accountDiv.innerHTML = `
            <div class="account-header">
                <div class="account-bank">${account.bank}</div>
                <div class="account-type">${account.type} счет</div>
            </div>
            <div class="account-info">
                <div class="account-id-label">Номер счета</div>
                <div class="account-id-wrapper">
                    <div class="account-id">${displayAccountNumber}</div>
                    <button class="copy-account-btn" data-account="${displayAccountNumber}" title="Скопировать номер счета">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6667 10.6667H13.3333C13.7015 10.6667 14 10.3682 14 10V3.33333C14 2.96515 13.7015 2.66667 13.3333 2.66667H6.66667C6.29848 2.66667 6 2.96515 6 3.33333V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 6H4C3.44772 6 3 6.44772 3 7V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="account-balance-label">Баланс</div>
                <div class="account-balance">${account.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽</div>
            </div>
        `
        accountsContainer.appendChild(accountDiv)
    })

    // Если счетов нет, добавляем заглушки
    // if (allAccounts.length === 0) {
    //     // Заглушка 1
    //     const placeholder1 = document.createElement('div')
    //     placeholder1.className = 'account-item'
    //     placeholder1.innerHTML = `
    //         <div class="account-header">
    //             <div class="account-bank">VBank</div>
    //             <div class="account-type">Расчетный счет</div>
    //         </div>
    //         <div class="account-info">
    //             <div class="account-id-label">Номер счета</div>
    //             <div class="account-id-wrapper">
    //                 <div class="account-id">40817810099910004321</div>
    //                 <button class="copy-account-btn" data-account="40817810099910004321" title="Скопировать номер счета">
    //                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                         <path d="M10.6667 10.6667H13.3333C13.7015 10.6667 14 10.3682 14 10V3.33333C14 2.96515 13.7015 2.66667 13.3333 2.66667H6.66667C6.29848 2.66667 6 2.96515 6 3.33333V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    //                         <path d="M10 6H4C3.44772 6 3 6.44772 3 7V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    //                     </svg>
    //                 </button>
    //             </div>
    //             <div class="account-balance-label">Баланс</div>
    //             <div class="account-balance">50 000,00 Р</div>
    //         </div>
    //     `
    //     accountsContainer.appendChild(placeholder1)

    //     // Заглушка 2
    //     const placeholder2 = document.createElement('div')
    //     placeholder2.className = 'account-item'
    //     placeholder2.innerHTML = `
    //         <div class="account-header">
    //             <div class="account-bank">ABank</div>
    //             <div class="account-type">Накопительный счет</div>
    //         </div>
    //         <div class="account-info">
    //             <div class="account-id-label">Номер счета</div>
    //             <div class="account-id-wrapper">
    //                 <div class="account-id">40817810099910004322</div>
    //                 <button class="copy-account-btn" data-account="40817810099910004322" title="Скопировать номер счета">
    //                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                         <path d="M10.6667 10.6667H13.3333C13.7015 10.6667 14 10.3682 14 10V3.33333C14 2.96515 13.7015 2.66667 13.3333 2.66667H6.66667C6.29848 2.66667 6 2.96515 6 3.33333V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    //                         <path d="M10 6H4C3.44772 6 3 6.44772 3 7V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    //                     </svg>
    //                 </button>
    //             </div>
    //             <div class="account-balance-label">Баланс</div>
    //             <div class="account-balance">75 500,50 Р</div>
    //         </div>
    //     `
    //     accountsContainer.appendChild(placeholder2)
    // }

    // Добавляем обработчики для кнопок копирования (включая заглушки)
    document.querySelectorAll('.copy-account-btn').forEach(btn => {
        // Проверяем, не добавлен ли уже обработчик
        if (!btn.hasAttribute('data-listener')) {
            btn.setAttribute('data-listener', 'true');
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const accountNumber = btn.getAttribute('data-account');
                try {
                    await navigator.clipboard.writeText(accountNumber);
                    // Визуальная обратная связь
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    `;
                    btn.style.color = '#28a745';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.color = '';
                    }, 2000);
                } catch (err) {
                    console.error('Ошибка копирования:', err);
                    alert('Не удалось скопировать номер счета');
                }
            });
        }
    });
}

async function getProducts() {
    if (VBANK_PCONSENT_ID != null && VBANK_PCONSENT_ID != "") {
        let products = await doHTTP(VBANK+"product-agreements", {"Authorization": VTOKEN, "X-Product-Agreement-Consent-Id": VBANK_PCONSENT_ID, "X-Requesting-Bank": "team211"}, null, {"client_id": USERNAME})
        PRODUCTS['vbank'].push(...products['data'])
    }
    if (ABANK_PCONSENT_ID != null && ABANK_PCONSENT_ID != "") {
        let products = await doHTTP(ABANK+"product-agreements", {"Authorization": ATOKEN, "X-Product-Agreement-Consent-Id": ABANK_PCONSENT_ID, "X-Requesting-Bank": "team211"}, null, {"client_id": USERNAME})
        PRODUCTS['abank'].push(...products['data'])
    }
    if (SBANK_CONSENT_ID.search("consent") != -1) {
        if (SBANK_PCONSENT_ID != null && SBANK_PCONSENT_ID != "") {
            let products = await doHTTP(SBANK+"product-agreements", {"Authorization": STOKEN, "X-Product-Agreement-Consent-Id": SBANK_PCONSENT_ID, "X-Requesting-Bank": "team211"}, null, {"client_id": USERNAME})
            PRODUCTS['sbank'].push(...products['data'])
        }
    }

}

// Функция для отрисовки продуктов
function renderProducts() {
    const productsContainer = document.getElementById('productsContainer')
    productsContainer.innerHTML = '' // Очищаем контейнер
    PRODUCTS.vbank.forEach((elem, index) => {
        console.log(elem)
        let expDay = elem['end_date']
        if (expDay == null) expDay = "Бессрочен"
        let percent = ""
        if ("interestRate" in elem) {
            percent = elem['interestRate']
        }
        const placeholder1 = document.createElement('div')
        placeholder1.className = 'product-item'
        placeholder1.innerHTML = `
            <div class="product-header">
                <div class="product-name">VBank | ${elem['product_name']}</div>
                <div class="product-status">Активен</div>
            </div>
            <div class="product-info">
                <div class="product-detail-row">
                    <span class="product-detail-label">Сумма:</span>
                    <span class="product-detail-value">${elem['amount']} ₽</span>
                </div>
                <div class="product-detail-row">
                    <span class="product-detail-label">Срок:</span>
                    <span class="product-detail-value">${expDay}</span>
                </div>
        `
        if (percent != "") {
           placeholder1.innerHTML += `<div class="product-detail-row">
                        <span class="product-detail-label">Процентная ставка:</span>
                        <span class="product-detail-value">${percent}%</span>
                    </div>
            ` 
        }
        placeholder1.innerHTML += "</div>"
        productsContainer.appendChild(placeholder1)
    })
    PRODUCTS.abank.forEach((elem, index) => {
        console.log(elem)
        let expDay = elem['end_date']
        if (expDay == null) expDay = "Бессрочен"
        let percent = ""
        if ("interestRate" in elem) {
            percent = elem['interestRate']
        }
        const placeholder1 = document.createElement('div')
        placeholder1.className = 'product-item'
        placeholder1.innerHTML = `
            <div class="product-header">
                <div class="product-name">ABank | ${elem['product_name']}</div>
                <div class="product-status">Активен</div>
            </div>
            <div class="product-info">
                <div class="product-detail-row">
                    <span class="product-detail-label">Сумма:</span>
                    <span class="product-detail-value">${elem['amount']} ₽</span>
                </div>
                <div class="product-detail-row">
                    <span class="product-detail-label">Срок:</span>
                    <span class="product-detail-value">${expDay}</span>
                </div>
        `
        if (percent != "") {
           placeholder1.innerHTML += `<div class="product-detail-row">
                        <span class="product-detail-label">Процентная ставка:</span>
                        <span class="product-detail-value">${percent}%</span>
                    </div>
            ` 
        }
        placeholder1.innerHTML += "</div>"
        productsContainer.appendChild(placeholder1)
    })
    PRODUCTS.sbank.forEach((elem, index) => {
        console.log(elem)
        let expDay = elem['end_date']
        if (expDay == null) expDay = "Бессрочен"
        let percent = ""
        if ("interestRate" in elem) {
            percent = elem['interestRate']
        }
        const placeholder1 = document.createElement('div')
        placeholder1.className = 'product-item'
        placeholder1.innerHTML = `
            <div class="product-header">
                <div class="product-name">SBank | ${elem['product_name']}</div>
                <div class="product-status">Активен</div>
            </div>
            <div class="product-info">
                <div class="product-detail-row">
                    <span class="product-detail-label">Сумма:</span>
                    <span class="product-detail-value">${elem['amount']} ₽</span>
                </div>
                <div class="product-detail-row">
                    <span class="product-detail-label">Срок:</span>
                    <span class="product-detail-value">${expDay}</span>
                </div>
        `
        if (percent != "") {
           placeholder1.innerHTML += `<div class="product-detail-row">
                        <span class="product-detail-label">Процентная ставка:</span>
                        <span class="product-detail-value">${percent}%</span>
                    </div>
            ` 
        }
        placeholder1.innerHTML += "</div>"
        productsContainer.appendChild(placeholder1)
    })

    // Заглушки для продуктов
    // const placeholder1 = document.createElement('div')
    // placeholder1.className = 'product-item'
    // placeholder1.innerHTML = `
    //     <div class="product-header">
    //         <div class="product-name">Депозит "Накопительный"</div>
    //         <div class="product-status">Активен</div>
    //     </div>
    //     <div class="product-info">
    //         <div class="product-detail-row">
    //             <span class="product-detail-label">Сумма депозита:</span>
    //             <span class="product-detail-value">1 000 000,00 Р</span>
    //         </div>
    //         <div class="product-detail-row">
    //             <span class="product-detail-label">Срок:</span>
    //             <span class="product-detail-value">12 месяцев</span>
    //         </div>
    //         <div class="product-detail-row">
    //             <span class="product-detail-label">Процентная ставка:</span>
    //             <span class="product-detail-value">7,5% годовых</span>
    //         </div>
    //     </div>
    // `
    // productsContainer.appendChild(placeholder1)

    // const placeholder2 = document.createElement('div')
    // placeholder2.className = 'product-item'
    // placeholder2.innerHTML = `
    //     <div class="product-header">
    //         <div class="product-name">Кредитная карта "Премиум"</div>
    //         <div class="product-status">Активна</div>
    //     </div>
    //     <div class="product-info">
    //         <div class="product-detail-row">
    //             <span class="product-detail-label">Кредитный лимит:</span>
    //             <span class="product-detail-value">500 000,00 Р</span>
    //         </div>
    //         <div class="product-detail-row">
    //             <span class="product-detail-label">Использовано:</span>
    //             <span class="product-detail-value">125 000,00 Р</span>
    //         </div>
    //         <div class="product-detail-row">
    //             <span class="product-detail-label">Доступно:</span>
    //             <span class="product-detail-value">375 000,00 Р</span>
    //         </div>
    //     </div>
    // `
    // productsContainer.appendChild(placeholder2)
}

// Переменные для хранения экземпляров диаграмм
let incomeChart = null;
let expenseChart = null;

// Цвета для категорий
const chartColors = [
    '#dc3545', // красный
    '#fd7e14', // оранжевый
    '#ffc107', // желтый
    '#198754', // темно-зеленый
    '#0d6efd', // синий
    '#0dcaf0'  // светло-синий
];

function formatISOToDateTime(isoString) {
    // Создаем объект Date из строки ISO
    const date = new Date(isoString);
    
    // Проверяем, что дата валидна
    if (isNaN(date.getTime())) {
        return isoString
    }
    
    // Получаем компоненты даты
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Форматируем в нужный вид
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

async function getTransactions() {
    Object.values(ACCOUNTS['vbank']['accounts']).forEach(async (elem, index) => {
        let a = await doHTTP(VBANK+"accounts/"+elem['acc']+"/transactions", {"Authorization": VTOKEN, "X-Consent-Id": VBANK_CONSENT_ID, "X-Requesting-Bank": "team211"}, null, {"limit": 20})
        a = a.data.transaction
        a = a.map(function(elem) {
            elem["bank"] = "VBank"
            return elem
        })
        TRANSACTIONS['vbank'].push(...a)
    })
    Object.values(ACCOUNTS['abank']['accounts']).forEach(async (elem, index) => {
        let a = await doHTTP(ABANK+"accounts/"+elem['acc']+"/transactions", {"Authorization": ATOKEN, "X-Consent-Id": ABANK_CONSENT_ID, "X-Requesting-Bank": "team211"}, null, {"limit": 20})
        a = a.data.transaction
        a = a.map(function(elem) {
            elem["bank"] = "ABank"
            return elem
        })
        TRANSACTIONS['abank'].push(...a)
    })
    if (SBANK_CONSENT_ID.search("consent") != -1) {
        Object.values(ACCOUNTS['sbank']['accounts']).forEach(async (elem, index) => {
            let a = await doHTTP(SBANK+"accounts/"+elem['acc']+"/transactions", {"Authorization": STOKEN, "X-Consent-Id": SBANK_CONSENT_ID, "X-Requesting-Bank": "team211"}, null, {"limit": 20})
            a = a.data.transaction
            a = a.map(function(elem) {
            elem["bank"] = "SBank"
            return elem
        })
            TRANSACTIONS['sbank'].push(...a)
        })
    }
}

function fillTransactionTable(allTransactions) {
    allTransactions.sort((a,b) => new Date(b.bookingDateTime).getTime().toString().localeCompare(new Date(a.bookingDateTime).getTime().toString()))
    let container = document.getElementById("tableContainer")
    container.innerHTML = ""
    allTransactions.forEach((elem, i) => {
        let type = elem.bankTransactionCode.code
        let info = elem.transactionInformation
        console.log(ACCOUNTS[elem.bank.toLowerCase()])
        let accInfo = elem.bank + " " + ACCOUNTS[elem.bank.toLowerCase()]["accounts"][elem.accountId].accId + " | "
        let item = document.createElement("div")
        let p1 = document.createElement('p')
        p1.className = "transactionName"
        p1.innerHTML = accInfo + info
        let p2 = document.createElement('p')
        p2.className = "transactionAmount"
        if (type.search("Received") != -1) {
            p2.innerHTML = "+" + elem.amount.amount
        } else {
            p2.innerHTML = "-" + elem.amount.amount
        }
        let p3 = document.createElement("p")
        p3.className = "transactionName"
        p3.innerHTML = " " + formatISOToDateTime( elem.bookingDateTime )
        item.appendChild(p1)
        item.appendChild(p2)
        item.appendChild(p3)
        item.appendChild(document.createElement("hr"))
        container.appendChild(item)
    })
}

// Функция инициализации диаграмм истории
async function initializeHistoryCharts() {
    let allTransactions = [...TRANSACTIONS['vbank'], ...TRANSACTIONS['abank'], ...TRANSACTIONS['sbank']]
    fillTransactionTable(allTransactions)
    console.log(allTransactions)
    let incomes = {}
    let expenses = {}
    allTransactions.forEach((elem, i) => {
        let type = elem.bankTransactionCode.code
        let info = elem.transactionInformation
        if (info.search("Перевод") != -1) info = "Переводы"
        if (type.search("Received") != -1) {
            if (info in incomes) incomes[info] += parseFloat(elem.amount.amount)
            else incomes[info] = parseFloat(elem.amount.amount)
        } else {
            if (info in expenses) expenses[info] += parseFloat(elem.amount.amount)
            else expenses[info] = parseFloat(elem.amount.amount)
        }
    })
    // Данные для примера (можно заменить на реальные данные из API)
    const incomeData = {
        labels: Object.keys(incomes),
        values: Object.values(incomes),
        colors: chartColors
    };

    const expenseData = {
        labels: Object.keys(expenses),
        values: Object.values(expenses),
        colors: chartColors
    };

    // Создаем диаграмму доходов
    if (incomeChart) {
        incomeChart.destroy();
    }
    const incomeCtx = document.getElementById('incomeChart');
    if (incomeCtx) {
        incomeChart = new Chart(incomeCtx, {
            type: 'doughnut',
            data: {
                labels: incomeData.labels,
                datasets: [{
                    data: incomeData.values,
                    backgroundColor: incomeData.colors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                cutout: '60%'
            }
        });
        renderChartLegend('incomeLegend', incomeData);
    }

    // Создаем диаграмму расходов
    if (expenseChart) {
        expenseChart.destroy();
    }
    const expenseCtx = document.getElementById('expenseChart');
    if (expenseCtx) {
        expenseChart = new Chart(expenseCtx, {
            type: 'doughnut',
            data: {
                labels: expenseData.labels,
                datasets: [{
                    data: expenseData.values,
                    backgroundColor: expenseData.colors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                cutout: '60%'
            }
        });
        renderChartLegend('expenseLegend', expenseData);
    }
}

// Функция отрисовки легенды диаграммы
function renderChartLegend(legendId, data) {
    const legendContainer = document.getElementById(legendId);
    if (!legendContainer) return;

    const total = data.values.reduce((sum, val) => sum + val, 0);

    legendContainer.innerHTML = '';

    data.labels.forEach((label, index) => {
        const value = data.values[index];
        const percentage = ((value / total) * 100).toFixed(1);
        const color = data.colors[index];
        const barWidth = Math.min((value / total * 100) * 2, 200);

        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';

        legendItem.innerHTML = `
            <div class="legend-color" style="background-color: ${color}"></div>
            <div class="legend-bar" style="background: linear-gradient(90deg, ${color}40 0%, ${color}20 100%); width: ${barWidth}px;"></div>
            <span class="legend-label">${label}</span>
            <span class="legend-value">${value.toLocaleString('ru-RU')} Р (${percentage}%)</span>
        `;

        legendContainer.appendChild(legendItem);
    });
}

// Функция обновления диаграмм на основе реальных данных
function updateHistoryCharts(transactions) {
    // Группируем транзакции по типам и категориям
    const incomeCategories = {};
    const expenseCategories = {};

    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            // Доход
            const category = transaction.category || 'Прочее';
            incomeCategories[category] = (incomeCategories[category] || 0) + transaction.amount;
        } else {
            // Расход
            const category = transaction.category || 'Прочее';
            expenseCategories[category] = (expenseCategories[category] || 0) + Math.abs(transaction.amount);
        }
    });

    // Формируем данные для доходов
    const incomeLabels = Object.keys(incomeCategories);
    const incomeValues = Object.values(incomeCategories);

    // Формируем данные для расходов
    const expenseLabels = Object.keys(expenseCategories);
    const expenseValues = Object.values(expenseCategories);

    // Обновляем диаграммы
    if (incomeChart && incomeLabels.length > 0) {
        incomeChart.data.labels = incomeLabels;
        incomeChart.data.datasets[0].data = incomeValues;
        incomeChart.data.datasets[0].backgroundColor = chartColors.slice(0, incomeLabels.length);
        incomeChart.update();

        renderChartLegend('incomeLegend', {
            labels: incomeLabels,
            values: incomeValues,
            colors: chartColors.slice(0, incomeLabels.length)
        });
    }

    if (expenseChart && expenseLabels.length > 0) {
        expenseChart.data.labels = expenseLabels;
        expenseChart.data.datasets[0].data = expenseValues;
        expenseChart.data.datasets[0].backgroundColor = chartColors.slice(0, expenseLabels.length);
        expenseChart.update();

        renderChartLegend('expenseLegend', {
            labels: expenseLabels,
            values: expenseValues,
            colors: chartColors.slice(0, expenseLabels.length)
        });
    }
}
