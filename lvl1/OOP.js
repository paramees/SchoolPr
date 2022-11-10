class AbstractProduct {
    constructor (id, name, description, price, brand, quantity, images) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.quantity = quantity;
        this.date = new Date();
        this.reviews = [];
        this.images = [].concat(images);
    }

        //getter and setter for ID
    getID () {return this.ID}
    setID (id) {this.ID = id}

    //getter and setter for name
    getName () {return this.name}
    setName (name) {this.name = name}

    //getter and setter for description
    getDescription () {return this.description}
    setDescription (description) {this.description = description}

    //getter and setter for price
    getPrice () {return this.price}
    setPrice (price) {this.price = price}

    //getter and setter for brand
    getBrand () {return this.brand}
    setBrand (brand) {this.brand = brand}

    //getter and setter for quantity
    getQuantity () {return this.quantity}
    setQuantity (quantity) {this.quantity = quantity}

    //getter and setter for date
    getDate () {return this.date}
    setDate (date) {this.date = date}

    //getter and setter for reviews
    getReviews () {return this.reviews}
    setReviews (reviews) {this.reviews = reviews}

    //getter and setter for images
    getImages () {return this.images}
    setImages (images) {this.images = images}

    //universal getter-setter
    getterSetter (property, value) {
        if (this.hasOwnProperty(property)) {
            if (value === undefined) {
                return this[property]
            } else {
                this[property] = value;
            }
        }
        
    }


    //functions

    getReviewByID (ID) {
        this.reviews.forEach((value) => {if(value.ID === ID) return value})
    }

    getImage (param) {
        this.images.forEach((value) => {if(value === param) return value})
    }

    addSize (size) {
        if (!this.sizes.includes(size)) {
            this.sizes.push(size);
        }
    }

    deleteSize (param) {
        if (this.sizes.includes(size)) {
            this.sizes.slice(this.sizes.indexOf(size), 1);
        }
    }

    addReview (ID, author, comment, service, price, value, quality) {
        this.reviews.push(new Review(ID, author, comment, service, price, value, quality))
    }

    deleteReview (ID) {
        this.reviews.forEach((value) => {if(value.ID === ID) this.reviews.slice(this.reviews.indexOf(value), 1)})
    }

    getAverageRating () {
        let rating = [];
        let sum = 0;
        this.reviews.forEach((elem) => {for (let value of elem.rating.values()) {rating.push(value)}});
        rating.forEach((elem) => sum+=elem);
        return sum/rating.length;
    }

    getFullInformation () {
        let result = "";
        for (let prop in this) {
            result += `${prop} - ${this[prop]}\n`
        }
        return result
    }

    getPriceForQuantity (num) {
        return "$" + num*this.price
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

class Clothes extends AbstractProduct {
    constructor (ID, name, description, price, brand, quantity, images, material, color) {
        super(ID, name, description, price, brand, quantity, images);
        this.material = material;
        this.color = color;
    }

    //getter and setter for material
    getMaterial () {return this.material}
    setMaterial (material) {this.material = material}

    //getter and setter for color
    getColor () {return this.color}
    setColor (color) {this.color = color}
}

class Electronics extends AbstractProduct {
    constructor (ID, name, description, price, brand, quantity, images, warranty, power) {
        super(ID, name, description, price, brand, quantity, images);
        this.warranty = warranty;
        this.power = power;
    }
}

let tshirt = new Clothes (1, "tshirt", "cool tshirt", 10, "adidas", 100, ["pic1", "pic2"], "cotton", "black");
let pants = new Clothes (2, "pants", "nice pants", 25, "nike", 30, ["pic1", "pic2"], "silk", "blue");
let boots = new Clothes (3, "boots", "winter boots", 70, "WinBoo", 20, ["pic1", "pic2"], "lether", "black");
let products = [tshirt, pants, boots];
console.log(tshirt);
console.log(tshirt.getterSetter('id'));
console.log(tshirt);
