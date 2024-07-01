import fastify from "fastify";
import * as mysql from 'mysql';

const connection = {
    host: 'localhost',
    database: 'reactproject',
    user: 'root',
    password: 'joao123',
};

async function query(sql: string | mysql.QueryOptions, values = []) {
    var con = mysql.createConnection(connection)
    con.connect();
    let promise = new Promise((resolve, reject) => {
        con.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });

    });
    con.end();
    return promise;
}

const server = fastify();

// 

async function getAllFromTable(table:string) {
  try{
    let sql = `SELECT * FROM ${table}`;
    const result = await query(sql);
    return result;
  } catch (err){
    console.log(err);
  }
}

server.get('/startups', async (request, reply) => {
  return await getAllFromTable("startup");
})

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

