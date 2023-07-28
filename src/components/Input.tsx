import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { SchemaType } from "./Form";
import { camel2title } from "../utils/string";
import { HTMLInputTypeAttribute } from "react";
import styles from "./Form.module.css";

type Props = {
  label: Path<SchemaType>;
  register: UseFormRegister<SchemaType>;
  errors: FieldErrors<SchemaType>;
  type?: HTMLInputTypeAttribute;
};

export function Input({ label, register, errors, type }: Props) {
  return (
    <div className={styles.inputWrapper}>
      <label>
        <div className={styles.label}>{camel2title(label)}</div>

        <div className={styles.checkboxWrapper}>
          <input type={type ?? "text"} {...register(label)} />
          {type === "checkbox" && <div className={styles.slider}></div>}
        </div>
      </label>

      {errors[label] && (
        <span className={styles.error}>{errors[label]!.message}</span>
      )}
    </div>
  );
}
