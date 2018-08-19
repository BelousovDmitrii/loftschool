/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации
 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

function getCookieList() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == 'number' && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + '=' + value;

    for (var propName in options) {
        updatedCookie += '; ' + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
        return true;
    }
}

const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');

const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');

const listTable = homeworkContainer.querySelector('#list-table tbody');

function getTableWithCookie() {
    let cookieList = getCookieList();

    listTable.innerHTML = '';

    for (let item in cookieList) {
        let deleteButton = document.createElement('button');
        let tr = document.createElement('tr');

        if (!(isMatching(item, filterNameInput.value) || isMatching(cookieList[item], filterNameInput.value))) {
            continue;
        }

        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', function (e) {
            document.cookie = e.target.parentNode.previousElementSibling.previousElementSibling.textContent + `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

            getTableWithCookie();
        });

        tr.innerHTML = '<td>' + item + '</td><td>' + cookieList[item] + '</td><td></td>';

        tr.lastElementChild.append(deleteButton);

        listTable.append(tr);

    }
}

getTableWithCookie();

filterNameInput.addEventListener('keyup', function () {
    getTableWithCookie();
});

addButton.addEventListener('click', () => {
    setCookie(addNameInput.value, addValueInput.value);

    getTableWithCookie();
});
