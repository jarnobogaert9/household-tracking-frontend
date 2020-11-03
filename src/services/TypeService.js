const getTypes = async () => {
  try {
    const response = await fetch("http://localhost:3333/api/v1/types", {
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

const createType = async ({data}) => {
  try {
    const response = await fetch(`http://localhost:3333/api/v1/types`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    return [json, response];
  } catch (err) {
    throw new Error(err);
  }
}

export {
  getTypes,
  createType
}