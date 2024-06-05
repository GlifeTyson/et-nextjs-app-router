export const fetcher = async ([query, variables]: [
  string,
  any
]): Promise<any> => {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-token": localStorage.getItem("x-token") || "",
    });
    const response = await fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }
    return data.data;
  } catch (error) {
    throw error;
  }
};
