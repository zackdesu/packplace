"use client"

import React, { useEffect, useState } from 'react'

const Calculator = () => {
    const [angka1, setAngka1] = useState(0)
    const [angka2, setAngka2] = useState(0)
    const [hasil, setHasil] = useState(0)

    useEffect(() => {
        setHasil(calc(angka1, angka2))
    }, [angka1, angka2])

    const calc = (a: number, b: number): number => {
        return a + b
    }

  return (
    <form>
        <input placeholder='angka1' onChange={e => setAngka1(parseFloat(e.target.value))}/>
        <input placeholder='angka2' onChange={e => setAngka2(parseFloat(e.target.value))}/>
        <button type='button'>Hitung</button>
        <p>Hasil : {hasil}</p>
    </form>
  )
}

export default Calculator