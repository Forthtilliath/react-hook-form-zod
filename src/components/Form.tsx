import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAnAdult } from "../utils/date";
import styles from "./Form.module.css";
import { Input } from "./Input";
import { Select } from "./Select";
import { Date } from "./Date";

const schema = z
  .object({
    title: z.string().min(1, { message: "You must select a title!" }),
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
  // ! Le message d'erreur de ref vient du console.log !
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Select label="title" {...register("title")} errors={errors}>
        <option value="">Please select your title</option>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </Select>

      <Input label="firstname" register={register} errors={errors} />
      <Input label="lastname" register={register} errors={errors} />
      <Input label="email" register={register} errors={errors} />

      <Date label="birthday" control={control} errors={errors} />

      <Input
        label="newsletter"
        register={register}
        errors={errors}
        type="checkbox"
      />
      <Input
        label="password"
        register={register}
        errors={errors}
        type="password"
      />
      <Input
        label="confirmPassword"
        register={register}
        errors={errors}
        type="password"
      />
      <Input
        label="rules"
        register={register}
        errors={errors}
        type="checkbox"
      />

      <Input label="numberOfEyes" register={register} errors={errors} />

      <input type="submit" value="Sign up" />
    </form>
  );
}
