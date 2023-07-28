import { UseFormRegister } from "react-hook-form";
import { SchemaType } from "./Form";
import React from "react";

type Props = { label: string } & ReturnType<UseFormRegister<SchemaType>>;

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ onChange, onBlur, name, label }, ref) => {
    return (
      <>
        <label>{label}</label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </>
    );
  }
);
