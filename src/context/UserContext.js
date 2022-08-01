import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

const initialData = {
    user_id: 0,
    token: "",
    brand: "",
    model: "",
    serial_number: "",
    platform: "",
    version: "",
    is_recover_pass: 0,
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    last_login: 0
};

const UserContext = createContext({
    /** Get user data */
    getValue: () => initialData,
    /** Set new value for user data (new value will be merged with old value) */
    setValue: (newValue = initialData) => { },
    /** Reset to initial value (blank state) */
    resetValue: () => {},
    /** trigger re-render of context value */
    render: () => { }
});

/** Context consumer to get/set user data */
export const useUserContext = () => {
    return useContext(UserContext);
};

/** Context provider that handle/memorize user data */
export const UserContextProvider = (props) => {
    // HANDLE DATA
    const mutableData = useRef(initialData);

    const getMutableData = () => {
        return mutableData.current;
    };

    const setMutableData = (newValue = {}) => {
        mutableData.current = {
            ...mutableData.current,
            ...newValue,
        };
    };

    const resetMutableData = () => {
        mutableData.current = initialData;
    };

    // HANDLE FORCE RENDER
    const setForceRenderState = useState(0)[1];
    const forceRender = () => {
        setForceRenderState(new Date().getTime());
    };

    // RETURN JSX
    return (
        <UserContext.Provider value={{
            getValue: getMutableData,
            setValue: setMutableData,
            resetValue: resetMutableData,
            render: forceRender,
        }}>
            {props.children}
        </UserContext.Provider>
    )
};

export default {
    UserContextProvider,
    useUserContext
};