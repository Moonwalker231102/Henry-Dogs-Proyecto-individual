import CardsContainer from "../../components/CardsContainer/CardsContainer"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import Navbar from "../../components/NavBar/NavBar";
import styles from "./Home.module.css";
import FilterOptions from "../../components/FilterOptions/FilterOptions";
const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        setShowScrollToTop(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch])

    const handleCloseModal = () => {
        setOpenModal(false)
    }
    return (

        <div className={styles.Home}>
            <h1 className={styles.homeTitle}>Henry dogs</h1>
            <Navbar setOpenModal={setOpenModal} />
            <FilterOptions isOpen={openModal} onClose={handleCloseModal} />
            <CardsContainer className={styles.cards} />
            {showScrollToTop && (
                <button className={styles.scrollToTopButton} onClick={handleScrollToTop}>
                    ⇑
                </button>
            )}
        </div>
    )
}
export default Home;