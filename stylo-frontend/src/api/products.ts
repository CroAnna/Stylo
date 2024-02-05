import { apiUrl } from "./api";

export async function getLayout() {
  const response = await fetch(`${apiUrl}/layout`);
  const data = await response.json();

  if (!response.ok) {
    // console.log(data.error);
    return data.error;
  }
  return data;
}

export async function getHomepage() {
  const response = await fetch(`${apiUrl}/homepage`);
  const data = await response.json();

  if (!response.ok) {
    // console.log(data.error);
    return data.error;
  }
  //console.log(data);

  return data;
}

export async function getProduct(id: string) {
  const response = await fetch(`${apiUrl}/products/${id}`);
  const data = await response.json();

  if (!response.ok) {
    // console.log(data.error);
    return data.error;
  } else {
    //console.log(data);
  }
  return data;
}

export async function getFilteredProducts(
  gender: string,
  category: string,
  size?: Array<number>,
  color?: string
) {
  let url = `${apiUrl}/products/filter?`;

  if (gender) {
    url += `gender=${gender}&`;
  }

  if (category) {
    url += `category=${category}&`;
  }

  if (size) {
    url += `size=${size[0]}&`;
  }

  if (color) {
    url += `color=${color}`;
  }
  const response = await fetch(url);

  // console.log("Moj url izgleda ovak", url);
  const data = await response.json();

  if (!response.ok) {
    // console.log(data.error);
    return data.error;
  } else {
    // console.log(data);
  }

  return data;
}
