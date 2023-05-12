"use client"
import React, { useEffect } from 'react'

const Error = ({error, reset}:{error: Error, reset: () => void}) => {
    useEffect(() => {
        console.error(error)
    }, [error])
  return (
    <div><p>Something went wrong</p>
    <button onClick={reset}>Retry</button></div>
  )
}

export default Error