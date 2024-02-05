import { apiUrl } from "./api";

export async function redirectToStripe(cartData: object) {
  const response = await fetch(`${apiUrl}/payments/web/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartData),
  });
  const data = await response.json();

  if (!response.ok) {
    // console.log(data.error);
    return data.error;
  } else {
    //console.log(data);
  }
  return data;
}
