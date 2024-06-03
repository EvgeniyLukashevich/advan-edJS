import { localStorageManager } from "./localStorageManager.js";

function getAllReviews() {
    const reviews = localStorageManager.getItem(productReviews);
    return reviews ? reviews : {};
}

