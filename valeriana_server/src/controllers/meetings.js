import {
  MeetingsModel,
  PatientsMeetingModel,
  PsychologistsMeetingModel
} from "../models/meetings.js";

export class MeetingController {
  static async create(req, res) {
    try {
      const input = {
        meeting_start_time: req.body.meeting_start_time,
        meeting_duration: req.body.meeting_duration,
        psychologist_patient_id: req.body.psychologist_patient_id,
      };
      const meetingsList = await MeetingsModel.create({ input });
      res.status(201).json({ meetingsList: meetingsList });
    } catch (e) {
      console.error(e);
      if (e.code === "ER_DUP_ENTRY") {
        res.status(400).json({ code: "ER_DUP_ENTRY" });
      } else res.status(400).send();
    }
  }

  static async delete(req, res) {
    try {
      const input = {
        meeting_id: req.body.meeting_id,
      };
      const meetingsList = await MeetingsModel.delete({ input });
      res.status(201).json({ meetingsList: meetingsList });
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }

  static async getContactList(req, res) {
    try {
      const input = {
        psychologist_id: req.body.payload.user_id,
      };
      const meetingsList = await MeetingsModel.getMeetingsList({
        input,
      });
      res.status(200).json({ meetingsList: meetingsList });
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }
}