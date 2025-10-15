// import { useEffect, useState } from "react";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   thumbnail: string;
// }

// export function useProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     getProducts()
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError(" Error");
//         setLoading(false);
//       });
//   }, []);

//   return { products, loading, error };
// }
