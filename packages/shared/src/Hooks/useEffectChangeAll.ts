import { useEffect, useRef } from 'react';
import usePrevious from './usePrevious';

const useEffectChangeAll = (func: Function, deps: any[]) => {
    const prevDeps = usePrevious(deps);
    const changeTarget = useRef<any[]>();
    useEffect(() => {
        if (changeTarget.current === undefined) {
            changeTarget.current = prevDeps;
        }
        // make sure every dependency has changed
        if (changeTarget.current && changeTarget.current.every((dep, i) => dep !== deps[i])) {
            changeTarget.current = deps;
            return func();
        }
    }, [func, prevDeps, ...deps]);
}

export default useEffectChangeAll;