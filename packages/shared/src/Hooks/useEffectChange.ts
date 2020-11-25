import { useEffect, useRef } from 'react';

const useEffectChange = (func: Function, deps: any[]) => {
    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

export default useEffectChange;