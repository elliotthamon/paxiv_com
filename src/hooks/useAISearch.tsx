import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const BASE_URL_BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

const useAISearch = () => {
  const authContext = useContext(AuthContext);
  const createAISearch = async (data: any) => {
    try {
      const user = authContext.getUser();
      data.firstname = user.firstname;
      data.lastname = user.lastname;
      data.email = user.email;
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/aisearch/createAISearch`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();
      if (response.ok) {
        return { status: true, data: res };
      } else {
        return { status: false, data: res.message };
      }
    } catch (e: any) {
      return { status: false, data: "Error occured, Try again later" };
    }
  };

  return {
    createAISearch,
  };
};

export default useAISearch;
