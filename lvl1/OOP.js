class AbstractProduct {
    constructor (ID, name, description, price, brand, quantity, images) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.quantity = quantity;
        this.date = Date.now();
        this.reviews = [];
        this.images = [].concat(images);
    }

        //getter and setter for ID
    getID = function () {return this.ID}
    setID = function (id) {this.ID = id}

    //getter and setter for name
    getName = function () {return this.name}
    setName = function (name) {this.name = name}

    //getter and setter for description
    getDescription = function () {return this.description}
    setDescription = function (description) {this.description = description}

    //getter and setter for price
    getPrice = function () {return this.price}
    setPrice = function (price) {this.price = price}

    //getter and setter for brand
    getBrand = function () {return this.brand}
    setBrand = function (brand) {this.brand = brand}

    //getter and setter for quantity
    getQuantity = function () {return this.quantity}
    setQuantity = function (quantity) {this.quantity = quantity}

    //getter and setter for date
    getDate = function () {return this.date}
    setDate = function (date) {this.date = date}

    //getter and setter for reviews
    getReviews = function () {return this.reviews}
    setReviews = function (reviews) {this.reviews = reviews}

    //getter and setter for images
    getImages = function () {return this.images}
    setImages = function (images) {this.images = images}

    //universal getter-setter
    getterSetter = function (property, value) {
        if (this)
        if (value === undefined) {
            
        }
    }


    //functions

    getReviewByID = function (ID) {
        this.reviews.forEach((value) => {if(value.ID === ID) return value})
    }

    getImage = function (param) {
        this.images.forEach((value) => {if(value === param) return value})
    }

    addSize = function (size) {
        if (!this.sizes.includes(size)) {
            this.sizes.push(size);
        }
    }

    deleteSize = function (param) {
        if (this.sizes.includes(size)) {
            this.sizes.slice(this.sizes.indexOf(size), 1);
        }
    }

    addReview = function (ID, author, comment, service, price, value, quality) {
        this.reviews.push(new Review(ID, author, comment, service, price, value, quality))
    }

    deleteReview = function (ID) {
        this.reviews.forEach((value) => {if(value.ID === ID) this.reviews.slice(this.reviews.indexOf(value), 1)})
    }

    getAverageRating = function () {
        let rating = [];
        let sum = 0;
        this.reviews.forEach((elem) => {for (let value of elem.rating.values()) {rating.push(value)}});
        rating.forEach((elem) => sum+=elem);
        return sum/rating.length;
    }

    getFullInformation = function() {

    }

    getPriceForQuantity = function(num) {

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

}

Object.setPrototypeOf(Clothes, AbstractProduct);
class Clothes {
    constructor (ID, name, description, price, brand, quantity, images, material, color) {
        super(ID, name, description, price, brand, quantity, images);
        this.material = material;
        this.color = color;
    }

    //getter and setter for material
    getMaterial = function () {return this.material}
    setMaterial = function (material) {this.material = material}

    //getter and setter for color
    getColor = function () {return this.color}
    setColor = function (color) {this.color = color}

    test = function () {
        return this["color"]
    }
}

class Electronics {
    __proto__ = AbstractProduct;
    constructor (ID, name, description, price, brand, quantity, images, warranty, power) {
        super(ID, name, description, price, brand, quantity, images);
        this.warranty = warranty;
        this.power = power;
    }
}

let tshirt = new Clothes(1,"tshirt", "cool tshirt", 10, "adidas", 100, ["pic1", "pic2"], "cotton","black");
tshirt.test()
