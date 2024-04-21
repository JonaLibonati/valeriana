export class UserNewPassword {
  static async sendEmail(userData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const res = await fetch("/v1/users/send/passwordEmail", options);
    const body = await res.json();
    return { res, body };
  }

  static async setNewPass(userData) {

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const res = await fetch("/v1/users/self/password", options);
    const body = await res.json();
    return { res, body };
  }
}
