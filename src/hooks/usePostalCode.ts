import axios from "axios";

export const searchColoniaAlcaldia = async (postalCode: string) => {
  const res = await axios.get(
    `https://api.copomex.com/query/info_cp/${postalCode}?token=${process.env.NEXT_PUBLIC_COPOMEX_API_KEY}`
  );
  return res.data;
};
