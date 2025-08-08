import axios from "axios";
import { useEffect, useState } from "react";

const useFetchProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const linkApi = "https://dummyjson.com/products";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(linkApi);
        setData(res.data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, loading, error };
};

export default useFetchProducts;
