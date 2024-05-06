import { Link } from 'react-router-dom'

function LogBtn({link, text}) {
  return (
    <Link to={link}>
        <button className='border border-gray-900 bg-slate-900 px-[12px] py-[8px] text-white rounded-md hover:bg-slate-800'>
            {text}
        </button>
    </Link>
  )
}

export default LogBtn