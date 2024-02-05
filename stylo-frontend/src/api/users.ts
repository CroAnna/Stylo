import { apiUrl } from "./api";

export async function registerUser(userData: object) {
  const response = await fetch(`${apiUrl}/customers/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (response.ok) {
    return true;
  }

  if (!response.ok) {
    return false;
  }

  return data;
}

export async function validateAccount(token: string | undefined | null) {
  const response = await fetch(
    `${apiUrl}/customers/activate?activation_token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    // console.log(`response.status: ${response.status}`);
    //console.log("Token u metodi je", token);
  }

  return data;
}

export async function loginUser(userData: object) {
  const response = await fetch(`${apiUrl}/customers/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    // console.log(data.error);
    return data.error;
  }

  return data;
}

export async function deleteUser(userId: string) {
  const response = await fetch(`${apiUrl}/customers/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    //console.log(data.error);
    return data.error;
  }

  return data;
}
