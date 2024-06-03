class Product {
    #name;
    #reviews = [];

    constructor(name, reviewsArray) {
        this.#name = name;
        if (reviewsArray && Array.isArray(reviewsArray)) 
            this.#reviews = reviewsArray;
    }

    getName() {
        return this.#name;
    }

    getReviews() {
        return this.#reviews;
    }

    addReview(review) {
        if (review && typeof review === 'string') {
            this.#reviews.push(review)
        }
    }

}