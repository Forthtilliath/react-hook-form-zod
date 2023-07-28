import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAnAdult } from "../utils/date";
import styles from "./Form.module.css";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const schema = z
  .object({
    title: z.string().min(1),
    firstname: z.string().min(2).max(30),
    lastname: z.string().min(2).max(30),
    email: z.string().email(),
    birthday: z.date().refine(isAnAdult, { message: "Your are not an adult!" }),
    newsletter: z.coerce.boolean(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
    numberOfEyes: z.coerce.number(),
    rules: z.coerce
      .boolean()
      .refine((val) => val, { message: "You must accept the rules!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export type SchemaType = z.infer<typeof schema>;

export function Form() {
  const {
    control, 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({ resolver: zodResolver(schema) });

  const onSubmit = (data: SchemaType) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <select {...register("title")}>
        <option value="">Please select your title</option>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>

      <input type="text" placeholder="Firstname" {...register("firstname")} />
      {errors && <span></span>}

      <input type="text" placeholder="Lastname" {...register("lastname")} />

      <input type="text" placeholder="Email" {...register("email")} />

      {/* <input type="datetime" placeholder="Birthday" {...register("birthday")} /> */}
      <Controller
        control={control}
        name="birthday"
        render={({ field }) => (
          <DatePicker
            placeholderText="Select date"
            onChange={field.onChange}
            selected={field.value}
          />
        )}
      />

      <label>
        Subscribe to the newsletter ?
        <input type="checkbox" {...register("newsletter")} />
      </label>

      <input type="password" placeholder="Password" {...register("password")} />

      <input
        type="password"
        placeholder="Confirm the password"
        {...register("confirmPassword")}
      />

      <input type="submit" value="Sign up" />
    </form>
  );
}
