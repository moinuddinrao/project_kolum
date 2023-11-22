import React from "react";

import { Select, Form } from "antd";

interface SelectCollapseProps {
  selectField: {
    name: string;
    placeholder: string;
    label: React.ReactNode;
    required?: boolean;
    options: Array<{ key: string; value: string; name: string }>;
    onChange: (value: string) => void;
  };
}

const SelectCollapse: React.FC<SelectCollapseProps> = ({ selectField }) => {
  return (
    <div>
      {selectField.label && <p>{selectField.label}</p>}
      <div className="w-full flex flex-col">
        <Form.Item
          name={selectField.name}
          rules={[
            {
              required: true,
              message: `Please input your ${selectField.placeholder}!`,
            },
          ]}
        >
          <Select
            placeholder={`${selectField.placeholder}`}
            onChange={selectField.onChange}
          >
            {selectField.options.map((option) => (
              <Select.Option key={option.key} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

export default SelectCollapse;
