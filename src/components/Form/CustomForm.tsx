import React, { useEffect, useState } from "react";

import { Form, Input, Select } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";

type InputField = {
  type: "input";
  label: string;
  name: string;
  required?: boolean;
};

type SelectField = {
  type: "select";
  label: string;
  name: string;
  options: { label: string; value: string }[];
  required?: boolean;
};

// Define a generic interface for CustomFormProps
interface CustomFormProps<T> {
  form: any;
  initialValues: T;
  onSubmit: (values: Partial<T>) => void;
  formFields: {
    title: string | string[];
    fields: (InputField | SelectField)[];
  }[];
}

const CustomForm = <T,>({
  form,
  initialValues,
  onSubmit,
  formFields,
}: CustomFormProps<T>) => {
  // State to track edit mode
  const [isUpdate, setIsUpdate] = useState(false);

  // Update form values when initialData changes
  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue(initialValues);
    }
  }, [isUpdate, form, initialValues]);

  return (
    <>
      {/* View Data */}
      <div
        className={`${
          isUpdate ? "hidden" : "block"
        } w-full flex flex-col gap-5`}
      >
        {formFields.map(({ title, fields }, index) => (
          <div key={index} className="flex flex-col gap-5">
            {/* Sub-section */}
            <div className="flex items-center justify-between">
              {/* Title */}
              <h3 className={`${styles.heading3}`}>{title}</h3>

              {/* Action Buttons */}
              {index === 0 && (
                <PrimaryButton
                  onClick={setIsUpdate.bind(null, !isUpdate)}
                  className="flex justify-center items-center"
                >
                  Edit <EditOutlined />
                </PrimaryButton>
              )}
            </div>

            {/* Fields */}
            <div className="flex flex-wrap gap-y-10">
              {fields.map((field) => (
                <div
                  className="w-1/3 flex flex-col items-left gap-3"
                  key={String(field.name)}
                >
                  <p className={`${styles.label}`}>{field.label}</p>
                  <p className={`${styles.text}`}>
                    {String((initialValues as any)[field.name])}
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
        onFinish={() => {
          onSubmit(form.getFieldsValue());
          setIsUpdate(false);
        }}
      >
        {formFields.map(({ title, fields }, index) => (
          <div key={index} className="w-full flex flex-col gap-5">
            {/* Sub-section */}
            <div className="flex items-center justify-between">
              {/* Title */}
              <h3 className={`${styles.heading3}`}>{title}</h3>

              {/* Action Buttons */}
              {/* only show one time in mapping */}
              {index === 0 && (
                <div className="flex gap-5">
                  <PrimaryButton
                    onClick={() => form.submit()}
                    className="flex justify-center items-center"
                  >
                    Save <SaveOutlined />
                  </PrimaryButton>

                  <SecondaryButton
                    onClick={setIsUpdate.bind(null, !isUpdate)}
                    className="flex justify-center items-center"
                  >
                    Close <CloseOutlined />
                  </SecondaryButton>
                </div>
              )}
            </div>

            {/* Fields */}
            <div className="w-full flex flex-wrap gap-y-10">
              {fields.map((field) => (
                <div
                  className="w-1/3 flex flex-col items-left gap-3"
                  key={String(field.name)}
                >
                  <p className={`${styles.label}`}>{field.label}</p>
                  {/* Conditionally render based on the field type */}
                  {field.type === "input" && (
                    <Form.Item
                      name={field.name}
                      className={`w-3/4 m-0 p-0`}
                      rules={[
                        {
                          required: field.required,
                          message: `Please input your ${field.label}!`,
                        },
                      ]}
                    >
                      <Input placeholder={field.label} />
                    </Form.Item>
                  )}

                  {field.type === "select" && (
                    <Form.Item
                      name={field.name}
                      className={`w-3/4 m-0 p-0`}
                      rules={[
                        {
                          required: field.required,
                          message: `Please select your ${field.label}!`,
                        },
                      ]}
                    >
                      <Select placeholder={field.label}>
                        {field.options?.map((option) => (
                          <Select.Option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Form>
    </>
  );
};

export default CustomForm;
