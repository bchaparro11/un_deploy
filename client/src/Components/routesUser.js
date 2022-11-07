import React, { useEffect, useState } from 'react'
import { useUsers } from '../context/userContext'
import { validateAddTravel } from '../helpers/validateForm'
import '../resources/css/routesUser.css'

const RoutesUser = () => {

    const { currentUser, addTravel, setViewRender, setCurrentUser, getCredentials, updateUser } = useUsers()

    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [date, setDate] = useState('')
    const [seats, setSeats] = useState('')
    const [price, setPrice] = useState(0)
    const [contactForm, setContactForm] = useState('')
    const [remark, setRemark] = useState('')
    const [userVehicle, setUserVehicle] = useState([])
    const [vehicleToTravel, setVehicleToTravel] = useState(null)
    const [credentials, setCredentials] = useState(null)
    const [correctForm, setCorrectForm] = useState(false)

    const [wheels, setWheels] = useState([])

    useEffect(() => {
        setUserVehicle(currentUser?.vehicle)
        setCredentials(getCredentials())
        setWheels(currentUser?.userWheels)
    }, [currentUser?.userWheels, currentUser?.vehicle, getCredentials])

    // eslint-disable-next-line no-unused-vars
    const [travel, setTravel] = useState(null)

    const updateData = async (id, filter) => {
        try {
            const res = await updateUser(id, filter)
            return res
        } catch (error) {
            console.error({ message: error });
        }
    }

    const addNewRouteUser = async (e) => {
        e.preventDefault()


        const newTravel = {
            userName: currentUser.userName,
            contact: contactForm,
            email: currentUser.email,
            vehicle: userVehicle[vehicleToTravel],
            source: source,
            destiny: destination,
            dateTime: Date.parse(date),
            seats: parseInt(seats),
            price: parseInt(price),
            remark: remark,
            status: 'Created'
        }

        if (validateAddTravel(newTravel)) {
            await setCorrectForm(true)
            setTravel(newTravel)
            const res = await addTravel(newTravel)
            wheels.push(res.tid)
            setCurrentUser({ ...currentUser, userWheels: wheels })
            await updateData(credentials.UID, { userWheels: wheels })
            setViewRender(false)
            e.target.reset()
        }
        // await updateUser(credentials.UID, { userWheels: wheels })
    }

    // const sendRoute = () => {
    //     setTimeout(() => {
    //         if (correctForm) {
    //             setViewRender(false)
    //         }
    //     }, 500);
    // }
    console.log(travel);
    return (
        <div id='bodyAR'>
            <p id='titleAR'>Agregar Nueva Ruta</p>
            <form className='formAR' onSubmit={addNewRouteUser}>
                <label htmlFor="placeSource">
                    <span>Origen</span>
                    <input type="text" name='placeSource' id='placeSource' onChange={e => setSource(e.target.value)} />
                </label>
                <label htmlFor="placeDestination">
                    <span>Destino</span>
                    <input type="text" name='placeDestination' id='placeDestination' onChange={e => setDestination(e.target.value)} />
                </label>
                <label htmlFor="dateTime">
                    <span>Fecha y Hora</span>
                    <input type='datetime-local' name='dateTime' id='dateTime' onChange={e => setDate(e.target.value)} />
                </label>
                <label htmlFor="quotas">
                    <span>Cupos</span>
                    <input type="number" min={1} max={5} name='quotas' id='quotas' onChange={e => setSeats(e.target.value)} />
                </label>
                <label htmlFor="price">
                    <span>Precio</span>
                    <input type='number' name='price' id='price' onChange={e => setPrice(e.target.value)} />
                </label>
                <label htmlFor="contactForm">
                    <span>Forma de Contacto</span>
                    <div id='contactForm'>
                        <label htmlFor="email">
                            <input type="radio" name="contact" id="email" value={currentUser.email} onClick={e => setContactForm(e.target.value)} />
                            <p>Correo</p>
                        </label>
                        <label htmlFor="celphone">
                            <input type="radio" name="contact" id="celphone" value={currentUser.celPhone} onClick={e => setContactForm(e.target.value)} />
                            <p>Celular</p>
                        </label>
                    </div>
                </label>
                <label htmlFor="remark">
                    <span>Observaciones</span>
                    <input type="text" name='remark' id='remark' onChange={e => setRemark(e.target.value)} />
                </label>
                <label htmlFor="vehicle">
                    {/* <span>Observaciones</span> */}
                    <select name="vehicle" id="vehicle" onChange={e => setVehicleToTravel(e.target.value)}>
                        <option value="">--Selecciona un Vehiculo--</option>
                        {
                            userVehicle.map((vehicle, index) => (
                                <option value={index} >
                                    {vehicle.plate}
                                </option>
                            ))
                        }
                    </select>

                </label>
                <button type="submit" id='btnFormAR' >Agregar</button>
            </form>
        </div>
    )
}

export default RoutesUser