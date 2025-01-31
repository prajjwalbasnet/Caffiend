import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail,
    signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"

const AuthContext  = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const { children } = props

    const [globalUser, setGlobalUser] = useState(null)
    const [globalData, setGlobalData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }
    
    function logout(){
        setGlobalUser(null)
        setGlobalData(null)
        return signOut(auth)
    }

    const value = {globalUser, globalData, setGlobalData, isLoading, signup, login,
                    logout}
    
    useEffect(()=>{
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log('CURRENT USER: ', user)
            setGlobalUser(user)
            if (!user) {
                console.log('No user data')
                return
            }
            
            try{
                setIsLoading(true)
                
                //reference is created first and then we get the doc , then we 
                //snapshot it to sese if there's anything there
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseData = {}
                if (docSnap.exists()) {
                    firebaseData = docSnap.data()
                    console.log('User found', firebaseData)
                }
                setGlobalData(firebaseData)
            } catch(err){
                console.log(err)
            } finally{
                setIsLoading(false)
            }
          })
          return unsubscribe
    }, [])
                
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}