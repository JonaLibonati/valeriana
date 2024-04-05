export const userLogin = async (loginData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  const response = await fetch("/v1/users/login", options)
    .then((res) => {
        if(res.status === 401 ) throw new Error("Unauthorized access. Please check email and password");
        return res.json()
    })
    .catch((error) => error);

  return response;
};