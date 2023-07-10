import { UseFormRegister, FieldValues, RegisterOptions, DefaultValues } from "react-hook-form"
import classNames from "classnames"

type Props = {
    type: string,
    placeholder?: string,
    name: string,
    register: UseFormRegister<any>,
    registerOption?: RegisterOptions<FieldValues>;
    error?: FieldValues;
    width?: string,
    marginBottom?: string,
    backendError?: string,
    value?: DefaultValues<any>,
}

export default function TextBox({type, placeholder, name, register, registerOption, error, width, marginBottom, backendError, value} : Props) {

    const textBoxStyle = classNames(
        marginBottom,
        width
    );

    return (
        <div className={textBoxStyle}>
            <input type={type} {...register(name, registerOption)} defaultValue={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder}/>
            {error && <p className="text-sm float-left text-red-500">{error?.message}</p>}
            {backendError && <p className="text-sm float-left text-red-500">{backendError}</p>}
        </div>
    )
}
