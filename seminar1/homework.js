/* Task 1
- Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать.
    - Каждая итерация должна возвращать следующий альбом из коллекции.
- Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. 
- Каждый альбом имеет следующую структуру:
    ```javascript
    {
        title: "Название альбома",
        artist: "Исполнитель",
        year: "Год выпуска"
    }
    ```
- Реализуйте кастомный итератор для объекта musicCollection.
    - Итератор должен перебирать альбомы по порядку.
- Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: `Название альбома - Исполнитель (Год выпуска)`
*/

console.log(`### ЗАДАНИЕ 1 ###`);

const albums = [
    { title: "Горгород", artist: "Мирон Янович", year: 2015 },
    { title: "Легенда", artist: "Da Gudda Jazz", year: 2016 },
    { title: "SOULнечный", artist: "Tyomcha karabeen", year: 2099 },
];

const musicCollection = {
    albums,
    [Symbol.iterator]: function () {
        let index = 0;
        const albums = this.albums;

        return {
            next: function () {
                if (index < albums.length) {
                    return { value: albums[index++], done: false };
                } else {
                    return { done: true };
                }
            },
        };
    },
};

// Используем цикл for...of для перебора альбомов и вывода их на консоль
for (const album of musicCollection) {
    console.log(`${album.title} - ${album.artist} (${album.year})`);
}

/* Task 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.  
Необходимо создать систему управления этими заказами, которая позволит:
- Отслеживать, какой повар готовит какое блюдо.
- Записывать, какие блюда заказал каждый клиент.
- Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. 
- В качестве ключей для клиентов используйте объекты.
*/

console.log(`\n### ЗАДАНИЕ 2 ###`);

const chefs = new Map([
    ["Виктор", "Пицца"],
    ["Ольга", "Суши"],
    ["Дмитрий", "Десерты"],
]);

const dishes = new Map([
    ["Пицца 'Маргарита'", "Виктор"],
    ["Пицца 'Пепперони'", "Виктор"],
    ["Суши 'Филадельфия'", "Ольга"],
    ["Суши 'Калифорния'", "Ольга"],
    ["Тирамису", "Дмитрий"],
    ["Чизкейк", "Дмитрий"],
]);

const alexey = { name: "Алексей" };
const maria = { name: "Мария" };
const irina = { name: "Ирина" };

const orders = new Map();
orders.set(alexey, ["Пицца 'Пепперони'", "Тирамису"]);
orders.set(maria, ["Суши 'Калифорния'", "Пицца 'Маргарита'"]);
orders.set(irina, ["Чизкейк"]);

function getChefByDish(dish) {
    return dishes.get(dish);
}

for (const [client, orderedDishes] of orders) {
    console.log(`Клиент ${client.name} заказал:`);
    for (const dish of orderedDishes) {
        const chef = getChefByDish(dish);
        console.log(`- ${dish} (повар: ${chef})`);
    }
    console.log("");
}
