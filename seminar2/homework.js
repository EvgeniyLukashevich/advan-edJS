/* Task 1
Представьте, что у вас есть класс для управления библиотекой. 
В этом классе будет приватное свойство для хранения списка книг, 
а также методы для добавления книги, удаления книги и получения 
информации о наличии книги.

- Класс должен содержать приватное свойство #books, 
которое инициализируется пустым массивом и представляет 
собой список книг в библиотеке.

- Реализуйте геттер allBooks, который возвращает текущий список книг.

- Реализуйте метод addBook(title), который позволяет 
добавлять книгу в список.
    - Если книга с таким названием уже существует в списке, 
    выбросьте ошибку с соответствующим сообщением.

- Реализуйте метод removeBook(title), который позволит 
удалять книгу из списка по названию. 
    - Если книги с таким названием нет в списке, 
    выбросьте ошибку с соответствующим сообщением.

- Реализуйте метод hasBook(title), который будет проверять 
наличие книги в библиотеке и возвращать true или false в 
зависимости от того, есть ли такая книга в списке или нет.

- Реализуйте конструктор, который принимает начальный 
список книг (массив) в качестве аргумента. 
    - Убедитесь, что предоставленный массив не содержит дубликатов; 
    в противном случае выбрасывайте ошибку.
*/

console.log(`### ЗАДАНИЕ 1 ###`);

class Library {
    // Приватное свойство для хранения списка книг
    #books = [];

    // Конструктор принимает начальный список книг
    constructor(initialBooks = []) {
        // Убедимся, что нет дубликатов в начальном списке
        const uniqueBooks = new Set(initialBooks);
        if (uniqueBooks.size !== initialBooks.length) {
            throw new Error("Начальный список книг содержит дубликаты");
        }

        this.#books = initialBooks;
    }

    // Геттер для получения текущего списка всех книг
    get allBooks() {
        return this.#books;
    }

    // Метод для добавления книги в список
    addBook(title) {
        if (this.#books.includes(title)) {
            throw new Error(`Книга "${title}" уже существует в списке`);
        }
        this.#books.push(title);
    }

    // Метод для удаления книги из списка по названию
    removeBook(title) {
        const bookIndex = this.#books.indexOf(title);
        if (bookIndex === -1) {
            throw new Error(`Книга "${title}" не найдена в списке`);
        }
        this.#books.splice(bookIndex, 1);
    }

    // Метод для проверки наличия книги в списке
    hasBook(title) {
        return this.#books.includes(title);
    }
}

// Пример использования
try {
    const myLibrary = new Library(["Book1", "Book2"]);
    console.log(myLibrary.allBooks); // ["Book1", "Book2"]

    myLibrary.addBook("Book3");
    console.log(myLibrary.allBooks); // ["Book1", "Book2", "Book3"]

    console.log(myLibrary.hasBook("Book2")); // true
    console.log(myLibrary.hasBook("Book4")); // false

    myLibrary.removeBook("Book1");
    console.log(myLibrary.allBooks); // ["Book2", "Book3"]

    myLibrary.removeBook("Book5"); // Ошибка: Книга "Book5" не найдена в списке
} catch (error) {
    console.error(error.message);
}


/*Task 2
Вы разрабатываете систему отзывов для вашего веб-сайта. 
Пользователи могут оставлять отзывы, но чтобы исключить 
слишком короткие или слишком длинные сообщения, вы решаете 
установить некоторые ограничения.

- Создайте HTML-структуру с текстовым полем для ввода отзыва, 
кнопкой для отправки и контейнером, где будут отображаться отзывы.

- Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами.
    - Если длина введенного отзыва менее 50 или более 500 символов, 
    функция должна генерировать исключение.

- При добавлении отзыва, он должен отображаться на странице 
под предыдущими отзывами, а не заменять их.

Вы можете использовать этот массив initialData для начальной 
загрузки данных при запуске вашего приложения
*/


const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

const reviewsContainer = document.getElementById('reviewsContainer');

function loadInitialData(data) {
    data.forEach(item => {
        item.reviews.forEach(review => {
            addReviewToContainer(review.text);
        });
    });
}

function addReviewToContainer(reviewText) {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-container';
    reviewElement.textContent = reviewText;
    reviewsContainer.appendChild(reviewElement);
}

function submitReview() {
    const reviewInput = document.getElementById('reviewInput');
    const reviewText = reviewInput.value;

    try {
        if (reviewText.length < 50 || reviewText.length > 500) {
            throw new Error('Отзыв должен содержать от 50 до 500 символов.');
        }

        addReviewToContainer(reviewText);
        reviewInput.value = '';
    } catch (error) {
        alert(error.message);
    }
}

document.getElementById('submitReview').addEventListener('click', submitReview);

// Загрузка начальных данных
loadInitialData(initialData);