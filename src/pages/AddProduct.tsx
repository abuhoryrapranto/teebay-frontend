import { useForm } from "react-hook-form";
import TextBox from "../components/TextBox";
import { useState } from "react";
import Button from "../components/Button";
import Select from 'react-select'
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


export default function AddProduct() {

    const { register, trigger, getValues, formState: { errors , isValid } } = useForm();
    const [step, setStep] = useState(1);
    const [error, setError] = useState<boolean>(false);
    const [category, setCategory] = useState([]);

    const navigate = useNavigate();

    const { data } = useFetch('http://127.0.0.1:8000/api/v1/product/categories');

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

    const categoryChange= (selectedValues : any) => {
        setCategory(selectedValues);
    };

    const formatCategory = () => {

        let all : any = [];
        let ids : any = [];

        category && category.map((item : any) => {
            all.push(item.label);
            ids.push(item.value)
        }
        );

        const categoryType = {
            label: all.toString(),
            id:  ids
        }

        return categoryType;
    }

    const Form1 = () => {
        return (
            <div>
                <p className="text-2xl font-medium mb-4">Select a title for your product</p>
                <TextBox type="text" name="title" register={register} registerOption={validation.title} error={errors.title} marginBottom="mb-8" placeholder="Title" />
            </div>
        )
    }

    const Form2 = () => {

        const options : any = [];

        data && data.map((item : any) => {
               let temp = {
                value: item.id,
                label: item.name
               };
               
               options.push(temp);

        })

        return (

            

            <div>
                <p className="text-2xl font-medium mb-4">Select categories</p>
                <Select className="mb-[40px] marker:w-80"  isMulti={true} placeholder="Select a category" options={options} value={category} onChange={categoryChange}/>
                {error && <p className="mb-[40px] text-sm text-red-500">Category is required</p>}
            </div>
        )
    }

    const Form3 = () => {
        return (
            <div className="w-[800px] mb-[40px]">
                <p className="text-2xl font-medium mb-4">Select description</p>
                <textarea {...register("description", validation.description)} rows={4} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Description"></textarea>
                {errors.description && <p className="text-sm text-red-500">{errors.description?.message?.toString()}</p>}
            </div>
        )
    }

    const Form4 = () => {
        return (
            <div className="">
                <p className="text-2xl font-medium mb-4">Select price</p>
                <div className="flex justify-center">
                    <TextBox type="number" name="purchase_price" register={register} registerOption={validation.purchase_price} error={errors.purchase_price} width="w-60" marginBottom="mb-8" placeholder="Purchase price"  />
                </div>
                <p className="text-left text-lg font-semibold">Rent</p>
                <div className="grid gap-6 md:grid-cols-2">
                    <TextBox type="number" name="rent_price" register={register} registerOption={validation.rent_price} error={errors.rent_price}  width="w-20" marginBottom="mb-8" placeholder="Rent price" />
                    <div>
                    <select id="countries" {...register("rent_option", validation.rent_option)} className="h-[45px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full ">
                        <option selected value="">Choose a country</option>
                        <option value="hour">hour</option>
                        <option value="day">day</option>
                        <option value="month">month</option>
                        <option value="year">year</option>
                    </select>
                    {errors.rent_option && <p className="text-sm text-red-500">{errors.rent_option?.message?.toString()}</p>}
                    </div>
                </div>
            </div>
        )
    }

    const Form5 = () => {
        return (
            <div>
                <p className="text-2xl font-bold mb-4">Summary</p>
                <div className="mb-[40px] text-left">
                    <p className="mb-2">Title: {fullData.title}</p>
                    <p className="mb-2">Categories: {formatCategory().label}</p>
                    <p className="mb-2">Description: {fullData.description}</p>
                    <p className="mb-2">Price: ${fullData.purchase_price}. To rent: $ {fullData.rent_price} per {fullData.rent_option}</p>
                </div>
            </div>
        )
    }

    const renderForms = () => {

        switch(step) {
            case 1:
                return <Form1 key={1} />
            case 2:
                return <Form2 />
            case 3:
                return <Form3 />
            case 4:
                return <Form4 />
            case 5:
                return <Form5 />
            default:
                return null;

        }
    }

    const fullData : any = {

        
        title: getValues("title"),
        category_ids: formatCategory().id,
        description: getValues("description"),
        purchase_price: getValues("purchase_price"),
        rent_price: getValues("rent_price"),
        rent_option: getValues("rent_option")
    }

    const submitData = () => {
        axios.post('http://127.0.0.1:8000/api/v1/product', fullData, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        })
        .then(res => {
            if(res.status === 201) {
                navigate('/products')
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const next = () => {

        trigger();

        console.log(category);
        
        if(isValid && step !== 2) {
            setStep(prev => prev+1);
        }

        if(step == 2) {
            if(category.length < 1) {
                setError(true)
            } else {
                setStep(prev => prev+1);
            }
        }

        console.log(fullData);
    }

    const previos = () => {
        setStep(prev => prev-1);
    }


  return (
        <div>
            {renderForms()}

            
            {step > 0 && step !== 1 ? <Button name="Back" float="float-left" click={() => previos()} /> : ''}
            {step < 5 ? <Button name="Next" float="float-right" click={() => next()} /> : <Button name="Submit" float="float-left" marginLeft="ml-[300px]" click={submitData} />}
            
            
        </div>
  )
}
