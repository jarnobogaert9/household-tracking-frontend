const getTasks = async () => {
  try {
    const response = await fetch("http://localhost:3333/api/v1/tasks", {
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

const createTask = async ({ data }) => {
  try {
    const response = await fetch("http://localhost:3333/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
  } catch (err) {
    throw new Error(err);
  }
}

export {
  getTasks,
  createTask
}