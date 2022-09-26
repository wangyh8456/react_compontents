import React, { forwardRef } from 'react';
import type { InputProps as RcInputProps, InputRef } from 'rc-input';
import RcInput from 'rc-input';

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
  atea?:number;         /// 无意义属性，测试下暴露的属性
}

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  console.log(props, 'props')
  // const {
  //   ...rest
  // } = props;

  console.log(props, 'rest')
  return (
      <RcInput {...props}/>
  )
})

export default Input;


