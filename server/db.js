const pgp = require('pg-promise')()

const db = pgp('postgres://pguser:password@localhost:5432/antiplagiat')

db.any(`SELECT * FROM pg_catalog.pg_tables where schemaname != 'pg_catalog' AND schemaname != 'information_schema';`)
  .then((result) =>
    console.log(result)
  ).catch(error => console.log(error))
