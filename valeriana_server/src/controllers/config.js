import { ConfigModel } from "../models/config.js";

export class ConfigController {

    // Creating and deleting is done with users controller
  static async getConfig(req, res) {
    try {
      const input = {
        user_id: req.body.payload.user_id,
      };

      const config = await ConfigModel.getConfig({input})

      res.status(200).json({ config });
    } catch (e) {
      console.error(e);
      res.status(400);
    }
  }
}