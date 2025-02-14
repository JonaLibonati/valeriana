
import { google } from "googleapis";
import { GoogleModel } from "../models/apiGoogle.js";
import { request } from 'https';
import e from "express";

const oauth2Client = new google.auth.OAuth2(
  '214861858156-sor93kn7o4dip11om8r3sv8u79afuf30.apps.googleusercontent.com',
  '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',
  'http://localhost:5173/google/oauthcallback',
);

const calendar = google.calendar("v3");

export class GoogleController {
	static async oauth(req, res) {
		try {
			// generate a url that asks permissions Google Calendar scopes
			const scopes = [
				'https://www.googleapis.com/auth/calendar.app.created'
			];

			const url = oauth2Client.generateAuthUrl({
				// 'online' (default) or 'offline' (gets refresh_token)
				access_type: 'offline',
				// Enable incremental authorization. Recommended as a best practice.
				include_granted_scopes: true,

				// If you only need one scope, you can pass it as a string
				scope: scopes
			});
			/* res.status(200).redirect(url) */
			res.status(200).json({oauthUrl : url})
		} catch (e) {
			console.error(e);
		}
	}

	static async oauthCallback(req, res) {

		let tokens;

		try {
			tokens = await oauth2Client.getToken(req.body.code)
			console.log('Tokens obteined')
		} catch (e) {
			console.log(e)
			try {
				if (e.response.data.error == "invalid_grant") {
					return res.status(400).json({ code: "ER_GOOGLE_INVALID_GRANT" });
				} else return res.status(400).json({ code: "ER_UNKNOWN_WHEN_GETTING_TOKEN" });
			} catch {
				return res.status(400).json({ code: "ER_UNKNOWN_WHEN_GETTING_TOKEN" });
			}
		}

		const input = {
			user_id: req.body.payload.user_id,
			google_refresh_token: tokens.tokens.refresh_token,
			google_scope: tokens.tokens.scope
		};

		const saving_result = await DataBase.saveTokens({ input })

		if (saving_result == 'TOKENS_SAVED') {
			res.status(200).json({ code : 'TOKENS_SAVED'})
		} else if (saving_result == "ER_DUP_ENTRY") {
			const updating_result = await DataBase.updateTokens({ input })
			if ( updating_result == 'TOKENS_UPDATED') {
				res.status(200).json({ code : 'TOKENS_UPDATED'})
			} else {
				res.status(400).json({ code: "ER_UNKNOWN_WHEN_UPDATING_TOKEN", e: updating_result})
			}
		} else if (saving_result == "ER_BAD_NULL_ERROR") {
			res.status(400).json({ code: "ER_BAD_NULL_ERROR" })
		} else {
			res.status(400).json({ code: "ER_UNKNOWN_WHEN_SAVING_TOKEN", e: saving_result})
		}
	}

	static async revokeTokens(req, res) {
		/* Revoke Token in data base */

		let postData = "token=" + req.body.google_refresh_token;

		// Options for POST request to Google's OAuth 2.0 server to revoke a token
		let postOptions = {
			host: 'oauth2.googleapis.com',
			port: '443',
			path: '/revoke',
			method: 'POST',
			headers: {
			  'Content-Type': 'application/x-www-form-urlencoded',
			  'Content-Length': Buffer.byteLength(postData)
			}
		  };

		  // Set up the request
		  const postReq = request(postOptions, function (res) {
			res.setEncoding('utf8');
			res.on('data', d => {
			  console.log('Response: ' + d);
			});
		  });

		  postReq.on('error', e => {
			console.log(e)
			req.status(400).json({e: e})
		  });

		  // Post the request with data
		  postReq.write(postData);
		  postReq.end();
	}

	static async createCalendar(req, res) {

		const input = {
			user_id: req.body.payload.user_id,
			refresh_token: req.body.google_refresh_token
		};

		const check_calendar_db = await DataBase.getCalendarId({ input })

		if (check_calendar_db.code == "CALENDAR_ID_FOUND") {
			input.google_calendar_id = check_calendar_db.data.google_calendar_id
			const check_calendar_access = await GoogleAPI.getCalendar({ input })

			console.log(check_calendar_access)

			if (check_calendar_access.code == 'GOOGLE_CALENDAR_FOUND_AND_GRANTED') {
				res.status(200).json({code: 'GOOGLE_CALENDAR_ALREADY_CREATED', google_data: check_calendar_access.data, db_data: check_calendar_db.data})
			}
		}

		/* const res_google = await GoogleAPI.createCalendar(req.body.google_refresh_token)

		if (res_google.code == "GOOGLE_CALENDAR_CREATED") {

			input.google_calendar_id = res_google.data.id

			const res_database = await DataBase.updateCalendar({ input })
			if ( res_database.code == 'CALENDAR_ID_UPDATED' ) {
				res.status(200).json({code: 'GOOGLE_CALENDAR_CREATED_AND_ID_SAVED', google_data: res_google.data, db_data: res_database.data})
			} else {
				res.status(400).json({code: 'ER_GOOGLE_CALENDAR_CREATED_BUT_ID_NOT_SAVED', google_data: res_google.data, db_data: res_database.data})
			}
		} else {
			res.status(400).json({code, data})
		} */
	}

	static async getCalendar(req, res) {

		try {

			oauth2Client.setCredentials({refresh_token : req.body.google_refresh_token});

			const result = await calendar.calendars.get({
				auth: oauth2Client,
				calendarId: req.body.google_calendar_id,});

			console.log(result.data)
			res.status(200).json(result.data)
		} catch (e) {
			try {
				if (e.response.data.error == "invalid_grant") {
					res.status(400).json({code : 'ER_GOOGLE_INVALID_GRANT', e})
				} else if (e.status == 404) {
					res.status(404).json({code : 'ER_GOOGLE_CALENDAR_NOT_FOUND', e})
				} else res.status(400).json({code : 'ER_UNKNOWN_WHEN_DELETING_GOOGLE_CALENDAR', e})
			} catch {
				res.status(400).json({code : 'ER_UNKNOWN_WHEN_DELETING_GOOGLE_CALENDAR', e})
			}
		}
	}

	static async deleteCalendar(req, res) {
		try {

			oauth2Client.setCredentials({refresh_token : req.body.google_refresh_token});

			const result = await calendar.calendars.delete({
				auth: oauth2Client,
				calendarId: "0c7ed3989072933807266315e745d32d810d1ef6bdbe8cf264246f7642c8ea6d@group.calendar.google.com",});

			console.log(result.data)
			res.status(200).json(result.data)
		} catch (e) {
			try {
				if (e.response.data.error == "invalid_grant") {
					res.status(400).json({code : 'ER_GOOGLE_INVALID_GRANT', e})
				} else if (e.status == 404) {
					res.status(404).json({code : 'ER_GOOGLE_CALENDAR_NOT_FOUND', e})
				} else res.status(400).json({code : 'ER_UNKNOWN_WHEN_DELETING_GOOGLE_CALENDAR', e})
			} catch {
				res.status(400).json({code : 'ER_UNKNOWN_WHEN_DELETING_GOOGLE_CALENDAR', e})
			}
		}
	}

}

class DataBase {
	static async saveTokens({ input }) {

		try {
			await GoogleModel.saveTokens({ input })
			return 'TOKENS_SAVED'
		} catch (e) {
			if (e.code === "ER_DUP_ENTRY") {
				return "ER_DUP_ENTRY";
			} else {
				return e;
			};
		}
	}

	static async updateTokens({ input }) {
		/* Save Token in data base */
		try {
			await GoogleModel.updateTokens({ input })
			return 'TOKENS_UPDATED'
		} catch (e) {
			return e;
		};
	}

	static async updateCalendar ({ input }) {
		try {
			const data =  await GoogleModel.updateCalendarId({ input })

			console.log(data)
			return {code: 'CALENDAR_ID_UPDATED', data: data}
		} catch (e) {
			return {code: 'ER_CALENDAR_ID_NOT_UPDATED', data: e}
		}
	}

	static async getCalendarId ({ input }) {
		try {
			const data =  await GoogleModel.getCalendarId({ input })
			return {code: 'CALENDAR_ID_FOUND', data: data}
		} catch (e) {
			return {code: 'ER_CALENDAR_ID_NOT_FOUND', data: e}
		}
	}
}

class GoogleAPI {
	static async createCalendar( refresh_token ) {
		try {

			oauth2Client.setCredentials({ refresh_token });

			const testCalendar = {
				"summary": 'Valeriana',
				"description": 'Valeriana app calendar',
			}

			const result = await calendar.calendars.insert({
				auth: oauth2Client,
				resource: testCalendar,});

			return {code: "GOOGLE_CALENDAR_CREATED", data: result.data}
		} catch (e) {
			try {
				if (e.response.data.error == "invalid_grant") {
					return {code: "ER_GOOGLE_INVALID_GRANT", data: e}
				} else return {code: "ER_UNKNOWN_WHEN_CREATING_GOOGLE_CALENDAR", data: e}
			} catch {
				return {code: "ER_UNKNOWN_WHEN_CREATING_GOOGLE_CALENDAR", data: e}
			}
		}
	}

	static async getCalendar( { input } ) {

		const { refresh_token, google_calendar_id } = input

		try {

			oauth2Client.setCredentials({ refresh_token });

			const result = await calendar.calendars.get({
				auth: oauth2Client,
				calendarId: google_calendar_id,});

			console.log(result.data)
			return {code: "GOOGLE_CALENDAR_FOUND_AND_GRANTED", data: result.data}
		} catch (e) {
			try {
				if (e.response.data.error == "invalid_grant") {
					return {code: "ER_GOOGLE_INVALID_GRANT", data: e}
				} else if (e.status == 404) {
					return {code: "ER_GOOGLE_CALENDAR_NOT_FOUND", data: e}
				} else return {code: "ER_UNKNOWN_WHEN_GETTING_GOOGLE_CALENDAR", data: e}
			} catch {
				return {code: "ER_UNKNOWN_WHEN_GETTING_GOOGLE_CALENDAR", data: e}
			}
		}
	}
}