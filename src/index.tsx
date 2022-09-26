// import React, { useCallback, useState } from 'react';
// import RcInput from 'rc-input';

// const JcInput = () => {

//     const [val, setVal] = useState(2);

//     const changeValue = useCallback(() => {
//         setVal(val+1);
//     },[])

//     return (
//         <div>
//             test11
//             {/* <input /> */}
//             <RcInput value={val}/>
//             <button onClick={()=>changeValue()}>改变</button>
//         </div>
//     )
// }

// export default JcInput;

export { default as Input } from './input';