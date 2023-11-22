import React from "react";

import { Form, Input } from "antd";

const { TextArea } = Input;

interface InputCollapseProps {
  fields: Array<{
    name: string;
    placeholder: string;
    required?: boolean;
    value: string | number | undefined;
    inputType?: "input" | "textarea"; // Add this property to indicate input type
  }>;
}

const InputCollapse: React.FC<InputCollapseProps> = ({ fields }) => {
  return (
    <div className="w-full flex flex-col">
      {fields.map((field) => (
        <Form.Item
          key={String(field.name)}
          name={String(field.name)}
          rules={
            field.required
              ? [
                  {
                    required: true,
                    message: `Please input your ${field.placeholder}!`,
                  },
                ]
              : []
          }
        >
          {field.inputType === "textarea" ? (
            <TextArea rows={6} placeholder={field.placeholder} />
          ) : (
            <Input placeholder={field.placeholder} />
          )}
        </Form.Item>
      ))}
    </div>
  );
};

export default InputCollapse;
