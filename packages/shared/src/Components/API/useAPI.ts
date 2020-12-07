import { useContext } from "react";
import { APIContext } from './APIProvider';

const useAPI = () => {
    const context = useContext(APIContext)
    return context;
}
export default useAPI;
