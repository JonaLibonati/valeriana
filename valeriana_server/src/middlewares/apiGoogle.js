import { GoogleModel } from "../models/apiGoogle.js";

export class GoogleMiddelwares {
    static async getTokens (req, res, next) {
		try {
			const input = {
				user_id: req.body.payload.user_id,
			};

			const data = await GoogleModel.getTokens({ input });

            req.body.google_refresh_token = data.google_refresh_token;
			next()
		} catch (e) {
			console.error(e);
			res.status(400).json({error: e});
		}
	}

	static async getCalendarId (req, res, next) {
		try {
			const input = {
				user_id: req.body.payload.user_id,
			};

			const data =  await GoogleModel.getCalendarId({ input })
			req.body.google_calendar_id = data.google_calendar_id

			next()
		} catch (e) {
			console.error(e);
			res.status(400).json({error: e});
		}
	}
}
