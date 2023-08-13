import CardsContainer from "../../components/CardsContainer/CardsContainer"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./Home.module.css";
import FilterOptions from "../../components/FilterOptions/FilterOptions";
const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch])

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    return (

        <div className={styles.Home}>
            {/* <div>
                <SideBar />
            </div> */}
            <div>
                <SearchBar />
            </div>
            <div>
            <button onClick={handleOpenModal}>Filter</button>
                <FilterOptions isOpen={openModal} onClose={handleCloseModal}/>
                <CardsContainer />
            </div>
        </div>
    )
}
export default Home;