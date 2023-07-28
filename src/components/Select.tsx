import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { SchemaType } from "./Form";
import React, { PropsWithChildren } from "react";
import styles from "./Form.module.css";
import { camel2title } from "../utils/string";

type Props = {
  label: Path<SchemaType>;
  errors: FieldErrors<SchemaType>;
} & ReturnType<UseFormRegister<SchemaType>>;

export const Select = React.forwardRef<
  HTMLSelectElement,
  PropsWithChildren<Props>
>(({ onChange, onBlur, name, label, children, errors }, ref) => {
  return (
    <div className={styles.inputWrapper}>
      <label>
        <div className={styles.label}>{camel2title(label)}</div>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          {children}
        </select>
      </label>

      {errors[label] && (
        <span className={styles.error}>{errors[label]!.message}</span>
      )}
    </div>
  );
});
