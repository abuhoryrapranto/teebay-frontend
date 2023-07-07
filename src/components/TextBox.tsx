type Props = {
    type: string,
    placeholder: string
}

export default function TextBox(props : Props) {
  return (
    <div className="w-80 mb-6">
        <input type={props.type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={props.placeholder} />
    </div>
  )
}
