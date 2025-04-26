
import { google } from "googleapis";
import { GoogleModel } from "../models/apiGoogle.js";
import { request } from 'https';

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
			console.log(req.body.code)
			tokens = await oauth2Client.getToken(req.body.code)
			console.log('Tokens obtained')
		} catch (e) {
			console.log(e)
			try {
				if (e.response.data.error == "invalid_grant") {
					return res.status(400).json({ code: "ER_GOOGLE_INVALID_GRANT", data: e});
				} else return res.status(400).json({ code: "ER_UNKNOWN_WHEN_GETTING_TOKEN", data: e });
			} catch {
				return res.status(400).json({ code: "ER_UNKNOWN_WHEN_GETTING_TOKEN", data: e });
			}
		}

		const input = {
			user_id: req.body.payload.user_id,
			google_refresh_token: tokens.tokens.refresh_token,
			google_scope: tokens.tokens.scope
		};

		const saving_result = await DataBase.saveTokens({ input })

		console.log(saving_result)

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
			console.log({ input })
			const DBRefreshToken = await DataBase.getTokens({ input })
			console.log(DBRefreshToken)
			if (DBRefreshToken.code == 'TOKEN_FOUND') {
				let testDBRefreshToken;
				try {
					testDBRefreshToken = await GoogleAPI.createCalendar(DBRefreshToken.data.google_refresh_token)
				} catch {
					return res.status(400).json({ code: "ER_GRANT_ALREADY_OBTAINED_BUT_INVALID_REFRESH_TOKEN" })
				}
				console.log(testDBRefreshToken)
				if( testDBRefreshToken.code == 'GOOGLE_CALENDAR_CREATED') {
					const input = {
						refresh_token: DBRefreshToken.data.google_refresh_token,
						google_calendar_id: testDBRefreshToken.data.id
					};
					await GoogleAPI.deleteCalendar( {input} )
					res.status(200).json({ code : 'GRANT_ALREADY_OBTAINED'})
				} else if ('ER_GOOGLE_INVALID_GRANT') {
					res.status(400).json({ code: "ER_GRANT_ALREADY_OBTAINED_BUT_INVALID_REFRESH_TOKEN" })
				}
			} else res.status(400).json({ code: "ER_BAD_NULL_ERROR" })

			
		} else {
			res.status(400).json({ code: "ER_UNKNOWN_WHEN_SAVING_TOKEN", e: saving_result})
		}
	}

	static async revokeTokens(req, res) {
		/* Revoke Token in data base */
		await GoogleAPI.revokeTokens(req.body.google_refresh_token, res)
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
				return res.status(200).json({code: 'GOOGLE_CALENDAR_ALREADY_CREATED', google_data: check_calendar_access.data, db_data: check_calendar_db.data})
			}
		}

		const res_google = await GoogleAPI.createCalendar(req.body.google_refresh_token)

		if (res_google.code == "GOOGLE_CALENDAR_CREATED") {

			input.google_calendar_id = res_google.data.id

			const res_database = await DataBase.updateCalendar({ input })
			if ( res_database.code == 'CALENDAR_ID_UPDATED' ) {
				res.status(200).json({code: 'GOOGLE_CALENDAR_CREATED_AND_ID_SAVED', google_data: res_google.data, db_data: res_database.data})
			} else {
				res.status(400).json({code: 'ER_GOOGLE_CALENDAR_CREATED_BUT_ID_NOT_SAVED', google_data: res_google.data, db_data: res_database.data})
			}
		} else {
			res.status(400).json({code: 'ER_GOOGLE_WHEN_CREATING_CALENDAR', google_data: res_google.data})
		}
	}

	static async getCalendar(req, res) {

		const input = {
			user_id: req.body.payload.user_id,
			refresh_token: req.body.google_refresh_token,
			google_calendar_id: req.body.google_calendar_id
		};

		console.log(input)

		const {code, data} = await GoogleAPI.getCalendar({ input })

		console.log(data)

		if (code == "GOOGLE_CALENDAR_FOUND_AND_GRANTED") {
			res.status(200).json({code, data})
		} else if (code == 'ER_GOOGLE_INVALID_GRANT') {
			res.status(400).json({code, data})
		} else if (code == "ER_GOOGLE_CALENDAR_NOT_FOUND") {
			res.status(404).json({code, data})
		} else if (code == "ER_UNKNOWN_WHEN_GETTING_GOOGLE_CALENDAR") {
			res.status(400).json({code, data})
		}
	}

	static async deleteCalendar(req, res) {

		const input = {
			refresh_token: req.body.google_refresh_token,
			google_calendar_id: req.body.google_calendar_id
		};

		console.log(input)

		const {code, data} = await GoogleAPI.deleteCalendar({ input })

		console.log(data)

		if (code == "GOOGLE_CALENDAR_DELETED") {
			res.status(200).json({code, data})
		} else if ('ER_GOOGLE_INVALID_GRANT') {
			res.status(400).json({code, data})
		} else if ('ER_GOOGLE_CALENDAR_NOT_FOUND') {
			res.status(404).json({code, data})
		} else res.status(400).json({code, data})
	}

	static async setCalendarIsSync (req, res) {
		const input = {
			user_id: req.body.payload.user_id,
			google_calendar_is_sync: req.body.google_calendar_is_sync
		};

		console.log(input)

		try {
			const data =  await GoogleModel.setCalendarIsSync({ input })
			res.status(200).json({data})
		} catch (e) {
			console.log(e)
			res.status(400).json({e})
		}
	}

	static async getCalendarIsSync (req, res) {

		const input = {
			user_id: req.body.payload.user_id,
		};

		try {
			const data =  await GoogleModel.getCalendarIsSync({ input })
			res.status(200).json({data})
		} catch (e) {
			res.status(400).json({e})
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
			} else if(e.code == 'ER_BAD_NULL_ERROR') {
				return "ER_BAD_NULL_ERROR";
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

	static async getTokens ({ input }) {
		try {
			const data = await GoogleModel.getTokens({ input });

			return {code: 'TOKEN_FOUND', data: data}
		} catch (e) {
			console.error(e);
			return {code: 'TOKEN_NOT_FOUND', data: e}
		}
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

	static async deleteCalendar({ input }) {

		const { refresh_token, google_calendar_id } = input

		try {

			oauth2Client.setCredentials({refresh_token});

			const result = await calendar.calendars.delete({
				auth: oauth2Client,
				calendarId: google_calendar_id,});

			console.log(result.data)

			return { code: 'GOOGLE_CALENDAR_DELETED', data: result.data}
		} catch (e) {
			try {
				if (e.response.data.error == "invalid_grant") {
					return {code : 'ER_GOOGLE_INVALID_GRANT', e}
				} else if (e.status == 404) {
					return {code : 'ER_GOOGLE_CALENDAR_NOT_FOUND', e}
				} else return {code : 'ER_UNKNOWN_WHEN_DELETING_GOOGLE_CALENDAR', e}
			} catch {
				return {code : 'ER_UNKNOWN_WHEN_DELETING_GOOGLE_CALENDAR', e}
			}
		}
	}

	static async revokeTokens( token, res ) {
		/* Revoke Token in data base */

		let code;
		let data;

		let postData = "token=" + token;

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
		  const postReq = request(postOptions, function (response) {
			response.setEncoding('utf8');
			response.on('data', d => {
				console.log('Response: ' + d);
				data = JSON.parse(d)
			  	if (data.error === undefined) {
					res.status(200).json({code: 'GOOGLE_TOKEN_REVOKED', data})
				} else res.status(400).json({code: 'ER_GOOGLE_WHEN_REVOKING_TOKEN', data})
			});

		  });

		  postReq.on('error', e => {
			console.log(e)
			res.status(400).json({code: 'ER_GOOGLE_WHEN_REVOKING_TOKEN', data:e})
		  });

		  // Post the request with data
			postReq.write(postData);
			postReq.end();
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