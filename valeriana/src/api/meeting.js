export class meeting {
  static async create(meetingData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetingData),
    };
    const res = await fetch("/v1/meeting", options);
    const body = await res.json();

    return { res, body };
  }

  static async delete(meetingData) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetingData),
    };

    const res = await fetch("/v1/meeting", options);
    const body = await res.json();

    return { res, body };
  }

  static async getMeetingList() {
    const res = await fetch("/v1/meeting");
    const body = await res.json();

    return { res, body };
  }
}
