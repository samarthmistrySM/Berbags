import React,{useEffect,useState} from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard';

export default function Shop() {
    const API_URL = process.env.REACT_APP_API_URL;

    const [products,setProducts] = useState([]);
    document.title = "Berbags | Shop"
    useEffect(()=>{
        const fetchBags = async() =>{
            try {
                const response = await axios.get(`${API_URL}/products`);
                setProducts(response.data)

            } catch (error) {
                console.error(error);
            }
        }
        fetchBags();
    },[API_URL])

  return (
    <div className="px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product,index)=>(
            <ProductCard key={index} product= {product}/>
        ))}
    </div>
  )
}
