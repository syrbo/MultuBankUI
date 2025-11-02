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

    setTimeout(() => {
        button.querySelector('.button-text').textContent = originalText;
        button.disabled = false;
        // Переход на главную страницу после авторизации
        window.location.href = 'dashboard.html';
    }, 1500);
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
