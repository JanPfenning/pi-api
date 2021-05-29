import { Get, Injectable } from '@nestjs/common';
const mysql = require('mysql2');

@Injectable()
export class DbService {
  connection;

  constructor() {
    // create the connection to database
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'esp',
    });
  }

  getDataBetween(table: string, hoursFrom: number, hoursTo: number): string {
    // TODO use average
    return this.connection.promise().query(
      `SELECT \
        time, UNIX_TIMESTAMP(time) DIV 300 as minute, \
        temp \
      FROM \
         ${table} \
      WHERE \
        time > (CURRENT_TIMESTAMP() - 3600 * ${hoursFrom}) \
        and time < (CURRENT_TIMESTAMP() - 3600 * ${hoursTo}) \
      group by \
        minute \
      `).then( ([rows, fields]) => {
	return JSON.stringify(rows)
	}).catch(err => {console.log(err); return ""} );
  }
}
