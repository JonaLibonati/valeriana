
export const redirectController = (res, body) => {
    if (res.status === 498 && body.code === 'ER_TOKEN_DENIED') {
      window.location.href = '/app/login';
    } else if (res.status === 401 && body.code === 'ER_EMAIL_NO_VALIDATED') {
      window.location.href = '/app/validate';
    }
  }
  