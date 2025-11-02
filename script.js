// Переключение между формами авторизации и регистрации
const loginCard = document.getElementById('loginCard');
const registerCard = document.getElementById('registerCard');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');

switchToRegister.addEventListener('click', () => {
    loginCard.style.display = 'none';
    registerCard.style.display = 'block';
    registerCard.style.animation = 'fadeIn 0.3s ease-in-out';
});

switchToLogin.addEventListener('click', () => {
    registerCard.style.display = 'none';
    loginCard.style.display = 'block';
    loginCard.style.animation = 'fadeIn 0.3s ease-in-out';
});

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

// Настройка всех переключателей пароля
setupPasswordToggle('loginPasswordToggle', 'loginPassword');
setupPasswordToggle('registerPasswordToggle', 'registerPassword');
setupPasswordToggle('registerPasswordConfirmToggle', 'registerPasswordConfirm');

// Обработка отправки формы авторизации
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Здесь должна быть логика отправки данных на сервер
    console.log('Авторизация:', { email, password });

    // Визуальная обратная связь
    const button = e.target.querySelector('.button-primary');
    const originalText = button.querySelector('.button-text').textContent;
    button.querySelector('.button-text').textContent = 'Вход...';
    button.disabled = true;

    setTimeout(() => {
        button.querySelector('.button-text').textContent = originalText;
        button.disabled = false;
        alert('Форма авторизации отправлена');
    }, 1500);
});

// Обработка отправки формы регистрации
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const phone = document.getElementById('registerPhone').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

    // Валидация паролей
    if (password !== passwordConfirm) {
        alert('Пароли не совпадают');
        return;
    }

    if (password.length < 8) {
        alert('Пароль должен быть не менее 8 символов');
        return;
    }

    // Здесь должна быть логика отправки данных на сервер
    console.log('Регистрация:', { name, phone, email, password });

    // Визуальная обратная связь
    const button = e.target.querySelector('.button-primary');
    const originalText = button.querySelector('.button-text').textContent;
    button.querySelector('.button-text').textContent = 'Регистрация...';
    button.disabled = true;

    setTimeout(() => {
        button.querySelector('.button-text').textContent = originalText;
        button.disabled = false;
        alert('Форма регистрации отправлена');
    }, 1500);
});

// Плавная анимация появления полей при фокусе
document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});
