import React from "react";

import { Collapse, Form, Input } from "antd";

const { Panel } = Collapse;

interface InputCollapseProps {
  header: string;
  fields: Array<{
    name: string;
    placeholder: string;
    required?: boolean;
    value: string | number | undefined;
  }>;
  onChange: (key: string | string[]) => void;
  defaultActiveKey: string[];
}

const InputCollapse: React.FC<InputCollapseProps> = ({
  header,
  fields,
  onChange,
  defaultActiveKey,
}) => {
  return (
    <Collapse defaultActiveKey={defaultActiveKey} onChange={onChange}>
      <Panel header={header} key="1">
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
              <Input placeholder={field.placeholder} />
            </Form.Item>
          ))}
        </div>
      </Panel>
    </Collapse>
  );
};

export default InputCollapse;
