import { useRouter } from 'next/router'
import React, { useState, useContext } from 'react'
import { signup } from '../../services/service.auth'
import Button from '../Button'
import FormContent from '../Form.styled'

export default function Form() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [message, setMessage] = useState({
        active: false,
        error: false,
        message: ''
    })

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeBirthday = (e) => {
        setBirthday(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeConfirm = (e) => {
        setConfirm(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== confirm) {
            setMessage({
                active: true,
                error: true,
                message: 'Wrong confirm password'
            })
            return
        }

        try {
            await signup(name, password, email, birthday)

            router.push('/welcome')
            setMessage({
                active: true,
                error: false,
                message: 'Success signup'
            })
        } catch (error) {
            setMessage({
                active: true,
                error: true,
                message: error.response.data
            })
        }
    }

    return (
        <div>
            <FormContent
                active={message.active}
                error={message.error}
                message={message.message}
                className="form"
            >
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    placeholder="Full name"
                    onChange={onChangeName}
                    value={name}
                    className="input"
                />
                <label htmlFor="birthday">Birthday</label>
                <input
                    id="birthday"
                    placeholder="YYYY-MM-DD"
                    onChange={onChangeBirthday}
                    value={birthday}
                    className="input"
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    placeholder="mail@mail.com"
                    onChange={onChangeEmail}
                    value={email}
                    className="input"
                />
                <label htmlFor="name">Password</label>
                <input
                    id="password"
                    placeholder="password"
                    type="password"
                    onChange={onChangePassword}
                    value={password}
                    className="input"
                />
                <label htmlFor="name">Confirm Password</label>
                <input
                    placeholder="password"
                    type="password"
                    onChange={onChangeConfirm}
                    value={confirm}
                    className="input"
                />
                <Button onClick={handleSubmit}>Criar Conta</Button>
            </FormContent>
        </div>
    )
}
