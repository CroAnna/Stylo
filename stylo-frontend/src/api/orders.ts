import { apiUrl } from "./api";

export async function addOrder(data) {
  const response = await fetch(`${apiUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  if (!response.ok) {
    // console.log(responseData.error);
    return responseData.error;
  } else {
    //console.log(responseData);
  }

  return responseData;
}
