import { useState } from "react"
import Authentication from "./Authentication"
import Modal from "./Modal"
import { useAuth } from "../context/AuthContext"

export default function Layout(props) {
    const [showModal, setShowModal] = useState(false)

    const {children} = props

    const {globalUser, logout} = useAuth()

    const header = (
        <header className="header">
            <div className="header-content">
                <h1 className="text-gradient">Caffiend</h1>
                <p>For Coffee Insatiaties</p>
            </div>
            { globalUser ? (<button onClick={logout} className="header-button">
                <p>Logout</p>
            </button>)
                : (<button onClick={() => {setShowModal(true)}} className="header-button">
                <p>Sign up for free</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>)}
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">Caffiend</span> was made by <a href="#">
                Prajjwal</a><br />using the <a href="#">FantaCSS</a> design library <br/>
                Check out the project on <a href="https://github.com/prajjwalbasnet/Caffiend" 
                target="_blank">Github</a></p>
        </footer>
    )

    function handleCloseModal() {
        setShowModal(false)
    }
    return(
        <>
            {showModal && (
            <Modal handleCloseModal = {handleCloseModal}>
                <Authentication handleCloseModal = {handleCloseModal}/>
            </Modal>)}
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )

}