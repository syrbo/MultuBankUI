let passw = localStorage.getItem("password")
let uname = localStorage.getItem("uname")
if (passw != null && uname != null) {
    auth(uname, passw)
}

async function getConsent(uname, passw) {
    let vconsent = await doHTTP(VBANK+"account-consents/request", {"Authorization": VTOKEN, "X-Requesting-Bank": "team211"}, {"client_id": uname, "permissions": ["ReadAccountsDetail", "ReadBalances", "ReadTransactionsDetail"], "reason": "", "requesting_bank": "team211", "requesting_bank_name": "team211"}, {})
    let aconsent = await doHTTP(ABANK+"account-consents/request", {"Authorization": VTOKEN, "X-Requesting-Bank": "team211"}, {"client_id": uname, "permissions": ["ReadAccountsDetail", "ReadBalances", "ReadTransactionsDetail"], "reason": "...", "requesting_bank": "team211", "requesting_bank_name": "Team 211 App"}, {})
    if ("detail" in vconsent && "detail" in aconsent) {
        return // TODO вывести ошибку неверный юзернейм
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
            
            window.location.href = "/dashboard.html"
        }
    }
    else
        console.log("no")
        // TODO сделать вывод ошибки юзеру если пароль неправильный
}

// Переключение видимости пароля
function setupPasswordToggle(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);

    if (toggle && input) {
        toggle.addEventListener('click', () => {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);

            const eyeIcon = toggle.querySelector('.eye-icon');
            if (type === 'text') {
                eyeIcon.style.filter = 'none';
                eyeIcon.style.opacity = '1';
            } else {
                eyeIcon.style.filter = 'grayscale(100%)';
                eyeIcon.style.opacity = '0.6';
            }
        });
    }
}

// Настройка переключателя пароля
setupPasswordToggle('loginPasswordToggle', 'loginPassword');

// Обработка отправки формы авторизации
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const login = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Здесь должна быть логика отправки данных на сервер
    console.log('Авторизация:', { login, password });

    // Визуальная обратная связь
    const button = e.target.querySelector('.button-primary');
    const originalText = button.querySelector('.button-text').textContent;
    button.querySelector('.button-text').textContent = 'Вход...';
    button.disabled = true;

    auth(login, password)

    // setTimeout(() => {
    //     button.querySelector('.button-text').textContent = originalText;
    //     button.disabled = false;
    //     // Переход на главную страницу после авторизации
    //     window.location.href = 'dashboard.html';
    // }, 1500);
});

// Плавная анимация появления полей при фокусе
document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});