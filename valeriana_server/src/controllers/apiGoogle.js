
const oauth2Client = new google.auth.OAuth2(
  '214861858156-sor93kn7o4dip11om8r3sv8u79afuf30.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/',
);

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

				// If you only need one scope, you can pass it as a string
				scope: scopes
			});
			res.status(200).redirect(url)
		} catch (e) {
			console.error(e);
		}
	}

	static async oauthCallback(req, res) {
		try {
			const data = req.originalUrl.split('?')[1]
			const code = data.split('&')[0].split('=')[1]
			const scope = data.split('&')[1].split('=')[1]

			console.log(`code: ${code}`)
			console.log(`scope: ${scope}`)

      const {tokens} = await oauth2Client.getToken(code)

			/* Save Token in data base */

			console.log(`scope: ${scope}`)
		} catch (e) {
			console.error(e);
		}
	}

	static async createCalendar(req, res) {
		try {
			console.log('-------')

			/* Select saved token from data base */

			const tokens = {
				access_token: 'ya29.a0AXeO80QZZSbnY53OnVHDJ-g07RXCvjU-SDNsnCDQgg3iTQ40APL7Ax_cdowLoREiw029iAh-baJWCCmRqqDVt7XreiCECTZvkbfJg1KkRp7P8m81ANngcZ_K6Spk9bjhugJDtpigV1cqAYWT7VoWs3qhDB8qyKw_QgzJwB94aCgYKAQ0SARESFQHGX2MiZ0MvCWKB3qEttuJDF4onjQ0175',
				refresh_token: '1//0hFcSDCnZ8B5_CgYIARAAGBESNwF-L9IrBU7zIc7smrInz81BHNhuZCwZYL1jKNbbOjg77mCyOmmaHQIA0QH_o4RvELCRtvhhu80',
				scope: 'https://www.googleapis.com/auth/calendar.app.created',
				token_type: 'Bearer',
				expiry_date: 1738992096177
			}

			console.log(tokens)

			/* const oauth = new google.auth.OAuth2(
				'214861858156-sor93kn7o4dip11om8r3sv8u79afuf30.apps.googleusercontent.com',
				'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',
			); */

			oauth.setCredentials(tokens);

			const testCalendar = {
				"summary": 'Calendario-Test',
				"description": 'test',
			}

			const result = await calendar.calendars.insert({
				auth: oauth,
				resource: testCalendar,});

			console.log(result.data)
			res.status(200).send()
		} catch (e) {
			console.error(e);
		}
	}
}

