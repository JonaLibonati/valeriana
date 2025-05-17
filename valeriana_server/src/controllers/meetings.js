import { GoogleModel } from "../models/apiGoogle.js";
import { MeetingsModel } from "../models/meetings.js";
import { GoogleAPI } from "./apiGoogle.js";

export class MeetingController {
  static async create(req, res) {
    try {
      const input = {
        meeting_start_time: req.body.meeting_start_time,
        meeting_end_time: req.body.meeting_end_time,
        meeting_duration: req.body.meeting_duration,
        psychologist_patient_id: req.body.psychologist_patient_id,
        user_id: req.body.payload.user_id,
      };
      const meetingsList = await MeetingsModel.create({ input });

      const { google_calendar_is_sync } = await GoogleModel.getCalendarIsSync({ input });

      if (google_calendar_is_sync) {
        const google_meeting = await GoogleAPI.createMeeting({ input }) //
        console.log(google_meeting)
      }

      res.status(201).json(meetingsList);
    } catch (e) {
      console.error(e);
      if (e.code === "ER_DUP_ENTRY") {
        res.status(400).json({ code: "ER_DUP_ENTRY" });
      } else if (e.sqlMessage === "ER_MEETING_OVERLAPPING") {
        res.status(400).json({ code: "ER_MEETING_OVERLAPPING" });
      } else if (e.sqlMessage === "ER_MEETING_BEFORE_TODAY") {
        res.status(400).json({ code: "ER_MEETING_BEFORE_TODAY" });
      } else res.status(400).json({ e });
    }
  }

  static async delete(req, res) {
    try {
      const input = {
        meeting_id: req.body.meeting_id,
      };
      const meetingsList = await MeetingsModel.delete({ input });
      res.status(201).json(meetingsList);
    } catch (e) {
      console.error(e);
      res.status(400);
    }
  }

  static async getContactList(req, res) {
    try {
      const input = {
        user_id: req.body.payload.user_id,
      };
      const meetingsList = await MeetingsModel.getMeetingsList({
        input,
      });
      res.status(200).json(meetingsList);
    } catch (e) {
      console.error(e);
      res.status(400);
    }
  }
}