import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GlobalContext } from './GlobalContext'
import { baseURL } from '../../constants/baseURL'

export default function GlobalState(props) {
    const [errors, setErrors] = useState({ email: false, password: false })

    const userLogin = (form) => {
        if (form.email === '' || !form.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setErrors({ email: true })
            return
        }
        if (form.password === '' || (form.password.length < 6)) {
            setErrors({ password: true })
            return
        }
        axios.post(baseURL + '/login', form)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                setErrors({ email: false, password: false})
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const Provider = GlobalContext.Provider
    const values = {
        userLogin,
        errors
    }

    return (<Provider value={values}>{props.children}</Provider>)
}
