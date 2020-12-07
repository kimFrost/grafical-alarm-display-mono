import React, { createContext, useMemo } from 'react';
import APIKit from './../../Util/APIKit';

export const APIContext = createContext<APIKit|null>(null);

interface IProps {
    api: APIKit;
}

const APIProvider: React.FC<IProps> = ({ children, api }) => {

    //const apiContext = useMemo(() => configure(context), [context])
    const apiContext = api;

    return (
        <APIContext.Provider value={apiContext}>{children}</APIContext.Provider>
    );
}

APIProvider.displayName = 'APIProvider';

export default APIProvider;
