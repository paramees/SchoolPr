//1 - 2
async function fetchIp () :Promise<{ip : string}> {
    try {
        return await (await fetch("https://api.ipify.org?format=json")).json();
    } catch {
        throw new Error("cant fetch");
    }
}
    
//fetchIp().then(ip => console.log(ip.ip))

//3.1


async function getRandName() : Promise<object> {
    return await (await fetch("https://random-data-api.com/api/name/random_name")).json();
}


function randomNames1 () {
    Promise.all([getRandName(), getRandName(), getRandName()]).then((data : object[]) => console.log(data.length));
}


randomNames1()
//3.2


//3.3

