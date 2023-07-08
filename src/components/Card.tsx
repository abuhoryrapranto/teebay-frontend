type Props = {
    children: React.ReactNode
}

export default function Card({ children } : Props) {
  return (
    
        <div className="max-w-3xl p-6 bg-white border border-gray-200 rounded-md shadow">
            {children}
        </div>

  )
}
