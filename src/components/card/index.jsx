import React from 'react'

import './index.scss'

export const Card = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  )
}

export default Card
