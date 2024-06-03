import {
    productsRenderHandler,
    removeReviewHandler,
    reviewsRenderHandler,
} from "./modules/eventHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
    const productsBox = document.querySelector(".products-area__products-box");
    const reviewsBox = document.querySelector(".reviews-area__reviews-box");

    productsRenderHandler(productsBox);
    reviewsRenderHandler(productsBox, reviewsBox);
    removeReviewHandler(
        reviewsBox,
        "reviews-area__reviews-box__review-box__remove-button"
    );
});
