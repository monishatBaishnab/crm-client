import { ReactNode, useEffect, useRef } from "react";
import {
  FormProvider,
  useForm,
  Resolver,
  UseFormReset,
  FieldValues,
  DefaultValues,
} from "react-hook-form";

interface FormProps<TFormValues extends FieldValues> {
  onSubmit: (
    data: TFormValues,
    reset: UseFormReset<TFormValues>,
  ) => Promise<void>;
  defaultValues?: DefaultValues<TFormValues>;
  resolver?: Resolver<TFormValues>;
  children: ReactNode;
}

const Form = <TFormValues extends FieldValues>({
  onSubmit,
  defaultValues,
  resolver,
  children,
}: FormProps<TFormValues>) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  // Use the correct type for useForm configuration
  const methods = useForm<TFormValues>({
    ...(defaultValues ? { defaultValues } : {}),
    ...(resolver ? { resolver } : {}),
  });

  const onFormSubmit = async (data: TFormValues) => {
    await onSubmit(data, methods.reset);
  };

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={methods.handleSubmit(onFormSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
