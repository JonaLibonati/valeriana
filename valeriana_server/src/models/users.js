import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'Otto0622boca',
    database: 'valeriana_db'
};

const connection = await mysql.createConnection(config);

export class UserModel {
    static async create ({ input }) {

        const {user_name, user_roleId, user_password, email_address, first_name, last_name} = input;

        const [uuidResult] = await connection.query ('SELECT UUID() uuid');
        const [{ uuid }] = uuidResult;

        await connection.query(
            `INSERT INTO users (user_id, user_name, user_roleId, user_password, email_address, first_name, last_name)
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
            [uuid, user_name, user_roleId, user_password, email_address, first_name, last_name]
        );

        const [newUser] = await connection.query (
            `SELECT BIN_TO_UUID(user_id) user_id, user_name, user_roleId, email_address, email_isValidated, first_name, last_name, created_at FROM users WHERE user_id = UUID_TO_BIN('${uuid}');`
        );

        return newUser[0];
    }

    static async deleteById ({ input }) {

        const { user_id } = input;
        await connection.query(
            'DELETE FROM users WHERE user_id = UUID_TO_BIN(?);', [user_id]
        )
    }

    static async login ({ input }) {

        const { email_address } = input;
        const [user] = await connection.query(
            'SELECT BIN_TO_UUID(user_id) user_id, user_name FROM users WHERE email_address = ?', [email_address]
        );

        return user[0];
    }

    static async getPassword ({ input }) {

        const { email_address } = input;
        const [user] = await connection.query(
            'SELECT user_password FROM users WHERE email_address = ?', [email_address]
        );

        return user[0];
    }
}