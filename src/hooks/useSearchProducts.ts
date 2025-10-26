import { useState, useEffect, useDeferredValue } from "react";

const girlCategories = [
  "beauty",
  "womens-dresses",
  "womens-shoes",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
];

export function useSearchProducts(query: string) {
  const deferredQuery = useDeferredValue(query);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!deferredQuery.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);

    fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(deferredQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        let results = data.products || [];

        results = results.filter((p: any) =>
          girlCategories.includes(p.category)
        );

        setProducts(results);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [deferredQuery]);

  return { products, loading, deferredQuery };
}
