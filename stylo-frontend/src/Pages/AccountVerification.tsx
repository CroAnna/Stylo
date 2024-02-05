import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { validateAccount } from "../api/users";

const AccountVerification = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activation_token = searchParams.get("activation_token");

  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await validateAccount(activation_token);
        setToken(response);
      } catch (error) {
        console.error("Something is wrong:", error);
      }
    };

    if (activation_token) {
      fetchData();
    }
  }, [activation_token]);

  return (
    <div className="flex items-center justify-center h-screen bg-white-light">
      <h1 className="text-gray-dark font-bold text-6xl text-center">
        Uspješno ste aktivirali račun!
      </h1>
    </div>
  );
};

export default AccountVerification;
