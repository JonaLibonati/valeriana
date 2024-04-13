export const userCreate = async (userData) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch("/v1/users", options)
      .then(res => res.json())
      .catch(error => error);

    return response;
  };