import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Otto0622boca",
  database: "valeriana_db",
};

const connection = await mysql.createConnection(config);

export class GoogleModel {
  static async getTokens({ input }) {
    const { user_id } = input;

        const [user_tokens] = await connection.query (
            `SELECT BIN_TO_UUID(user_id) user_id, google_refresh_token, google_scope FROM googleApi WHERE user_id = UUID_TO_BIN(?);`, [user_id]
        );

        return user_tokens[0];
  }

  static async saveTokens({ input }) {
    const { user_id, google_scope, google_refresh_token } = input;

    await connection.query(
      `INSERT INTO googleApi (user_id, google_scope, google_refresh_token)
            VALUES (UUID_TO_BIN(?), ?, ?);`,
      [
        user_id,
        google_scope,
        google_refresh_token
      ]
    );

    return this.getTokens({ input });
  }

  static async updateTokens({ input }) {

    const { user_id, google_scope, google_refresh_token } = input;

    await connection.query(
        'UPDATE googleApi SET google_refresh_token = ? WHERE user_id = UUID_TO_BIN(?) and google_scope = ?;', [google_refresh_token, user_id, google_scope]
    );

    return this.getTokens({ input });
  }

  static async getCalendarId({ input }) {
    const { user_id } = input;

        const [user_tokens] = await connection.query (
            `SELECT BIN_TO_UUID(user_id) user_id, google_calendar_id FROM googleApi WHERE user_id = UUID_TO_BIN(?);`, [user_id]
        );

        return user_tokens[0];
  }

  static async updateCalendarId({ input }) {

    const { user_id, google_calendar_id } = input;

    await connection.query(
        'UPDATE googleApi SET google_calendar_id = ? WHERE user_id = UUID_TO_BIN(?);', [google_calendar_id, user_id]
    );

    return this.getCalendarId({ input });
  }
}
