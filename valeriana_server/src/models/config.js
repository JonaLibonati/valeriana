import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Otto0622boca",
  database: "valeriana_db",
};

const connection = await mysql.createConnection(config);

export class ConfigModel {
  static async create({ input }) {
    const { user_id } = input;

    await connection.query(
      `INSERT INTO config (user_id)
        VALUES(UUID_TO_BIN(?));`,
      [user_id]
    );

    const list = await this.getConfig({ input });

    return list;
  }

  static async delete({ input }) {
    const { user_id } = input;

    await connection.query(
      `DELETE FROM Config WHERE user_id = UUID_TO_BIN(?);`,
      [user_id]
    );
  }

  static async getConfig({ input }) {
    const { user_id } = input;

    const [list] = await connection.query(
      `SELECT BIN_TO_UUID(config.user_id) user_id, general_lang, general_theme, calendar_locale, calendar_time_zone, calendar_time_zones_list
        FROM config
        WHERE user_id = UUID_TO_BIN(?);`,
      [user_id]
    );

    console.log(list);

    return list;
  }

  static async setCalendarLocale({ input }) {
    const { calendar_locale, user_id } = input;

    await connection.query(
      'UPDATE users SET calendar_locale = ? WHERE user_id = UUID_TO_BIN(?);', [calendar_locale, user_id]
    );

    const list = await this.getConfig({ input });

    return list;
  }

  static async setCalendarTimeZone({ input }) {
    const { calendar_time_zone, user_id } = input;

    await connection.query(
      'UPDATE users SET calendar_time_zone = ? WHERE user_id = UUID_TO_BIN(?);', [calendar_time_zone, user_id]
    );

    const list = await this.getConfig({ input });

    return list;
  }

  static async setCalendarTimeZonesList({ input }) {
    const { calendar_time_zones_list, user_id } = input;

    await connection.query(
      'UPDATE users SET calendar_time_zones_list = ? WHERE user_id = UUID_TO_BIN(?);', [calendar_time_zones_list, user_id]
    );

    const list = await this.getConfig({ input });

    return list;
  }

}
