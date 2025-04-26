export class google {
    static async syncCalendar () {
        const res = await fetch("/v1/google/oauth");
        const body = await res.json();

        window.open(body.oauthUrl, '_blank').focus();
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

    static async setIsCalendarSync (value) {
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({google_calendar_is_sync: value}),
          };
        const res = await fetch("/v1/google/calendar/isSync", options);
        const body = await res.json();

        return {res, body};
    }

    static async isCalendarSync () {
        const res = await fetch("/v1/google/calendar/isSync");
        const body = await res.json();

        console.log(body)

        return {res, body};
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