/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
async function loadTowns() {
    return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
            xhr.responseType = 'json';
            xhr.send();
            xhr.addEventListener('load', () => {
                if (xhr.status < 400) {
                    resolve(xhr.response.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    }));
                } else {
                    reject();
                }
            });
        }
    );
};

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */

function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
        return true;
    } else {
        return false;
    }
}

const homeworkContainer = document.querySelector('#homework-container');
/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

var townArray = [];

loadTowns()
    .then(response => {
        townArray = response;
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
    })
    .catch(() => {
        let reloadButton = document.createElement('button');

        reloadButton.textContent = 'Повторить';
        reloadButton.addEventListener('click', function (e) {
            loadTowns().then(response => {
                townArray = response;
                loadingBlock.style.display = 'none';
                filterBlock.style.display = 'block';
            });
        });

        homeworkContainer.appendChild(reloadButton);
        loadingBlock.textContent = 'Не удалось загрузить города';
    });

filterInput.addEventListener('keyup', function () {
    if (filterInput.value) {
        filterResult.innerHTML = townArray
            .filter(item => isMatching(item.name, filterInput.value))
            .map(function (item) {
                var deleteButton = document.createElement('button');
                var townItem = document.createElement('li');

                deleteButton.classList.add('delete-town');
                townItem.classList.add('town-item');

                deleteButton.textContent = 'Удалить';
                townItem.textContent = item.name;

                deleteButton.addEventListener('click', function (event) {
                    console.log('123123123');
                    filterResult.removeChild(townItem);
                });

                /*townItem.appendChild(deleteButton);*/

                return townItem.outerHTML;
            })
            .join('')
    } else {
        filterResult.innerHTML = '';
    }
});

export {
    loadTowns,
    isMatching
};
