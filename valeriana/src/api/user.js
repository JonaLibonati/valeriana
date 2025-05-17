import { redirectController } from "./redirectController";

export class User {

  static async create (userData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const res = await fetch("/v1/users", options);
    const body = await res.json();

    return { res, body };
  };

  static async logout() {
    const res = await fetch("/v1/users/logout");
    const body = await res.json();

    if (res.status === 498 && body.code === 'ER_TOKEN_DENIED' || res.status === 200) {
      window.location.href = '/app/login';
    }

    return { res, body };
  }

  static async login(loginData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };
    const res = await fetch("/v1/users/login", options);
    const body = await res.json();
    return {res, body};
  }

  static async getAll() {
    const res = await fetch("/v1/users/self");
    const body = await res.json();
    redirectController(res, body);

    return { res, body };
  }

  static async getVerificationEmail() {
    const res = await fetch("/v1/users/send/verificationEmail");
    const body = await res.json();

    if (res.status === 498 && body.code === 'ER_TOKEN_DENIED') {
      window.location.href = '/app/login';
    } else if (res.status === 400 && body.code === 'ER_EMAIL_ALREADY_VALID') {
      window.location.href = '/app/user/home'; // GO TO USER HOME. To update later
    }

    return { res, body };
  }

  static async validateEmail({ user_id }) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    };

    const res = await fetch("/v1/users/self/validateEmail", options);
    const body = await res.json();

    if (res.status === 200) {
      window.location.href = '/app/user/home';
    }

    redirectController(res, body);

    return { res, body };
  }

  static async setUserName({ user_name }) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name }),
    };
    const res = await fetch("/v1/users/self/userName", options);
    const body = await res.json();
    redirectController(res, body);

    return { res, body };
  }

  static async setFirstName({ first_name }) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name }),
    };
    const res = await fetch("/v1/users/self/firstName", options);
    const body = await res.json();
    redirectController(res, body);

    return { res, body };
  }

  static async setLastName({ last_name }) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ last_name }),
    };
    const res = await fetch("/v1/users/self/lastName", options);
    const body = await res.json();
    redirectController(res, body);

    return { res, body };
  }

  static async setEmail({ email_address, user_password }) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address, user_password }),
    };
    const res = await fetch("/v1/users/self/email", options);
    const body = await res.json();

    redirectController(res, body);

    return { res, body };
  }

  static async sendNewPassEmail(userData) {
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
