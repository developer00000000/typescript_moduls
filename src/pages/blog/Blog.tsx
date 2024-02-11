import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../components/fetchData";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom"; // Ekledik
import "../blog/category.css"; 

interface DataItem {
  id: number; // id ekledik
  image: string;
  category: string;
  title: string;
  price: string;
}

const Category: React.FC = () => {
  const dispatch = useDispatch();

  const dataState = useSelector((state: RootState) => state.getData);
  const { data: DataFetch, loading } = dataState;

  useEffect(() => {
    dispatch(fetchData('https://fakestoreapi.com/products'));
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return <div className="loading">Loading...</div>; 
  } if (!DataFetch.length) {
    return <div className="loading">Loading...</div>; 
  }

  const filteredData = DataFetch.filter((data: DataItem) => {
    return data.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
           data.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const categoryCardsData = filteredData.map((data: DataItem) => ( // index'i kaldırdık
    <Link key={data.id} to={`/blog/${data.id}`} className="category_card"> {/* Link ekledik */}
      <img src={data.image} alt="" />
      <p>{data.category}</p>
      <p>{data.title}</p>
      <h5>{data.price} $</h5>
    </Link>
  ));

  return (
    <div className="category container">
      <h5 className="category_title">Shop by Category</h5>
      <input 
        className="clothes_input"
        type="text" 
        placeholder="Search by category or name" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <div className="category_box">
        {categoryCardsData}
      </div>
    </div>
  );
};

export default Category;


