import React from 'react'

import './index.scss'

export const AboutSection = ({ title, children }) => {
  return (
    <section className="about-section">
      <p className="about-section-title">{title}</p>
      <div className="about-section-divider"/>
      {children}
    </section>
  )
}

export default AboutSection
