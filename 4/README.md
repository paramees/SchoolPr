# Star-Wars API

API realize CRUD REST back-end program. Has easy to use interface.

It works with [swapi](https://swapi.dev/). You can get data right from that site( cos data format has taken from swapi ), and makes CRUD methods with data.

## What do you need?

- Node.js
- Nest.js
- TypeScript
- npm
- instal other dependencies

```
$ git clone <repository-url>
```

Go to the directory with project.

```
$ npm install
```

```
$ npm run migration:run
```

You can config app in `.env` file in the root of the project.

Then.

```
$ npm run start
```


## How to work with it?

It works with MySQL + Type ORM + Nest.js + Swagger

You can config app in `.env` file in the root of the project

The web adresses are: 

`http:localhost/{entity}/?method/?param`

For example: 

`http://localhost:3003/people/delete/46`

or

`http://localhost:3003/people`

>You can check all variants of usage in Swagger (go to http://localhost:3003/api#/)