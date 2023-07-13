import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Card from "../components/Card";
import useFetch from "../hooks/useFetch";
import { Link, useNavigate } from 'react-router-dom'
import Modal from "../components/Modal";
import axios from "axios";
import LongText from "../components/LongText";

export default function Products() {

  const [modalOpen, setModalOpen] = useState(false);

  let { data, reload } = useFetch('http://127.0.0.1:8000/api/v1/product');

  const [slug, setSlug] = useState('');

  const navigate = useNavigate();

  const addProduct = () => {
    navigate('/add-product');
  }

  const openModal = (slug : string) => {
    setModalOpen(true);
    setSlug(slug);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleReload = () => {
    reload();
  };

  const deleteProduct = (slug : string) => {
    axios.delete('http://127.0.0.1:8000/api/v1/product/'+slug, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer "+ localStorage.getItem("token")
      }
    })
    .then(res => {
      if(res.status === 200) {
        closeModal();
        navigate('/products');
        handleReload();
        
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const productDetails = (slug : string) => {

    axios.put('http://127.0.0.1:8000/api/v1/product/increment-views/'+slug, {}, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer "+ localStorage.getItem("token")
      }
    })
    .then(res => {
      if(res.status === 200) {
        navigate('/product/'+slug);
      }
    })
    .catch(err => console.log(err));
    
  }

  const edit = (slug : string) => {
    navigate('/product/edit/'+slug)
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/');
  }

  return (

    <div>
        <div className="mb-4">
          <div className="float-left">
            <Button type="button" name="Orders" click={() => navigate('/orders')} /> 
            <Button type="button" name="Add Product" click={() => addProduct()} marginLeft="ml-4" /> 
          </div>
          <div className="flex justify-end">
            <Button type="button" name="Logout" backgroundColor="bg-red-500 hover:bg-red-600" click={logout} />
          </div>
        </div>

    <p className="text-2xl font-medium mb-4">MY PRODUCTS</p>

      {
        data && data.length > 0 ? data.map((item : any) => (
          <div className="cursor-pointer" key={item.slug}>
              <Card size="w-[700px]" marginBottom="mb-4">


              <div className="grid grid-cols-5 gap-0">
                <div className="col-span-4">
                  <div onClick={() => productDetails(item.slug)}>
                    <div className="float-root">
                      <div className="float-left">
                        <p className="text-gray-700 text-2xl">{item.title}</p>
                      </div>
                    </div>
                    <br/>
                    <div className="text-left mt-4">
                      <p className="text-gray-500 text-sm font-medium mt-2">Categories: {item.category}</p>
                      <p className="text-gray-500 text-sm font-medium mt-2">Price: ${item.purchase_price} | Rent: ${item.rent_price} {item.rent_option}</p>
                    </div>
                  </div>
                  <LongText text={item.description} maxLength={200} click={() => productDetails(item.slug)} />
                  <div className="float-root mt-4">
                  <p className="text-gray-500 text-sm font-medium float-left">Date posted: {item.posted_date}</p>
                  
                  </div>
                </div>
                <div>
                  <div className="float-right cursor-pointer">

                    <div className="inline-flex float-right">
                    <p className="mr-4 text-indigo-500" onClick={() => edit(item.slug)}>Edit</p>
                      <div className="cursor-pointer" onClick={() => openModal(item.slug)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm font-medium text-right mt-[120px]">{item.views} views</p>
                    </div>
                </div>
              </div>
            </Card>
          </div>
        ))

        :

        <Alert type="error" message="No data found" />
      }

      <Modal isOpen={modalOpen} onClose={closeModal} name="Delete Product" click={() => deleteProduct(slug)}>
        <p className="text-xl">Are you sure you want to delete this product?</p>
      </Modal>

    </div>
  )
}