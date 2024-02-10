import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../components/fetchData";
import { RootState } from "../../app/store";
import "../blog/category.css"; 

interface DataItem {
  image: string;
  category:string;
  title:string;
  price:string
}

const Category: React.FC = () => {
  const dispatch = useDispatch();

  const dataState = useSelector((state: RootState) => state.getData);
  const { data: DataFetch, loading } = dataState;

  useEffect(() => {
    dispatch(fetchData('https://fakestoreapi.com/products'));
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading...</div>; 
  } if (!DataFetch.length) {
    return <div className="loading">Loading...</div>; 
  }

  const categoryCardsData = DataFetch.map((data: DataItem, index: number) => (
    <div key={index} className="category_card">
      <img src={data.image} alt="" />
      <p>{data.category}</p>
      <p>{data.title}</p>
      <h5>{data.price} $</h5>
    </div>
  ));

  return (
    <div className="category container">
      <h5 className="category_title">Shop by Category</h5>
      <div className="category_box">
        {categoryCardsData}
      </div>
    </div>
  );
};

export default Category;