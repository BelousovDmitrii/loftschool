/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    var sizeY = Math.round(Math.random() * (window.screen.availHeight)),
        sizeX = Math.round(Math.random() * (window.screen.availWidth)),
        positionY = Math.round(Math.random() * (window.screen.availHeight)),
        positionX = Math.round(Math.random() * (window.screen.availWidth)),
        r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256)),
        c = '#' + r.toString(16) + g.toString(16) + b.toString(16),
        dragDiv = document.createElement('div'),
        styles = {
            position: 'absolute',
            left: positionX + 'px',
            top: positionY + 'px',
            width: sizeX + 'px',
            height: sizeY + 'px',
            backgroundColor: c
        };

    dragDiv.classList.add('draggable-div');

    for (let el in styles) {
        console.log(dragDiv.style[el]);
        console.log(dragDiv.style.el);
        dragDiv.style[el] = styles[el];
    }

    return dragDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */

function addListeners(target) {

    target.addEventListener('mousedown', function (e) {
        var functionMove = (e) => moveAt(e),
            coords = getCoords(target),
            shiftX = e.pageX - coords.left,
            shiftY = e.pageY - coords.top;

        target.style.zIndex = 1000;

        function moveAt(e) {
            target.style.left = e.pageX - shiftX + 'px';
            target.style.top = e.pageY - shiftY + 'px';
        };

        document.addEventListener('mousemove', functionMove);

        target.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', functionMove);
        });

    });

    target.addEventListener('ragstart', () => {
        return false;
    });

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
