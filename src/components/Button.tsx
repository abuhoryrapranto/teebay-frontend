import classNames from "classnames"

type Props = {
    name: string,
    marginTop: string,
    type?: "button" | "submit"
}

export default function Button(props : Props) {

    const buttonStyle = classNames(
        "bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-4 rounded-sm",
        props.marginTop
    );

  return (
    <button className={buttonStyle} type={props.type}>
        {props.name}
    </button>
  )
}
