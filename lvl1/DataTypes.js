//object constructor
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
    this.images = [].concat(images);
    


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


    //functions

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
        let sum = 0;
        this.reviews.forEach((elem) => {for (let value of elem.rating.values()) {rating.push(value)}});
        rating.forEach((elem) => sum+=elem);
        return sum/rating.length;
    }
}

//consrtuctor reviews
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

//search by substring in name or description
function searchProducts(products, search) {
    let result = [];
    products.forEach((elem) => {if (elem.getName().includes(search) || elem.getDescription().includes(search)) result.push(elem)});
    return result;
}

//sort ba name, id or price
function sortProducts(products, sortRule) {
    switch (sortRule.toLowerCase()) {
        case "id":
            return products.sort((a, b) => a.getID() > b.getID() ? 1 : -1);
            break;
        case "price":
            return products.sort((a, b) => a.getPrice() > b.getPrice() ? 1 : -1);
            break;
        case "name":
            return products.sort((a, b) => a.getName().localeCompare(b.getName()));
        default:
            console.log("Wrong sort rule")
            return -1;
    }

}//tests
let tshirt = new Product(1, "tshirt", "cool tshirt", 10, "adidas", "M", 100, ["pic1", "pic2"]);
let boots = new Product(2, "boots", "winter boots", 50, "adidas", "L", 30, "pic1");
console.log(tshirt.getImages());
console.log(boots.getImages());
tshirt.addReview(1, "me", "nice tshirt", 4,3,4,4);
tshirt.addReview(2, "me", "nice cool tshirt", 5,5,4,4);
console.log(tshirt.getAverageRating());
let products = [tshirt, boots];

