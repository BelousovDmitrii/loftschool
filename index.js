VK.init({
    apiId: 6666860
});

function vkAuth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error(`Ошибка авторизации приложения. Статус ошибки: ${data.status}`));
            }
        }, 2);
    });
}

function callAPI(method, params) {
    params.v = '5.80';
    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        })
    })
}

vkAuth()
    .then(() => {
        return callAPI('friends.get', { fields: 'photo_100' })
    })
    .then(friends => {
        const template = document.querySelector('#friends-template').textContent;
        const render = Handlebars.compile(template);
        const vkFriendList = document.querySelector('#friends-list__vk');
        const newFriendList = document.querySelector('#friends-list__new');
        const friendsItemsVK = { items: [] };
        const friendsItemsNew = { items: [] };
        const cookieList = getCookieList();

        friends.items.filter((item) => {
            for (let cookie in cookieList) {
                if (item.id === +cookieList[cookie]) {
                    friendsItemsNew.items.push(item);
                }
            }

            friendsItemsVK.items.push(item);
        });

        for (let i = 0; i < friendsItemsVK.items.length; i++) {
            for (let cookie in cookieList) {
                if(i == friendsItemsVK.items.length -1 ){
                    friendsItemsVK.items.pop();
                    break;
                }
                if (friendsItemsVK.items[i].id === +cookieList[cookie]) {
                    friendsItemsVK.items.splice(i, 1);
                }
            }
        }

        vkFriendList.innerHTML = render(friendsItemsVK);
        newFriendList.innerHTML = render(friendsItemsNew);

        iconChange(newFriendList);
    })
    .catch((e) => {
        console.error(e);
    });

function getCookieList() {
    return document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev
    }, {})
};

function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
        return true;
    } else {
        return false;
    }
}

function iconChange(where) {
    var childList = where.children;

    for (let i = 0; childList.length > i; i++) {
        let child = childList[i];

        if (child.tagName === 'I') {
            if (child.classList.contains('fa-plus')) {
                child.classList.add('fa-times');
                child.classList.remove('fa-plus');
            } else {
                child.classList.remove('fa-times');
                child.classList.add('fa-plus');
            }
        } else {
            iconChange(child);
        }
    }
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

function DragAndDrop() {
    let currentZone;
    let emptyDiv = document.createElement('div');
    emptyDiv.classList.add('empty-div');

    document.addEventListener('dragstart', (e) => {
        const zone = getCurrentZone(e.target);

        if (zone && e.target.classList.contains('friends-list__item')) {
            currentZone = { startZone: zone, node: e.target };
        }
    });

    document.addEventListener('dragover', (e) => {
        const zone = getCurrentZone(e.target);

        if (zone) {
            e.preventDefault();
        }
    });

    document.addEventListener('drop', (e) => {
        if (currentZone) {
            const zone = getCurrentZone(e.target);


            e.preventDefault();

            if (zone && currentZone.startZone !== zone) {
                if (e.target.classList.contains('friends-list__item')) {
                    iconChange(currentZone.node);
                    zone.insertBefore(currentZone.node, e.target.nextElementSibling);
                } else {
                    zone.insertBefore(currentZone.node, zone.lastElementChild);
                }
            }

            currentZone = null;
        }
    });

    function getCurrentZone(from) {
        do {
            if (from.classList.contains('dnd-zone')) {
                return from;
            }
        } while (from = from.parentElement);

        return null;
    }
}

DragAndDrop();

document.addEventListener('click', (e) => {
    let newFriendList = document.querySelector('#friends-list__new');
    let vkFriendList = document.querySelector('#friends-list__vk');

    if (e.target.classList.contains('fa-plus')) {
        newFriendList.appendChild(e.target.parentElement.parentElement.parentElement);

        e.target.classList.remove('fa-plus');
        e.target.classList.add('fa-times');

    } else if (e.target.classList.contains('fa-times')) {
        vkFriendList.appendChild(e.target.parentElement.parentElement.parentElement);

        e.target.classList.remove('fa-times');
        e.target.classList.add('fa-plus');
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('friends-list-save')) {
        let cookieList = getCookieList();
        let friendsList = document.querySelector('#friends-list__new');

        for (let cookie in cookieList) {
            if (isMatching(cookie, 'userID')) {
                document.cookie = cookie + `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
            }
        }

        for (let item in friendsList.children) {
            setCookie('userID' + friendsList.children[item].getAttribute('id'), friendsList.children[item].getAttribute('id'))
        }
    }
});

function filter(inputId, zoneId) {
    const zone = document.querySelector('#' + zoneId)
    const input = document.querySelector('#' + inputId);

    input.addEventListener('keyup', (e) => {
        for (let item in zone.children) {
            if (e.target.value) {
                if (!(isMatching(zone.children[item].children[1].textContent, e.target.value))) {
                    zone.children[item].style.display = 'none';
                } else {
                    zone.children[item].style.display = 'flex';
                }
            } else {
                zone.children[item].style.display = 'flex';
            }
        }
    });
}

filter('input-filter-new', 'friends-list__new');
filter('input-filter-vk', 'friends-list__vk');