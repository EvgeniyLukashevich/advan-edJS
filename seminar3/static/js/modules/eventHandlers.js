import { localStorageManager } from "./localStorageManager.js";

const addReviewHandler = (inputEl, textareaEl, buttonEl) => {
    if (!inputEl || !textareaEl || !buttonEl) {
        console.log("Недостаточно аргументов");
        return;
    }

    if (
        !(inputEl instanceof HTMLInputElement) ||
        !(textareaEl instanceof HTMLTextAreaElement) ||
        !(buttonEl instanceof HTMLElement)
    ) {
        console.log("Некорректные аргументы");
        return;
    }

    buttonEl.addEventListener("click", function (e) {
        if (inputEl.value.trim() === "" || textareaEl.value.trim() === "") {
            alert("Поля ввода должны быть заполнены");
            return;
        }
        addReview(inputEl.value, textareaEl.value);
    });
};

const productsRenderHandler = (productsBoxEl) => {
    const reviews = getAllReviews();
    const products = Object.keys(reviews);

    if (productsBoxEl) {
        products.forEach((product) => {
            const paragraph = document.createElement("p");
            paragraph.textContent = product;
            paragraph.classList.add("products-area__products-box__product");
            productsBoxEl.appendChild(paragraph);
        });
    }
};

const reviewsRenderHandler = (productsBoxEl, reviewsBoxEl) => {
    productsBoxEl.addEventListener("click", (e) => {
        if (reviewsBoxEl && productsBoxEl) {
            reviewsBoxEl.innerHTML = "";
            const reviews = getAllReviews();
            const product = e.target.textContent;
            const productReviews = reviews[product] || [];
            const title = document.querySelector(".reviews-area__title");
            title.textContent = `Отзывы к товару "${product}"`;

            if (!productReviews.length) {
                title.textContent = `Нет ни одного отзыва к товару "${product}" `;
            }

            let index = 0;

            productReviews.forEach((review) => {
                const reviewBox = document.createElement("div");
                reviewBox.classList.add(
                    "reviews-area__reviews-box__review-box"
                );

                const paragraph = document.createElement("p");
                paragraph.classList.add(
                    "reviews-area__reviews-box__review-box__review"
                );
                paragraph.textContent = review;

                const removeButton = document.createElement("button");
                removeButton.classList.add(
                    "reviews-area__reviews-box__review-box__remove-button"
                );
                removeButton.id = `${e.target.textContent}_${index}`;
                removeButton.textContent = "Удалить Отзыв";

                reviewBox.appendChild(paragraph);
                reviewBox.appendChild(removeButton);

                reviewsBoxEl.appendChild(reviewBox);

                index++;
            });
        }
    });
};

const removeReviewHandler = (reviewsBoxEl, reviewRemoveButtonClass) => {
    if (reviewsBoxEl) {
        reviewsBoxEl.addEventListener("click", (e) => {
            if (e.target.classList.contains(reviewRemoveButtonClass)) {
                const parts = e.target.id.split("_");
                const product = parts[0];
                const index = parseInt(parts[1]);
                const reviews = getAllReviews();
                reviews[product] = reviews[product].filter(
                    (review1) => review1 !== reviews[product][index]
                );
                saveAllReviews(reviews);
                location.reload();
            }
        });
    }
};

function getAllReviews() {
    const reviews = localStorageManager.getItem("productReviews");
    return reviews ? reviews : {};
}

function saveAllReviews(reviews) {
    localStorageManager.setItem("productReviews", reviews);
}

function addReview(productName, review) {
    console.log(productName);
    const reviews = getAllReviews();

    if (!reviews[productName]) {
        reviews[productName] = [];
    }

    reviews[productName].push(review);
    saveAllReviews(reviews);
}

export {
    addReviewHandler,
    productsRenderHandler,
    reviewsRenderHandler,
    removeReviewHandler,
};
