const BASE_URL_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_ENDPOIONT;

const useContact = () => {
  const saveQuestion = async (data: any) => {
    try {
      const response = await fetch(`${BASE_URL_BACKEND_API}/question/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  };

  return {
    saveQuestion
  };
};

export default useContact;
