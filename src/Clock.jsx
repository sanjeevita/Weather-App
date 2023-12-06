import React, { useEffect, useState } from 'react'

const Clock = () => {
const [time,setTime] =useState()
useEffect(()=>{
    setInterval(()=>{
        let date=new Date()
        setTime(date.getHours()+ ":" + date.getMinutes()+ ":" +date.getSeconds())
    },1000)
},[])

  return (
    <span>{time}</span>
  )
}

export default Clock