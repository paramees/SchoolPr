const fs = require('fs');
import { join } from 'path';

let migrations : Function[] | string[]

if (fs.existsSync(join(__dirname, 'migrations'))) {

const migrationFiles = fs.readdirSync(join(__dirname, 'migrations')).filter((file) => file.endsWith('.js'));

migrations = migrationFiles.map((file) => <Function>Object.values(require(`./migrations/${file}`))[0])

} else {
    migrations = [""]
}
export default migrations;