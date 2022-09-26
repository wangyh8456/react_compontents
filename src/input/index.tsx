import React from 'react';
import type { InputProps, InputRef } from './input';
import InternalInput from './input';

interface CompoundedComponent extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>> {

}

const Input = InternalInput as CompoundedComponent;

export default Input;