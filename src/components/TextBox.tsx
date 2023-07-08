import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form"

type Props = {
    type: string,
    placeholder: string,
    name: string,
    register: UseFormRegister<any>,
    registerOption?: RegisterOptions<FieldValues>;
    error?: FieldValues;
}

export default function TextBox({type, placeholder, name, register, registerOption, error} : Props) {

    return (
        <div className="w-80 mb-8">
            <input type={type} {...register(name, registerOption)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} />
            {error && <p className="text-sm float-left text-red-500">{error?.message}</p>}
        </div>
    )
}
