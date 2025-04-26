import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Otto0622boca",
  database: "valeriana_db",
  timezone: '+00:00',
};

const connection = await mysql.createConnection(config);

export class MeetingsModel {
  static async create({ input }) {
    const { meeting_start_time, meeting_duration, psychologist_patient_id } = input;

    await connection.query(
      `INSERT INTO meetings (meeting_start_time, meeting_duration, psychologist_patient_id)
        VALUES(?, ?, UUID_TO_BIN(?));`,
      [meeting_start_time, meeting_duration, psychologist_patient_id]
    );

    const list = await this.getMeetingsList({ input });

    return list;
  }

  static async delete({ input }) {
    const { meeting_id } = input;

    await connection.query(
      `DELETE FROM meetings WHERE meeting_id = UUID_TO_BIN(?);`,
      [meeting_id]
    );

    const list = await this.getMeetingsListByPsychologistsPatients({ input });

    return list;
  }

  static async getMeetingsListByPsychologistsPatients({ input }) {
    const { psychologist_patient_id } = input;

    const [list] = await connection.query(
      `SELECT BIN_TO_UUID(meeting_id) meeting_id, meeting_start_time, meeting_duration, meeting_end_time
        FROM meetings
        WHERE psychologist_patient_id = UUID_TO_BIN(?);`,
      [psychologist_patient_id]
    );

    console.log(list);

    return list;
  }

  static async getMeetingsList({ input }) {
    const { user_id } = input;

    const [list] = await connection.query(
      `SELECT BIN_TO_UUID(meeting_id) meeting_id, BIN_TO_UUID(meetings.psychologist_patient_id) psychologist_patient_id, BIN_TO_UUID(psychologist_id) psychologist_id, BIN_TO_UUID(patient_id) patient_id, meeting_start_time, meeting_end_time, meeting_duration
        FROM meetings
        INNER JOIN psychologists_patients ON psychologists_patients.psychologist_patient_id = meetings.psychologist_patient_id
        WHERE psychologist_id = UUID_TO_BIN(?) OR patient_id = UUID_TO_BIN(?)
        ORDER BY psychologist_patient_id, meeting_start_time;`,
      [user_id, user_id]
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
