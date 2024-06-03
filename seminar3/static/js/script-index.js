import { addReviewHandler } from "./modules/eventHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
    const addReviewButton = document.querySelector(".review-form__button");
    const addReviewInput = document.querySelector(".review-form__input");
    const addReviewTextrarea = document.querySelector(".review-form__textarea");

    addReviewHandler(addReviewInput, addReviewTextrarea, addReviewButton);
});
