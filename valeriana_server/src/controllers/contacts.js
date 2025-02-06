import {
  ContactPatientModel,
  ContactPsychologistModel,
} from "../models/contacts.js";

export class ContactPsychologistController {
  static async create(req, res) {
    try {
      const input = {
        psychologist_id: req.body.user_id,
        patient_id: req.body.payload.user_id,
      };
      const contactList = await ContactPsychologistModel.create({ input });
      res.status(201).json({ contactList: contactList });
    } catch (e) {
      console.error(e);
      if (e.code === "ER_DUP_ENTRY") {
        res.status(400).json({ code: "ER_DUP_ENTRY" });
      } else if (e.sqlMessage.includes("ER_PSYCHOLOGIST_PATIENT_ONLY")) {
        res.status(400).json({ code: "ER_PSYCHOLOGIST_PATIENT_ONLY" });
      } else res.status(400).send();
    }
  }

  static async delete(req, res) {
    try {
      const input = {
        patient_id: req.body.payload.user_id,
      };
      const contactList = await ContactPsychologistModel.delete({ input });
      res.status(201).json({ contactList: contactList });
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }

  static async getContactList(req, res) {
    try {
      const input = {
        patient_id: req.body.payload.user_id,
      };
      const contactList = await ContactPsychologistModel.getContatctList({
        input,
      });
      res.status(200).json({ contactList: contactList });
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }
}

export class ContactPatientController {
  static async getContactList(req, res) {
    try {
      const input = {
        psychologist_id: req.body.payload.user_id,
      };
      const contactList = await ContactPatientModel.getContatctList({
        input,
      });
      res.status(200).json({ contactList: contactList });
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }

  static async delete(req, res) {
    try {
      const input = {
        patient_id: req.body.user_id,
        psychologist_id: req.body.payload.user_id
      };
      const contactList = await ContactPatientModel.delete({ input });
      res.status(201).json({ contactList: contactList });
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }

  static async accept(req, res) {
    try {
      const input = {
        patient_id: req.body.user_id,
        psychologist_id: req.body.payload.user_id
      };
      const contactList = await ContactPatientModel.accept({ input });
      res.status(201).json({ contactList: contactList });
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }
}

