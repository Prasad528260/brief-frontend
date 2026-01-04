import React from 'react'

const Footer = ({paragraph,linkText,onClick}) => {
  return (
     <div className="mt-6 text-center border-t border-zinc-900 pt-5">
            <p className="text-gray-500 text-xs">
              {paragraph}
              <button
                onClick={onClick}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                {linkText}
              </button>
            </p>
          </div>
  )
}

export default Footer