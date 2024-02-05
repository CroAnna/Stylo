import { apiUrl } from "./api";

export async function getProductCategories(type: string) {
  const response = await fetch(`${apiUrl}/categories/${type}`);
  const data = await response.json();

  if (!response.ok) {
    //console.log(data.error);
    return data.error;
  } else {
    // console.log(data);
  }
  return data;
}
