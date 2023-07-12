import classNames from "classnames";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Card from "../components/Card";
import Alert from "../components/Alert";

export default function Orders() {
    const [openTab, setOpenTab] = useState(1);

    const { data : buy } = useFetch("http://127.0.0.1:8000/api/v1/order/buy");
    const { data : rent } = useFetch("http://127.0.0.1:8000/api/v1/order/rent");


    return (
        <div>
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center max-w-xl">
                    <ul className="flex space-x-[300px]">
                        <li className={ classNames(openTab === 1 ? "border-b-2 border-indigo-500" : "",)}>
                            <a href="#" onClick={() => setOpenTab(1)} className="inline-block px-4 py-2 text-indigo-500">
                               Bought
                            </a>
                        </li>
                        <li className={ classNames(openTab === 2 ? "border-b-2 border-indigo-500" : "",)}>
                        <a href="#" onClick={() => setOpenTab(2)} className="inline-block px-4 py-2 text-gray-600">
                               Sold
                            </a>
                        </li>
                        <li className={ classNames(openTab === 3 ? "border-b-2 border-indigo-500" : "",)}>
                            <a href="#" onClick={() => setOpenTab(3)} className="inline-block px-4 py-2 text-gray-600">
                                Borrowed
                            </a>
                        </li>
                        <li className={ classNames(openTab === 4 ? "border-b-2 border-indigo-500" : "",)}>
                            <a href="#" onClick={() => setOpenTab(4)} className="inline-block px-4 py-2 text-gray-600">
                                Lent
                            </a>
                        </li>
                    </ul>
                    <div className="p-3 mt-6">
                        <div className={openTab === 1 ? "block" : "hidden"}>
                            {
                                buy && buy.map((item : any) => (
                                    <Card size="w-[700px]" marginBottom="mb-4">
                                        <div className="">
                                            <div className="float-root">
                                                <div className="float-left">
                                                <p className="text-gray-700 text-2xl">{item.title}</p>
                                                </div>
                                            </div>
                                            <br/>
                                            <div className="text-left mt-4">
                                                <p className="text-gray-500 text-sm font-medium mt-2">Categories: {item.category}</p>
                                                <p className="text-gray-500 text-sm font-medium mt-2">Price: ${item.purchase_price}</p>
                                                <p className="text-gray-800 text-sm font-medium mt-2">{item.description}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            }
                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"}>
                            
                        </div>
                        <div className={openTab === 3 ? "block" : "hidden"}>
                        {
                                rent && rent.map((item : any) => (
                                    <Card size="w-[700px]" marginBottom="mb-4">
                                        <div className="">
                                            <div className="float-root">
                                                <div className="float-left">
                                                <p className="text-gray-700 text-2xl">{item.title}</p>
                                                </div>
                                            </div>
                                            <br/>
                                            <div className="text-left mt-4">
                                                <p className="text-gray-500 text-sm font-medium mt-2">Categories: {item.category}</p>
                                                <p className="text-gray-500 text-sm font-medium mt-2">Rent: ${item.rent_price} {item.rent_option}</p>
                                                <p className="text-gray-800 text-sm font-medium mt-2">{item.description}</p>
                                                <p className="text-gray-800 text-sm font-medium mt-2"> Rent from {item.rent_from} to {item.rent_to}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            }
                        </div>
                        <div className={openTab === 4 ? "block" : "hidden"}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}