import { createContext, useContext, useState } from 'react';


const AdminContext = createContext();

// 提供 SignatureContext 的 Provider
export const AdminProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AdminContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AdminContext.Provider>
    );
};


export const useAdmin = () => useContext(AdminContext);