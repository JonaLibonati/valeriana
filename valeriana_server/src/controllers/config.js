import { ConfigModel } from "../models/config.js";

export class ConfigController {

    // Creating and deleting is done with users controller
  static async getConfig(req, res) {
    try {
      const input = {
        user_id: req.body.payload.user_id,
      };

      const config = await ConfigModel.getConfig({input})

      res.status(200).json(config);
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }

  static async setGeneralLang(req, res) {
    try {
      const input = {
        general_lang: req.body.general_lang,
        user_id: req.body.payload.user_id,
      };
      const config = await ConfigModel.setGeneralLang({ input });
      res.status(200).json(config);
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }

  static async setGeneralTheme(req, res) {
    try {
      const input = {
        general_theme: req.body.general_theme,
        user_id: req.body.payload.user_id,
      };
      const config = await ConfigModel.setGeneralTheme({ input });
      res.status(200).json(config);
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }

  static async setCalendarLocale(req, res) {
    try {
      const input = {
        calendar_locale: req.body.calendar_locale,
        user_id: req.body.payload.user_id,
      };
      const config = await ConfigModel.setCalendarLocale({ input });
      res.status(200).json(config);
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }

  static async setCalendarTimeZone(req, res) {
    try {
      const input = {
        calendar_time_zone: req.body.calendar_time_zone,
        user_id: req.body.payload.user_id,
      };
      const config = await ConfigModel.setCalendarTimeZone({ input });
      res.status(200).json(config);
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }

  static async setCalendarTimeZonesList(req, res) {
    try {
      const input = {
        calendar_time_zones_list: req.body.calendar_time_zones_list,
        user_id: req.body.payload.user_id,
      };
      const config = await ConfigModel.setCalendarTimeZonesList({ input });
      res.status(200).json(config);
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }
}