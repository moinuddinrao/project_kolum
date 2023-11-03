import React, { useState, useEffect } from "react";

import { Form, Input } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

// Define a generic interface for CustomFormProps
interface CustomFormProps<T> {
  formValues: T;
  onSubmit: (values: Partial<T>) => void;
  title: string;
  fields: {
    label: string;
    name: keyof T;
    required?: boolean;
  }[];
}

const CustomForm = <T,>({
  formValues,
  onSubmit,
  title,
  fields,
}: CustomFormProps<T>) => {
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue(formValues);
    }
  }, [isUpdate, formValues, form]);

  // Handle form submission
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedData = { ...formValues, ...values };
      onSubmit(updatedData);
      setIsUpdate(false);
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
    }
  };

  return (
    <section className={`flex flex-col gap-5`}>
      <div className="flex items-center justify-between">
        {/* Section Heading */}
        <h3 className={`${styles.heading3}`}>{title}</h3>

        {/* Edit Button */}
        {formValues && (
          <PrimaryButton
            onClick={setIsUpdate.bind(null, !isUpdate)}
            className="w-10 h-10 flex justify-center items-center text-xl"
          >
            {isUpdate ? <CloseOutlined /> : <EditOutlined />}
          </PrimaryButton>
        )}
      </div>

      {/* Section Text */}
      {/* Conditionally render based on the isUpdate state */}
      <div
        className={`${isUpdate ? "hidden" : "block"} flex flex-wrap gap-y-10`}
      >
        {fields.map((field) => (
          <div
            className="w-1/3 flex flex-col items-left gap-3"
            key={String(field.name)}
          >
            <p className={`${styles.label}`}>{field.label}</p>
            <p className={`${styles.text}`}>{formValues[field.name] as any}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      {/* Conditionally render based on the isUpdate state */}
      <div className={`${isUpdate ? "block" : "hidden"}`}>
        <Form
          form={form}
          layout="vertical"
          initialValues={isUpdate ? (formValues as any) : undefined}
          className="flex flex-col items-end gap-5"
          size="large"
          onFinish={handleFormSubmit}
        >
          {/* Form Fields */}
          {/* Map over the fields to generate form inputs */}
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

          {/* Form Actions */}
          <Form.Item className="m-0">
            <PrimaryButton htmlType="submit" className="w-fit h-fit !px-5">
              Save
            </PrimaryButton>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default CustomForm;
