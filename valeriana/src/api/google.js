export class Google {
    static async syncCalendar () {
        const res = await fetch("/v1/google/oauth");
        const body = await res.json();

        return {res, body}
    }

    static async syncCallback ({code, scope}) {
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({code, scope}),
          };
        const res = await fetch("/v1/google/oauthcallback", options);
        const body = await res.json();

        return {res, body}
    }

    static async serGoogleCalendarIsSync ({google_calendar_is_sync}) {
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({google_calendar_is_sync}),
          };
        const res = await fetch("/v1/google/calendar/isSync", options);
        const body = await res.json();

        return {res, body}
    }

    static async revokeToken () {
        const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };
        const res = await fetch("/v1/google/tokens", options);
        const body = await res.json();
        return {res, body}
    }

    static async getCalendar () {
        const res = await fetch("/v1/google/calendar");
        const body = await res.json();

        return {res, body};
    }

    static async createCalendar () {
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          };

        const res = await fetch("/v1/google/calendar",  options);
        const body = await res.json();

        return {res, body}
    }

    static async deleteCalendar () {
        const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };

        const res = await fetch("/v1/google/calendar",  options);
        const body = await res.json();

        return {res, body}
    }
}