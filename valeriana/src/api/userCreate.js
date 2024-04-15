export const userCreate = async (userData) => {
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