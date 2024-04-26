
export class SelfUser {
  static async getAll() {
    const res = await fetch("/v1/users/self");
    const body = await res.json();
    if (res.status === 498 && body.code === 'ER_TOKEN_DENIED') {
      window.location.href = '/app/login';
    } else if (res.status === 401 && body.code === 'ER_EMAIL_NO_VALIDATED') {
      window.location.href = '/app/validate';
    }

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

    if (res.status === 200 && body.email_isValidated === 1) {
      window.location.href = '/app/user'; // GO TO USER HOME. To update later
    } else if (res.status === 498 && body.code === 'ER_TOKEN_DENIED') {
      window.location.href = '/app/login';
    }

    return { res, body };
  }

  static async logout() {
    const res = await fetch("/v1/users/logout");
    const body = await res.json();

    if (res.status === 498 && body.code === 'ER_TOKEN_DENIED' || res.status === 200) {
      window.location.href = '/app/login';
    }

    return { res, body };
  }
}
