/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  variant?: "filled" | "borderless" | "outlined";
  layout?: "vertical" | "horizontal" | "inline";
  formItemLayout?: any;
  form?: any;
} & TFormConfig;

const ContextForm = ({
  children,
  onSubmit,
  defaultValues,
  variant,
  layout,
  formItemLayout,
  form,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  const methods = useForm(formConfig);

  useEffect(() => {
    if (defaultValues) {
      for (const key in defaultValues) {
        methods.setValue(key, defaultValues[key]);
      }
    }
  }, [defaultValues, methods]);

  return (
    <FormProvider {...methods}>
      <Form
        name="Add Book Form"
        form={form}
        {...formItemLayout}
        variant={variant}
        layout={layout}
        onFinish={methods.handleSubmit(onSubmit)}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default ContextForm;
