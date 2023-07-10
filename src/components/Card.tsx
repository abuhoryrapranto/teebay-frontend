import classNames from "classnames"

type Props = {
    children: React.ReactNode,
    size?: string,
    marginBottom?: string
}

export default function Card({ children, size, marginBottom } : Props) {

  const cardStyle = classNames(
    "p-6 bg-white border border-gray-300 border-2 rounded-sm shadow",
    size ? size : "w-3xl",
    marginBottom ? marginBottom : ''
  );

  return (
    
        <div className={cardStyle}>
            {children}
        </div>

  )
}
