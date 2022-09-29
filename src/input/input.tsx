import React, { forwardRef, useEffect, useRef } from 'react';
import type { InputProps as RcInputProps, InputRef } from 'rc-input';
import RcInput from 'rc-input';
import { composeRef } from 'rc-util/lib/ref'

export type { InputRef };



// 对外暴露的属性 RcInputProps 为 RcInput组件已经暴露的 
// Omit 排除第二个参数后的其他属性
export interface InputProps
  extends Omit<
    RcInputProps,
    'wrapperClassName' | 'groupClassName' | 'inputClassName' | 'affixWrapperClassName'
  > {
  disabled?: boolean;
  bordered?: boolean;
}

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  
  const inputRef = useRef<InputRef>(null);

  useEffect(()=>{
    // console.log(props, 'props')
    // console.log(ref, 'ref');
    // console.log(inputRef, 'inputRef')
    // inputRef
  },[])

  // const {
  //   ...rest
  // } = props;


  return (
      <RcInput 
      ref={composeRef(ref, inputRef)}
      {...props}/>
  )
})

export default Input;


