import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import TextBox from "../components/TextBox";
import { useForm } from "react-hook-form";
import Select from 'react-select'
import { useState, useEffect } from "react";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function EditProduct() {

    const { slug } = useParams();

    const navigate = useNavigate();
    
    const [error, setError] = useState<boolean>(false);

    let { data } : any = useFetch('http://127.0.0.1:8000/api/v1/product/'+slug);

    const { data : categories } = useFetch('http://127.0.0.1:8000/api/v1/product/categories');

    const [category, setCategory] = useState([]);

    const { register, trigger, getValues, setValue, formState: { errors , isValid } } = useForm();

    const validation = {

        title: {
            required: "Title is required"
        },

        description: {
            required: "Description is required"
        },

        purchase_price: {
            required: "Purchase price is required"
        },

        rent_price: {
            required: "Rent price is required"
        },

        rent_option: {
            required: "Rent option is required"
        }

    };

    const options : any = [];

    categories && categories.map((item : any) => {
        let temp = {
        value: item.id,
        label: item.name
    };
               
    options.push(temp);

    });


    useEffect(() => {
        setValue('title', data.title);
        setValue('description', data.description);
        setValue('purchase_price', data.purchase_price);
        setValue('rent_price', data.rent_price);
        setValue('rent_option', data.rent_option);
      }, [data, setValue]);

    const categoryChange= (selectedValues : any) => {
        setCategory(selectedValues);
        console.log(category);
    };


    const updateProduct = () => {

        trigger();
        let ids : any = [];
    
        category && category.map((item : any) => {
            ids.push(item.value)
        }
        );

        // console.log(category);

        const fullData : any = {

        
            title: getValues("title"),
            category_ids: ids,
            description: getValues("description"),
            purchase_price: getValues("purchase_price"),
            rent_price: getValues("rent_price"),
            rent_option: getValues("rent_option")
        }

        // console.log(fullData);

        axios.put('http://127.0.0.1:8000/api/v1/product/'+slug, fullData, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res);
            if(res.status === 200) {
                navigate('/products')
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <label className="float-left font-semibold">Title</label>
            <TextBox type="text" name="title" value={data.title} register={register} registerOption={validation.title} error={errors.title} width="w-[700px]" />

            <div className="text-left mt-4">
                <label className="font-semibold">Categories</label>
            </div>
            <div className="">
            <Select isMulti={true} key={data.category_with_id} defaultValue={data.category_with_id} options={options} onChange={categoryChange} />
            {error && <p className="mb-[40px] text-sm text-red-500">Category is required</p>}
            </div>

            <label className="float-left mt-[40px] font-semibold">Description</label>
            <textarea {...register("description", {required: "Description is required"})} rows={4} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Description">{data.description}</textarea>
            {errors.description && <p className="text-sm text-red-500 text-left">{errors.description?.message?.toString()}</p>}

            <div className="grid gap-6 md:grid-cols-3 mt-[40px]">
                    <div className="text-left">
                        <label className="font-semibold">Price</label>
                        <TextBox type="number" name="purchase_price" value={data.purchase_price} register={register} registerOption={validation.purchase_price} error={errors.purchase_price} />
                    </div>
                    <div className="text-left">
                        <label className="font-semibold">Rent</label>
                        <TextBox type="number" name="rent_price" value={data.rent_price}  register={register} registerOption={validation.rent_price} error={errors.rent_price} marginBottom="mb-8" placeholder="Rent price" />
                    </div>
                    <div>
                    <label className="font-semibold float-left">Rent option</label>
                    <select id="countries" {...register("rent_option")} className="h-[45px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full">
                        <option selected value={data.rent_option}>per {data.rent_option}</option>
                        <option value="hour">hour</option>
                        <option value="day">day</option>
                        <option value="month">month</option>
                        <option value="year">year</option>
                    </select>
                    {errors.rent_option && <p className="text-sm text-red-500">{errors.rent_option?.message?.toString()}</p>}
                    </div>
                </div>

                <div className="float-right">
                    <Button name="Edit Product" click={updateProduct} />
                </div>
        </div>
    )
}
