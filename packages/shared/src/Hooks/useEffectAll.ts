import { useRef, useEffect } from 'react';
import usePrevious from './usePrevious';

const useEffectAll = (fn: Function, deps: any[]) => {
    const prevDeps = usePrevious(deps);
    const changeTarget = useRef<any[]>();

    useEffect(() => {
        // nothing to compare to yet
        if (changeTarget.current === undefined) {
            changeTarget.current = prevDeps;
        }

        // we're mounting, so call the callback
        if (changeTarget.current === undefined) {
            return fn();
        }

        // make sure every dependency has changed
        if (changeTarget.current.every((dep, i) => dep !== deps[i])) {
            changeTarget.current = deps;

            return fn();
        }
    }, [fn, prevDeps, deps]);
}
export default useEffectAll;



// Causes more re-render but cleaner
// function useEffectAllDepsChange(fn, deps) {
//     const [changeTarget, setChangeTarget] = useState(deps);
  
//     useEffect(() => {
//       setChangeTarget(prev => {
//         if (prev.every((dep, i) => dep !== deps[i])) {
//           return deps;
//         }
  
//         return prev;
//       });
//     }, [deps]);
  
//     useEffect(fn, changeTarget);
//   }