/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
		for (var i = 0; i < array.length; i++) {
				fn(array[i], i, array);
		}
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
		var array2 = [];
		for (var i = 0; i < array.length; i++) {
				array2[i] = fn(array[i], i, array);
		}
		return array2;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
		var x = initial || array[0],
			 i = initial ? 0 : 1;

		for (; i < array.length; i++) {
				x = fn(x, array[i], i, array);
		}

		return x;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
	let properties = Object.keys(obj),
	   result = properties.map((property) => {
		   return property.toUpperCase();
	   });

	return result;
}


/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    var array_copy = [], a, x;
    if (to < 0) {
        a = array.length + to;
    } else if (to !== undefined) {
        a = to;
    } else {
        a = array.length;
    }

    if (from < 0) {
        x = array.length + from;
    } else if (from !== undefined) {
        x = from;
    } else {
        x = 0;
    }

    for (let i = x; i < a; i++) {
        array_copy.push(array[i]);
    }
    return array_copy;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = Math.pow(value, 2);
            return true;
        }
    });
    return proxy;
}


export {
	forEach,
	map,
	reduce,
	upperProps,
	slice,
	createProxy
};
