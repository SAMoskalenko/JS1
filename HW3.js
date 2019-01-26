"use strict";

//функция для ошибки
//если есть элемент ошибки то идем дальше, если его нет то мы создаем его задавая имя номер (для расположения) и текст

function createError(num, name, text) {
    const errorExisit = document.getElementById(name);
    if (!errorExisit) {
        const allert = document.createElement('div'); // создаем элемент
        document.querySelectorAll('.form-group')[num].appendChild(allert); // добавляем в документ
        allert.id = name; // задаем id (необходим для последующего удаления)
        allert.innerHTML = text; // записываем тест
        allert.style.fontSize = '10px'; //задаем внешний вид
        allert.style.color = 'red';
    }
}

//функция для удаления элемента (ошибки)

function deleteElement(name) {
    const del = document.getElementById(name); //создаем элемент по id
    if (del) { //если он создался
        del.remove(); // удаляем
    }
}

//проверка имени

function checkName() {
    const name = document.querySelector('.form-control'); // создаем элемент
    if (name.value.length < 1 || name.value.length > 50) { // проверяем
        createError('0', 'nameAllert', 'Имя должно содержать как минимум 1 символ, не более 50 символов');
        // создаем ошибку если проверка не прошла
        name.style.border = '1px solid red'; // задаем стиль
        return false; //возвращаем ошибку
    } else { // если проверка пройдена
        name.style.border = '1px solid green'; //задаем стиль
        deleteElement('nameAllert'); // удаляем ошибку
        return true;
    }
}

//все остальные функции по аналогии с checkName

function checkPhone() {
    const phone = document.querySelectorAll('.form-control')[1];
    if (phone.value.length !== 11 || isNaN(phone.value / 0)) {
        createError('1', 'phoneAllert', 'Телефон должен содержать 11 цифр');
        phone.style.border = '1px solid red';
        return false;
    } else {
        phone.style.border = '1px solid green';
        deleteElement('phoneAllert');
        return true;
    }
}

function checkPassword() {
    const password = document.querySelectorAll('.form-control')[2];
    if (password.value.length < 5) {
        createError('2', 'passwordAllert', 'Пароль должно содержать как минимум 5 символов');
        password.style.border = '1px solid red';
        return false;
    } else {
        password.style.border = '1px solid green';
        deleteElement('passwordAllert');
        return true;
    }
}

function confirmPassword() {
    const password = document.querySelectorAll('.form-control')[2];
    const passwordRepeat = document.querySelectorAll('.form-control')[3];
    if (passwordRepeat.value !== password.value) {
        createError('3', 'passwordRepeatAllert', 'Пароль не совпадает');
        passwordRepeat.style.border = '1px solid red';
        return false;
    } else {
        passwordRepeat.style.border = '1px solid green';
        deleteElement('passwordRepeatAllert');
        return true;
    }
}

//проверяем

const validation = document.querySelector('form'); //задаем переменную для валидации по тегу form
validation.addEventListener('submit', function (event) {
    const password = !checkPassword(); //дадаем пременной значение отрицательное выдаваемому функцией
    const phone = !checkPhone();//дадаем пременной значение отрицательное выдаваемому функцией
    const name = !checkName();//дадаем пременной значение отрицательное выдаваемому функцией
    const confirm = !confirmPassword();//дадаем пременной значение отрицательное выдаваемому функцией
    if (name || confirm || password || phone) { //проверяем по переменным выпадение ошибок
        event.preventDefault(); // если ошибки есть то останавливаем
    }
});