import {useContext} from 'react';
import {AuthContext} from "../context/authContext.tsx";

const UseAuth = () => {
    return useContext(AuthContext);
};

export default UseAuth;