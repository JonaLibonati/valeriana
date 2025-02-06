import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Otto0622boca",
  database: "valeriana_db",
};

const connection = await mysql.createConnection(config);

export class ContactPsychologistModel {
  static async create({ input }) {
    const { psychologist_id, patient_id } = input;

    await connection.query(
      `INSERT INTO psychologists_patients (psychologist_id, patient_id)
            VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?));`,
      [psychologist_id, patient_id]
    );

    const list = await this.getContatctList({ input });

    return list;
  }

  static async delete({ input }) {
    const { patient_id } = input;

    await connection.query(
      `DELETE FROM psychologists_patients WHERE patient_id = UUID_TO_BIN(?);`,
      [patient_id]
    );

    const list = await this.getContatctList({ input });

    return list;
  }

  static async getContatctList({ input }) {
    const { patient_id } = input;

    const [list] = await connection.query(
      `SELECT BIN_TO_UUID(psychologist_patient_id) psychologist_patient_id, BIN_TO_UUID(user_id) user_id, user_name, user_roleId, email_address, email_isValidated, first_name, last_name, created_at, isAccepted
        FROM psychologists_patients
        INNER JOIN users ON users.user_id = psychologists_patients.psychologist_id
        WHERE patient_id = UUID_TO_BIN(?);`,
      [patient_id]
    );

    console.log(list);

    return list;
  }

  static async isAccepted({ input }) {
    const { patient_id } = input;

    const [res] = await connection.query(
      `SELECT isAccepted
        FROM psychologists_patients
        WHERE patient_id = UUID_TO_BIN(?);`,
      [patient_id]
    );

    return res[0];
  }
}

export class ContactPatientModel {
  static async getContatctList({ input }) {
    const { psychologist_id } = input;

    const [list] = await connection.query(
      `SELECT BIN_TO_UUID(psychologist_patient_id) psychologist_patient_id, BIN_TO_UUID(user_id) user_id, user_name, user_roleId, email_address, email_isValidated, first_name, last_name, created_at, isAccepted
        FROM psychologists_patients
        INNER JOIN users ON users.user_id = psychologists_patients.patient_id
        WHERE psychologist_id = UUID_TO_BIN(?);`,
      [psychologist_id]
    );

    console.log(list);

    return list;
  }

  static async delete({ input }) {
    const { patient_id, psychologist_id } = input;

    console.log( patient_id, psychologist_id)

    await connection.query(
      `DELETE FROM psychologists_patients WHERE patient_id = UUID_TO_BIN(?) AND psychologist_id = UUID_TO_BIN(?);`,
      [patient_id, psychologist_id]
    );

    const list = await this.getContatctList({ input });

    return list;
  }

  static async accept({ input }) {
    const { patient_id, psychologist_id } = input;

    console.log( patient_id, psychologist_id)

    await connection.query(
      `UPDATE psychologists_patients SET isAccepted = 1 WHERE patient_id = UUID_TO_BIN(?) AND psychologist_id = UUID_TO_BIN(?);`,
      [patient_id, psychologist_id]
    );

    const list = await this.getContatctList({ input });

    return list;
  }

}
