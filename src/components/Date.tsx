import { Control, Controller, FieldErrors, Path } from "react-hook-form";
import { SchemaType } from "./Form";
import { camel2title } from "../utils/string";
import styles from "./Form.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  // on garde seulement les labels qui ont un type Date
  label: Path<PickByType<SchemaType, Date>>;
  control: Control<SchemaType>;
  errors: FieldErrors<SchemaType>;
};

export function Date({ label, control, errors }: Props) {
  return (
    <div className={styles.inputWrapper}>
      <label>
        <div className={styles.label}>{camel2title(label)}</div>

        <Controller
          control={control}
          name={label}
          render={({ field }) => (
            <ReactDatePicker onChange={field.onChange} selected={field.value} />
          )}
        />
      </label>

      {errors[label] && (
        <span className={styles.error}>{errors[label]!.message}</span>
      )}
    </div>
  );
}
