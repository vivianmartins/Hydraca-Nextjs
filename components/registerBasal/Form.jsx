import { React, useState, useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import Button from '../ButtonHome'
import Dropbox from '../Dropbox'
import { registerBasal } from '../../services/service.basal'
import FormContent from '../Form.styled'

/**
 *
 escala -->   glucoseTrend
 data --> date
 hora --> time
 dose --> amountInsulin (dose de insulina )
 typeInsulin  --> tipo de insulina
 */

export default function Form() {
    const { therapyGlobal } = useContext(GlobalContext)

    const [amountGlucose, setamountGlucose] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [amountInsulinTotal, setamountInsulinTotal] = useState('')
    const [typeInsulin, setTypeInsulin] = useState('')
    const [titleDropBoxTherapy, setTitleDropBoxTherapy] = useState('Selecione')
    const [setTitleDropbox, setTitleDropBoxsetTherapyGlobal] = useState('')
    const [idReturnedFromDropBoxTherapy, setIdReturnedFromDropBoxTherapy] =
        useState(null)
    const [message, setMessage] = useState({
        active: false,
        error: false,
        message: ''
    })

    const onChangeAmountGlucose = (event) => {
        setamountGlucose(event.target.value)
    }

    const onChangeDate = (event) => {
        setDate(event.target.value)
    }

    const onChangeTime = (event) => {
        setTime(event.target.value)
    }

    const onChangeamountInsulinTotal = (event) => {
        setamountInsulinTotal(event.target.value)
    }

    const onChangetypeInsulin = (event) => {
        setTypeInsulin(event.target.value)
    }
    async function handleSubmit(event) {
        event.preventDefault()

        if (amountGlucose < 0 || amountGlucose == 0) {
            setMessage({
                active: true,
                error: true,
                message: 'Prencha o campo de glicose corretamente'
            })
            return
        }

        if (amountInsulinTotal == 0 || amountInsulinTotal < 0) {
            setMessage({
                active: true,
                error: true,
                message: 'Prencha o campo dose de insulina corretamente'
            })
            return
        }

        if (date == 0) {
            setMessage({
                active: true,
                error: true,
                message: 'Prencha o campo data'
            })
            return
        }
        if (time == 0) {
            setMessage({
                active: true,
                error: true,
                message: 'Prencha o campo horas'
            })
            return
        }
        try {
            await registerBasal({
                amountGlucose: amountGlucose,
                date: date,
                time: time,
                amountInsulinTotal: amountInsulinTotal,
                therapy: idReturnedFromDropBoxTherapy
            })
            setMessage({
                active: true,
                error: false,
                message: 'Os dados foram registados com sucesso!'
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <FormContent
            active={message.active}
            error={message.error}
            message={message.message}
            className="form lg:grid-cols-2 lg:grid-rows-6 gap-y-16 lg:gap-y-6 gap-x-4"
        >
            <div className="item-form lg:col-span-2">
                <label htmlFor="aGlucoseTrend">Glicose: </label>
                <input
                    className="input"
                    placeholder="Insira os valores da glicose"
                    onChange={onChangeAmountGlucose}
                    value={amountGlucose}
                    type="number"
                />
            </div>
            <div className="item-form">
                <label htmlFor="date">Data: </label>
                <input
                    onChange={onChangeDate}
                    value={date}
                    className="input"
                    type="date"
                />
            </div>
            <div className="item-form">
                <label htmlFor="time">Hora: </label>
                <input
                    onChange={onChangeTime}
                    value={time}
                    className="input"
                    type="time"
                />
            </div>
            <div className="item-form">
                <label htmlFor="amountInsulina">Dose de insulina: </label>
                <input
                    onChange={onChangeamountInsulinTotal}
                    placeholder="Quantidade de insulina"
                    value={amountInsulinTotal}
                    className="input"
                    type="number"
                />
            </div>
            <Dropbox
                label="Tipo de terapia"
                titleDropbox={titleDropBoxTherapy}
                setTitleDropbox={setTitleDropBoxTherapy}
                dataToShowInDropbox={therapyGlobal}
                field="type"
                setIdReturnedFromDropBox={setIdReturnedFromDropBoxTherapy}
            />
            <div className=" lg:ml-60">
                <Button onClick={handleSubmit}>Salvar</Button>
            </div>
        </FormContent>
    )
}
