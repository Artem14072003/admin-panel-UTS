import {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from "react";

interface IAdmin {
    admin: null | string
    setAdmin: Dispatch<SetStateAction<null | string>> | null
}

export const AuthContext = createContext<IAdmin>({
    admin: null,
    setAdmin: null
})

export const AuthProvider = ({children}: PropsWithChildren) => {


    const [admin, setAdmin] = useState<string | null>(localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') as string) : null)

    return (
       <AuthContext.Provider value={{admin, setAdmin}}>
           {children}
       </AuthContext.Provider>
    )
}
