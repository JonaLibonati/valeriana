export class User {
  static async search({ value }) {
    const res = await fetch(`/v1/users/search?value=${value}`);
    const body = await res.json();
    return { res, body: body.users};
  }

  static async searchDoctor ({ value }) {
    const res = await fetch(`/v1/users/search/doctor?value=${value}`);
    const body = await res.json();
    return { res, body: body.users};
  }

  static async searchPsychologist ({ value }) {
    const res = await fetch(`/v1/users/search/psychologist?value=${value}`);
    const body = await res.json();
    return { res, body: body.users};
  }
}
