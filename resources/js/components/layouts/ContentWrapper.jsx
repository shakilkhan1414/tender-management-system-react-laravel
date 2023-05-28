import React from 'react'

export const ContentWrapper = (props) => {
  return (
    <main id="main" className="main row d-flex justify-content-center align-items-center">
        {props.children}
    </main>
  )
}
