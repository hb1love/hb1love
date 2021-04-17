import React, { useRef, useCallback, useEffect } from 'react'

export const Item = ({ title, selectedCategory, onClick, scrollToCenter }) => {
  const tabRef = useRef(null)

  const handleClick = useCallback(() => {
    scrollToCenter(tabRef)
    onClick(title)
  }, [tabRef])

  useEffect(() => {
    if (selectedCategory === title) {
      scrollToCenter(tabRef)
    }
  }, [selectedCategory, tabRef])

  return (
    <span
      ref={tabRef}
      className="item"
      role="tab"
      aria-selected={selectedCategory === title ? 'true' : 'false'}
      onClick={handleClick}
    >
      #{title}
    </span>
  )
}
