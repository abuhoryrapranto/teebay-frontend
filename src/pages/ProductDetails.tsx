import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "../components/Alert";

export default function ProductDetails() {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalNumber, setModalNumber] = useState(0);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().getTime()+(5*24*60*60*1000)));

    const [success, setSuccess] = useState("");
    
    const { slug } = useParams();

    const navigate = useNavigate();

    const delay = (ms : any) => new Promise(res => setTimeout(res, ms));

    let { data  } : any = useFetch('http://127.0.0.1:8000/api/v1/product/'+slug);
    
    const openModal = (modalNumber : number) => {
        setModalOpen(true);
        setModalNumber(modalNumber);
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
                closeModal();
                let message = `Order Buy successfully from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}.`;
                setSuccess(message);
                setTimeout(() => {
                    navigate('/products');
                }, 3000);
            }
        })
        .catch(err => console.log(err));
    }

    const rentProduct = () => {

        let from = startDate.toISOString().split('T')[0];
        let to = endDate.toISOString().split('T')[0];

        axios.post("http://127.0.0.1:8000/api/v1/order", {
            slug: slug,
            type: "rent",
            rent_from: from,
            rent_to: to
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        })
        .then(res => {
            if(res.status === 201) {
                closeModal();
                let message = `Order Rent successfully from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}.`;
                setSuccess(message);
                setTimeout(() => {
                    navigate('/products');
                }, 3000);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="flex items-center h-screen">
        <div className="mx-auto">
            {
                success.length !== 0 ? <Alert type="success" message={success} /> : ""
            }
        <div className="text-left">
            <p className="text-3xl font-semibold">{data.title}</p>
            <p className="text-md font-medium mt-4 text-gray-500">Categories: {data.category}</p>
            <p className="text-md font-medium mt-4 text-gray-500">Price: ${data.purchase_price} | Rent: ${data.rent_price} per {data.rent_option}</p>
            <p className="text-md font-medium mt-4 text-gray-500">{data.description}</p>

            <div className="float-right mt-[40px]">
                <Button name="Rent" click={() => openModal(2)} />
                <Button name="Buy" marginLeft="ml-4" click={() => openModal(1)} />
            </div>

            <Modal isOpen={modalOpen} onClose={closeModal} name={data.title} click={() => modalNumber == 1 ? buyProduct() : rentProduct()}>
                {
                    modalNumber == 1 ? <p className="text-xl">Are you sure you want to buy this product?</p> : 
                    <div>
                        <p className="text-2xl font-bold mb-[40px]">Rental period</p>
                            <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-lg font-semibold p-3">From</p>
                                <DatePicker dateFormat="dd/MM/yyyy" className="border rounded-md p-3 w-30 ml-3" selected={startDate} placeholderText="Select date" onChange={(date : Date) => setStartDate(date)} />
                            </div>
                            <div>
                                <p className="text-lg font-semibold p-3">To</p>
                                <DatePicker dateFormat="dd/MM/yyyy" className="border rounded-md p-3 w-30 ml-3" selected={endDate} placeholderText="Select date" onChange={(date : Date) => setEndDate(date)} />
                            </div>
                        </div>
                    </div>
                    
                }
            </Modal>
        </div>
        </div>
        </div>
        
    )
}
