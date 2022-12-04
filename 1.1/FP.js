function cityCSV (text) {
    let rating = text //text is an string from csv file
            .split("\n") //split by \n
            .filter(str => (str && !str.startsWith("#"))) //delete string that starts with #(comments) and empty strings
            .map(str => {let array = str.split(",")
                        return {x: array[0], y: array[1], name: array[2], population: array[3]}}) // creates array of objects with cities
            .sort((a, b) => (b.population - a.population)) // sort array by poputation
            .slice(0, 9) //delete all cities except top 10
            .reduce((obj, str, index) => (obj[(index + 1).toString()] = str, obj), {}) //create an object with top 10 cities
            //then retern a function that replace the name of city by name + info and position in top 10
    return (str) => console.log(Object.keys(rating).reduce((acc, key) => acc.replace(rating[key].name, `${rating[key].name} (№${key} в ТОП-10 самых крупных городов Украины, население ${rating[key].population} человек)`), str))
}

cityCSV("44.38,34.33,Алушта,31440,\n49.46,30.17,Біла Церква,200131,\n49.54,28.49,Бердичів,87575,#некоммент\n#\n46.49,36.58,#Бердянськ,121692,\n49.15,28.41,Вінниця,356665,\n#45.40,34.29,Джанкой,43343,\n\n# в этом файле три строки-коммента :)")("Вінниця или Алушта")