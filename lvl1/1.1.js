
function Product(ID, name, description, price, brand, activeSize, quantity, images) {
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = Date.now();
    this.reviews = [];
    this.images = [];
    this.images.concat(images);
    


    //getter and setter for ID
    this.getID = function () {return this.ID}
    this.setID = function (id) {this.ID = id}

    //getter and setter for name
    this.getName = function () {return this.name}
    this.setName = function (name) {this.name = name}

    //getter and setter for description
    this.getDescription = function () {return this.description}
    this.setDescription = function (description) {this.description = description}

    //getter and setter for price
    this.getPrice = function () {return this.price}
    this.setPrice = function (price) {this.price = price}

    //getter and setter for brand
    this.getBrand = function () {return this.brand}
    this.setBrand = function (brand) {this.brand = brand}

    //getter and setter for sizes
    this.getSizes = function () {return this.sizes}
    this.setSizes = function (sizes) {this.sizes = sizes}

    //getter and setter for activeSize
    this.getActiveSize = function () {return this.activeSize}
    this.setActiveSize = function (activeSize) {this.activeSize = activeSize}

    //getter and setter for quantity
    this.getQuantity = function () {return this.quantity}
    this.setQuantity = function (quantity) {this.quantity = quantity}

    //getter and setter for date
    this.getDate = function () {return this.date}
    this.setDate = function (date) {this.date = date}

    //getter and setter for reviews
    this.getReviews = function () {return this.reviews}
    this.setReviews = function (reviews) {this.reviews = reviews}

    //getter and setter for images
    this.getImages = function () {return this.images}
    this.setImages = function (images) {this.images = images}

    this.getReviewByID = function (ID) {
        this.reviews.forEach((value) => {if(value.ID === ID) return value})
    }

    this.getImage = function (param) {
        this.images.forEach((value) => {if(value === param) return value})
    }

    this.addSize = function (size) {
        if (!this.sizes.includes(size)) {
            this.sizes.push(size);
        }
    }

    this.deleteSize = function (param) {
        if (this.sizes.includes(size)) {
            this.sizes.slice(this.sizes.indexOf(size), 1);
        }
    }

    this.addReview = function (ID, author, comment, service, price, value, quality) {
        this.reviews.push(new Review(ID, author, comment, service, price, value, quality))
    }

    this.deleteReview = function (ID) {
        this.reviews.forEach((value) => {if(value.ID === ID) this.reviews.slice(this.reviews.indexOf(value), 1)})
    }

    this.getAverageRating = function () {
        let rating = [];
        let sum;
        this.reviews.forEach((elem) => {rating.push(elem.rating.values())});
        rating.forEach((elem) => num+=elem);
        return sum/rating.length
    }
}

function Review(ID, author, comment, service, price, value, quality) {
    this.ID = ID;
    this.author = author;
    this.date = Date.now();
    this.comment = comment;
    this.rating = new Map([
        ['service', service],
        ['price', price],
        ['value', value],
        ['quality', quality]
    ]);
}

let car = new Product(1, "car");
let coockies = new Product(2, "coockies");
console.log(car.getID());
car.setID(5);
console.log(car.getID());
