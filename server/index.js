"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const mysql = __importStar(require("mysql"));
const connection = {
    host: 'localhost',
    database: 'reactproject',
    user: 'root',
    password: 'joao123',
};
async function query(sql, values = []) {
    var con = mysql.createConnection(connection);
    con.connect();
    let promise = new Promise((resolve, reject) => {
        con.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
    con.end();
    return promise;
}
const server = (0, fastify_1.default)();
// 
async function getAllFromTable(table) {
    try {
        let sql = `SELECT * FROM ${table}`;
        const result = await query(sql);
        return result;
    }
    catch (err) {
        console.log(err);
    }
}
async function getAllFromTableByParameter(table, field, parameter) {
    try {
        let sql = `SELECT * FROM ${table} WHERE ${field} = `;
        const values = [];
        values.push(parameter);
        const result = await query(sql, values);
        return result;
    }
    catch (err) {
        console.log(err);
    }
}
server.get('/startups', async (request, reply) => {
    return await getAllFromTable("startup");
});
server.get('/startups/:id', async (request, reply) => {
    const id = request.params.id;
    return await getAllFromTableByParameter("Startup", "id", id);
});
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
