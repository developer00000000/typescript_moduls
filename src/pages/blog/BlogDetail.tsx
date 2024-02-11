import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import './category.css'

interface DataItem {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string; // açıklama ekledik
  price: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // id'yi alıyoruz

  const dataState = useSelector((state: RootState) => state.getData);
  const { data: DataFetch, loading } = dataState;

  const [product, setProduct] = useState<DataItem | null>(null);

  useEffect(() => {
    if (DataFetch.length > 0) {
      const foundProduct = DataFetch.find((item: DataItem) => item.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id, DataFetch]);

  if (loading || !product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="detail container">
      <div className="detail_image">
        <img src={product.image} alt="" />
      </div>
      <div className="detail_content">
        <h2>{product.title}</h2>
        <p>Category: {product.category}</p>
        <p>{product.description}</p>
        <h5>{product.price} $</h5>
      </div>
    </div>
  );
};

export default BlogDetail;