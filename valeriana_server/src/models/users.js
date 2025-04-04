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

        const newUser = await this.getUser({ input: {user_id: uuid} })

        return newUser;
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

    static async searchUser ({ input }) {
        const searchValue = input;

        const [users] = await connection.query (
            `SELECT BIN_TO_UUID(user_id) user_id, user_name, user_roleId, email_address, first_name, last_name FROM users WHERE user_name = ? OR email_address = ? OR first_name = ? OR last_name = ?;`, [searchValue, searchValue, searchValue, searchValue]
        );

        console.log(users)

        return users;
    }

    static async searchPsychologist ({ input }) {
        const searchValue = input;

        const [users] = await connection.query (
            `SELECT BIN_TO_UUID(user_id) user_id, user_name, email_address, first_name, last_name FROM psychologists WHERE user_name = ? OR email_address = ? OR first_name = ? OR last_name = ?;`, [searchValue, searchValue, searchValue, searchValue]
        );

        console.log(users)

        return users;
    }

    static async isPatient ({ input }) {
        const { user_id } = input;

        console.log(user_id)

        const [[result]] = await connection.query (
            `SELECT COUNT(user_id) FROM patients WHERE user_id = UUID_TO_BIN(?);`, [user_id]
        );

        console.log("isPatient:", result['COUNT(user_id)'])

        return result['COUNT(user_id)'];
    }

    static async isPsychologist ({ input }) {
        const { user_id } = input;

        const [bool] = await connection.query (
            `SELECT COUNT(user_id) FROM psychologists WHERE user_id = UUID_TO_BIN(?);`, [user_id]
        );

        console.log("isPsychologist:", bool)

        return bool;
    }

    static async getUser ({ input }) {
        const { user_id } = input;

        const [user] = await connection.query (
            `SELECT BIN_TO_UUID(user_id) user_id, user_name, user_roleId, role_name, email_address, email_isValidated, first_name, last_name, created_at FROM users INNER JOIN roles ON users.user_roleId = roles.role_id WHERE user_id = UUID_TO_BIN(?);`, [user_id]
        );

        return user[0];
    }

    static async getUserName ({ input }) {

        const { user_id } = input;

        const [user] = await connection.query (
            `SELECT user_name FROM users WHERE user_id = UUID_TO_BIN(?);`, [user_id]
        );

        return user[0];
    }

    static async getFirstName ({ input }) {
        const { user_id } = input;

        const [user] = await connection.query (
            `SELECT first_name FROM users WHERE user_id = UUID_TO_BIN(?);`, [user_id]
        );

        return user[0];
    }

    static async getLastName ({ input }) {
        const { user_id } = input;

        const [user] = await connection.query (
            `SELECT last_name FROM users WHERE user_id = UUID_TO_BIN(?);`, [user_id]
        );

        return user[0];
    }

    static async getEmail ({ input }) {
        const { user_id } = input;

        const [user] = await connection.query (
            `SELECT email_address, email_isValidated FROM users WHERE user_id = UUID_TO_BIN(?);`, [user_id]
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

    static async getPasswordById ({ input }) {

        const { user_id } = input;
        const [user] = await connection.query(
            'SELECT user_password FROM users WHERE user_id = UUID_TO_BIN(?)', [user_id]
        );

        return user[0];
    }

    static async setUserName ({ input }) {

        const { user_name, user_id } = input;

        await connection.query(
            'UPDATE users SET user_name = ? WHERE user_id = UUID_TO_BIN(?);', [user_name, user_id]
        );

        return this.getUserName({ input });
    }

    static async setFirstName ({ input }) {

        const { first_name, user_id } = input;

        await connection.query(
            'UPDATE users SET first_name = ? WHERE user_id = UUID_TO_BIN(?);', [first_name, user_id]
        );

        return this.getFirstName({ input });
    }

    static async setLastName ({ input }) {

        const { last_name, user_id } = input;

        await connection.query(
            'UPDATE users SET last_name = ? WHERE user_id = UUID_TO_BIN(?);', [last_name, user_id]
        );

        return this.getLastName({ input });
    }

    static async setEmail ({ input }) {

        const { email_address, user_id } = input;

        await connection.query(
            'UPDATE users SET email_address = ?, email_isValidated = 0 WHERE user_id = UUID_TO_BIN(?);', [email_address, user_id]
        );

        return this.getEmail({ input });
    }

    static async validateEmail ({ input }) {

        const { user_id } = input;

        await connection.query(
            'UPDATE users SET email_isValidated = 1 WHERE user_id = UUID_TO_BIN(?);', [user_id]
        );

        return this.isEmailValidated({ input });
    }

    static async setPassword ({ input }) {

        const { email_address, user_password } = input;
        await connection.query(
            'UPDATE users SET user_password = ? WHERE email_address = ?;', [user_password, email_address]
        );
    }

    static async isEmailValidated ({ input }) {

        const { user_id } = input;

        const [user] = await connection.query(
            'SELECT email_isValidated FROM users WHERE user_id = UUID_TO_BIN(?)', [user_id]
        );

        return user[0];
    }
}