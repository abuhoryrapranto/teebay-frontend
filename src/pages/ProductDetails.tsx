import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function ProductDetails() {

    const [modalOpen, setModalOpen] = useState(false);

    const { slug } = useParams();

    const navigate = useNavigate();

    let { data  } : any = useFetch('http://127.0.0.1:8000/api/v1/product/'+slug);
    
    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
    };

    const buyProduct = () => {

        axios.post("http://127.0.0.1:8000/api/v1/order", {
            slug: slug,
            type: "buy"
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        })
        .then(res => {
            if(res.status === 201) {
                navigate('/products');
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="text-left">
            <p className="text-3xl font-semibold">{data.title}</p>
            <p className="text-md font-medium mt-4 text-gray-500">Categories: {data.category}</p>
            <p className="text-md font-medium mt-4 text-gray-500">Price: ${data.purchase_price} | Rent: ${data.rent_price} per {data.rent_option}</p>
            <p className="text-md font-medium mt-4 text-gray-500">{data.description}</p>

            <div className="float-right mt-[40px]">
                <Button name="Rent" />
                <Button name="Buy" marginLeft="ml-4" click={openModal} />
            </div>

            <Modal isOpen={modalOpen} onClose={closeModal} name={data.title} click={() => buyProduct()}>
                <p className="text-xl">Are you sure you want to buy this product?</p>
            </Modal>
        </div>
        
    )
}
