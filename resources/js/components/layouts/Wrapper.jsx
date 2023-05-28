import React from 'react'

export const Wrapper = (props) => {
  return (
    <section className={props.view ? '': 'toggle-sidebar'}>{props.children}</section>
  )
}
