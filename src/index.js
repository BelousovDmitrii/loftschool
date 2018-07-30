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
		var copy_array = [];
		for (var i = 0; i < array.length; i++) {
				copy_array[i] = fn(array[i], i, array);
		}
		return copy_array;
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
		var array_copy = [];
		for (let i = from,x = 0; i < to, x < to; i++, x++) {
				array_copy[x] = array[i];
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
			let result;
			return result = Math.pow(value, 2);
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
