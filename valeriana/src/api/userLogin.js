export const userLogin = async (loginData) => {
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
};