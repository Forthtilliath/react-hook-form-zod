import { Path, UseFormRegister } from "react-hook-form";
import { SchemaType } from "./Form";

type Props = {
  label: Path<SchemaType>;
  register: UseFormRegister<SchemaType>;
  required: boolean;
};

export function Input({ label, register, required }: Props) {
  return (
    <>
      <label>{label}</label>
      <input {...register(label, { required })} />
    </>
  );
}
