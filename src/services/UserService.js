const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:3333/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return [json, response];
  } catch (err) {
    throw new Error(err);
  }
}

export {
  getUsers
}