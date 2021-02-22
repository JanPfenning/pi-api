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
    let ret = '';
    let found = false;
    // TODO use average
    this.connection.query(
      `SELECT \
        UNIX_TIMESTAMP(time) DIV 300 as minute, \
        temp \
      FROM \
         ${table} \
      WHERE \
        time > (CURRENT_TIMESTAMP() - 60 * 60 * ${hoursFrom}) \
        and time < (CURRENT_TIMESTAMP() - 60 * 60 * ${hoursTo}) \
      group by \
        minute \
      `,
      function (err, results, fields) {
        ret = JSON.stringify(results);
        console.log(ret); // results contains rows returned by server
        if (err) {
          console.log(err);
        }
        found = true;
      },
    );
    while (!found) {}
    return ret;
  }
}
