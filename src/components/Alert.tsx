import classNames from "classnames"

type Props = {
    type?: string,
    message: string
}

export default function Alert(props : Props) {

  const alertStyle = classNames(
    "p-4 mb-4 text-sm  rounded-lg bg-green-50",
    props.type === 'success' ? "text-green-800 bg-green-50" : "text-red-800 bg-red-50"
  );

  return (
    <div className={alertStyle} role="alert">
        <span className="font-medium">{props.message}</span>
    </div>
  )
}
