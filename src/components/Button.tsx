import classNames from "classnames"

type Props = {
    name: string,
    marginTop?: string,
    marginLeft?: string,
    type?: "button" | "submit",
    backgroundColor?: string,
    click?: () => void,
    float? : string
}

export default function Button(props : Props) {

    const buttonStyle = classNames(
        props.backgroundColor ? props.backgroundColor : "bg-indigo-500 hover:bg-indigo-600",
        "text-white py-1 px-4 rounded-sm",
        props.marginTop,
        props.marginLeft,
        props.float
    );

  return (
    <button className={buttonStyle} type={props.type} onClick={props.click}>
        {props.name}
    </button>
  )
}
