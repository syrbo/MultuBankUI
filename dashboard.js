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
    }));
});

// Обработка кнопки выхода
document.querySelectorAll('.icon-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const icon = button.textContent;
        if (icon === '🚪') {
            if (confirm('Вы действительно хотите выйти?')) {
                window.location.href = 'index.html';
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
            alert('Функция открытия счета');
        } else if (text.includes('Открыть продукт')) {
            alert('Функция открытия продукта');
        }
    });
});

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
