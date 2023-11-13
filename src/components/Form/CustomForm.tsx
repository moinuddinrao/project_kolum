import React from "react";

import { Form, Input } from "antd";

import styles from "@/assets/Styles";

// Define a generic interface for CustomFormProps
interface CustomFormProps<T> {
  form: any;
  initialValues: T;
  isUpdate?: boolean;
  onSubmit: (values: Partial<T>) => void;
  formFields: {
    title: string | string[];
    fields: {
      label: string;
      name: keyof T;
      required?: boolean;
    }[];
  }[];
}

const CustomForm = <T,>({
  form,
  initialValues,
  isUpdate,
  onSubmit,
  formFields,
}: CustomFormProps<T>) => {
  return (
    <>
      {/* Initial Data */}
      <div
        className={`${
          isUpdate ? "hidden" : "block"
        } w-full flex flex-col gap-5`}
      >
        {formFields.map(({ title, fields }) => (
          <div key={String(title)} className="flex flex-col gap-5">
            {/* Title */}
            <h3 className={`${styles.heading3}`}>{title}</h3>

            {/* Fields */}
            <div className="flex flex-wrap gap-y-10">
              {fields.map((field) => (
                <div
                  className="w-1/3 flex flex-col items-left gap-3"
                  key={String(field.name)}
                >
                  <p className={`${styles.label}`}>{field.label}</p>
                  <p className={`${styles.text}`}>
                    {initialValues[field.name] as any}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      {/* Conditionally render based on the isUpdate state */}
      <Form
        form={form}
        layout="vertical"
        initialValues={isUpdate ? (initialValues as any) : undefined}
        className={`${
          isUpdate ? "block" : "hidden"
        } w-full flex flex-col gap-5`}
        size="large"
        onFinish={onSubmit}
      >
        {formFields.map(({ title, fields }) => (
          <div key={String(title)} className="w-full flex flex-col gap-5">
            {/* Title */}
            <h3 className={`${styles.heading3}`}>{title}</h3>

            {/* Fields */}
            <div className="w-full flex flex-wrap gap-y-10">
              {fields.map((field) => (
                <Form.Item
                  key={String(field.name)}
                  label={
                    <label className={`${styles.label}`}>{field.label}</label>
                  }
                  name={String(field.name)}
                  className={`h-fit w-1/3 m-0 p-0`}
                  rules={
                    field.required
                      ? [
                          {
                            required: true,
                            message: `Please input your ${field.label}!`,
                          },
                        ]
                      : []
                  }
                >
                  <Input className="w-fit" />
                </Form.Item>
              ))}
            </div>
          </div>
        ))}
      </Form>
    </>
  );
};

export default CustomForm;
