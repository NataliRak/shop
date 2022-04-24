import styled from "styled-components";
import { useEffect, useState } from "react";
import Product from "./Product";
import SearchInput from "./SearchInput/SearchInput";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products/"
        );
        setProducts(res.data);
        console.log(res);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter(item =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    setSearchValue("");
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  //  search input
  const handleSearchValue = e => {
    setSearchValue(e.target.value);
  };

  const getSearchedProducts = () => {
    const searchedProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchValue)
    );
    return searchedProducts;
  };

  const searchedProducts = getSearchedProducts();
  console.log(searchedProducts);

  return (
    <>
      {cat ? (
        <SearchInput search={handleSearchValue} value={searchValue} />
      ) : (
        cat
      )}

      <Container>
        {cat
          ? searchedProducts.map(item => <Product item={item} key={item.id} />)
          : products
              .slice(0, 10)
              .map(item => <Product item={item} key={item.id} />)}
      </Container>
    </>
  );
};
export default Products;
