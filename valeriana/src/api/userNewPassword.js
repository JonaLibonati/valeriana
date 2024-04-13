export class UserNewPassword {
  static async sendEmail(userData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const res = await fetch("/v1/users/send/PasswordEmail", options);
    const body = await res.json();
    return { res, body };
  }

  static async setNewPass() {

    const res = await fetch("/v1/users/sendPasswordEmail", options);
    const body = await res.json();
    return { res, body };
  }
}
