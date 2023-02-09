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


function randomNames1 (): void {
    Promise.all([getRandName(), getRandName(), getRandName()]).then((data : object[]) => console.log(data.length));
}


//randomNames1()
//3.2
function randomNames2 (): void {
    for(let i = 0; i < 3; i++) {
    getRandName().then((data : object) => console.log(data));
    }
}

//randomNames2()

//3.3
function randomNames3 () : void {
    let getName;
    for(let i = 0; i < 3; i++) {
        getName = fetch("https://random-data-api.com/api/name/random_name").then((resp: Response) => resp.json());
        getName.then((data: Object) => console.log(data)).catch((e: Error) => console.error(e));
    }
}

//randomNames3()

//4.1
function getWomen () : void {
    let getUser;
    getUser = fetch("https://random-data-api.com/api/users/random_user").then((resp: Response) => resp.json());
    getUser.then((user: {"gender" : string}) => {
        if (user.gender = "Female") {
            console.log(user)
        } else {
            getWomen()
        }
    })
}

//getWomen()

//4.2
async function getUser() : Promise<any> {
    return await (await fetch("https://random-data-api.com/api/users/random_user")).json()
}

async function getWomenAsync () : Promise<void> {
    let user: {"gender" : string} 
    do {
        user = await (await fetch("https://random-data-api.com/api/users/random_user")).json();
    } while (user.gender != "Female")    
    console.log(user)
}

//getWomenAsync()

//5
async function f52 () : Promise<any> {
    let ip = fetchIp().then((data: {"ip": string}) => {
        f51(() => console.log(data.ip))
    })
}

function f51 (callback : Function) {
    callback()
}


// (async () => {
//     await f52()
// })()

//6
async function f61 () : Promise<string> {
    let ip : string = await fetchIp().then((data: {"ip": string}) => data.ip)
    return ip
}

function f62 (callback: (ip:string) => void) : void {
    f61().then((ip) => callback(ip))
}

f62((ip) => console.log(ip));
