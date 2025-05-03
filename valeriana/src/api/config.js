
import { redirectController } from "./redirectController";

export class Config {
  static async getConfig() {
    const res = await fetch("/v1/config");
    const body = await res.json();

    redirectController(res, body);
    return { res, body };
  }

  static async setCalendarLocale({ calendar_locale }) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ calendar_locale }),
    };
    const res = await fetch("/v1/config/calendar/locale", options);
    const body = await res.json();

    redirectController(res, body);
    return { res, body };
  }

  static async setCalendarTimeZone({ calendar_time_zone }) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ calendar_time_zone }),
    };
    const res = await fetch("/v1/config/calendar/timeZone", options);
    const body = await res.json();

    redirectController(res, body);
    return { res, body };
  }

  static async setCalendarTimeZoneList({ calendar_time_zones_list }) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ calendar_time_zones_list }),
    };
    const res = await fetch("/v1/config/calendar/timeZoneList", options);
    const body = await res.json();

    redirectController(res, body);
    return { res, body };
  }
}

