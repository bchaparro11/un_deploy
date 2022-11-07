import { useEffect, useState } from "react"
import CardSearch from "../Components/cardSearch";
import Header from "../Components/header"
import { useUsers } from "../context/userContext";
import "../resources/css/search2.css";
import Test from "./test";


const Searchv2 = () => {

    const { currentUser } = useUsers()
    // eslint-disable-next-line no-unused-vars
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const { getAllTravels } = useUsers()

    const [kind, setKind] = useState(null)
    const [price, setPrice] = useState(0)
    const [place, setPlace] = useState(null)


    const [filters, setFilters] = useState([])


    useEffect(() => {
        const getTravels = async () => {
            try {
                const res = await getAllTravels()
                let AllTravels = []

                // * Filter user
                let TravelsUser = []
                currentUser?.userWheels.forEach(travel => {
                    TravelsUser.push(travel)
                });

                let noUserTravels = res.filter(travel => TravelsUser.indexOf(travel._id) === -1)

                //  * Filter on travel
                if (currentUser?.wheelHist.length >= 0) {
                    let onTravel = []
                    currentUser?.wheelHist.forEach(travel => {
                        onTravel.push(travel.TID)
                        console.log('hola');
                    })
                    // console.log('on',onTravel);
                    let viewTravels = noUserTravels.filter(travel => onTravel.indexOf(travel._id) === -1)
                    // console.log('vi', viewTravels);
                    AllTravels = [...viewTravels]
                    setResults(viewTravels)
                    setFilters(viewTravels)
                }

                //  * Filter Kind
                console.log(kind);
                if (kind === 'Carro') {
                    let car = []
                    console.log('all', AllTravels);
                    car = AllTravels.filter(travel => (
                        travel.vehicle.kind === 'Carro'
                    ))
                    setFilters(car)
                }

                if (kind === 'Moto') {
                    let bike = []
                    console.log('all', AllTravels);
                    bike = AllTravels.filter(travel => (
                        travel.vehicle.kind === 'Moto'
                    ))
                    setFilters(bike)
                }

                //  * Filter price
                console.log('priceFilter', price);
                if (price === 1) {
                    let price = []
                    console.log('all', AllTravels);
                    price = AllTravels.filter(travel => (
                        travel.price <= 5000
                    ))
                    console.log('price', price);
                    setFilters(price)
                }
                if (price === 2) {
                    let price = []
                    console.log('all', AllTravels);
                    price = AllTravels.filter(travel => (
                        travel.price > 5000 && travel.price <= 10000
                    ))
                    console.log('price', price);
                    setFilters(price)
                }
                if (price === 3) {
                    let price = []
                    console.log('all', AllTravels);
                    price = AllTravels.filter(travel => (
                        travel.price > 10000 && travel.price <= 15000
                    ))
                    console.log('price', price);
                    setFilters(price)
                }
                if (price === 4) {
                    let price = []
                    console.log('all', AllTravels);
                    price = AllTravels.filter(travel => (
                        travel.price > 15000
                    ))
                    console.log('price', price);
                    setFilters(price)
                }


                //  * Filter place

                if (place === 'Source') {
                    let place = []
                    console.log('all', AllTravels);
                    place = AllTravels.filter(travel => (
                        travel.source.toLowerCase().includes(search.toLowerCase())
                    ))
                    setFilters(place)
                }

                if (place === 'Destiny') {
                    let place = []
                    console.log('all', AllTravels);
                    place = AllTravels.filter(travel => (
                        travel.destiny.toLowerCase().includes(search.toLowerCase())
                    ))
                    setFilters(place)
                }
                
                //  * Filter SearchBar

                if (search !== '') {
                    let searchBar = []
                    console.log('all', AllTravels);
                    searchBar = AllTravels.filter(travel => (
                        travel.source.toLowerCase().includes(search.toLowerCase()) ||
                        travel.destiny.toLowerCase().includes(search.toLowerCase())
                    ))
                    setFilters(searchBar)
                }




            } catch (error) {
                console.error({ message: error.message });
            }
        }
        getTravels()
    }, [currentUser?.userWheels, currentUser?.wheelHist, getAllTravels, kind, place, price, search])


    return (
        <div className='pageSearch'>
            <Header />
            <div id='bodyRU'>
                <div className="bodyPageSP">
                    <div id="searchBar">
                        <input type="search" name="" id="searchInput" placeholder="Buscar"
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {/* <Test/> */}

                    <div className="bodyCardsSP">
                        <div className="cardsSP">
                            {
                                filters?.map(card => (
                                    <CardSearch
                                        key={card._id}
                                        TID={card._id}
                                        userName={card.userName}
                                        contact={card.contact}
                                        vehicle={card.vehicle}
                                        passengers={card.passengers}
                                        source={card.source}
                                        destiny={card.destiny}
                                        price={card.price}
                                        seats={card.vehicle.seats}
                                        dateTime={card.dateTime}
                                        remark={card.remark}
                                    />
                                ))
                            }

                        </div>

                        <div className="filterSP">

                            <form action="">
                                <p id="titleFormSP">Filtros</p>

                                <p className="titleFields">Tipo</p>

                                <div>
                                    <label htmlFor="carField" className="fielFormSP">
                                        <input type="radio" name="kind" id="carField" onChange={e => setKind('Carro')} />
                                        <p className="txtField">Carro</p>
                                    </label>
                                    <label htmlFor="bikeField" className="fielFormSP">
                                        <input type="radio" name="kind" id="bikeField" onChange={e => setKind('Moto')} />
                                        <p className="txtField">Moto</p>
                                    </label>
                                </div>

                                <p className="titleFields">Precio</p>

                                <div>
                                    <label htmlFor="to5Field" className="fielFormSP">
                                        <input type="radio" name="price" id="to5Field" onChange={e => setPrice(1)} />
                                        <p className="txtField">Menos de $5.000</p>
                                    </label>
                                    <label htmlFor="5to10Field" className="fielFormSP">
                                        <input type="radio" name="price" id="5to10Field" onChange={e => setPrice(2)} />
                                        <p className="txtField">De $5.000 a $10.000</p>
                                    </label>
                                    <label htmlFor="10to15Field" className="fielFormSP">
                                        <input type="radio" name="price" id="10to15Field" onChange={e => setPrice(3)} />
                                        <p className="txtField">De $10.000 a $15.000</p>
                                    </label>
                                    <label htmlFor="more15Field" className="fielFormSP">
                                        <input type="radio" name="price" id="more15Field" onChange={e => setPrice(4)} />
                                        <p className="txtField">Mas de $15.000</p>
                                    </label>
                                </div>

                                <p className="titleFields">Lugar</p>

                                <div>
                                    <label htmlFor="sourceField" className="fielFormSP">
                                        <input type="radio" name="place" id="sourceField" onChange={e => setPlace('Source')} />
                                        <p className="txtField">Origen</p>
                                    </label>
                                    <label htmlFor="destinyField" className="fielFormSP">
                                        <input type="radio" name="place" id="destinyField" onChange={e => setPlace('Destiny')} />
                                        <p className="txtField">Destino</p>
                                    </label>
                                </div>

                                <div id="divResetFilter">
                                    <button onChange={e => { e.preventDefault(); e.target.reset() }} id='btnResetFilter'>Limpiar Filtros</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default Searchv2