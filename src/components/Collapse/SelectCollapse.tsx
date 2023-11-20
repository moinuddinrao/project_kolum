import React from "react";

import { Collapse, Select, Form } from "antd";

const { Panel } = Collapse;

interface SelectCollapseProps {
  header: string;
  selectField: {
    name: string;
    placeholder: string;
    label: React.ReactNode; // Use React.ReactNode for JSX elements
    options: Array<{ key: string; value: string; name: string }>;
    onChange: (value: string) => void;
  };
  onChange: (key: string | string[]) => void;
}

const SelectCollapse: React.FC<SelectCollapseProps> = ({
  header,
  selectField,
  onChange,
}) => {
  return (
    <Collapse defaultActiveKey={["0"]} onChange={onChange}>
      <Panel header={header} key="1">
        <p>{selectField.label}</p>
        <div className="w-full flex justify-evenly gap-10">
          <Form.Item
            name={selectField.name}
            className={`h-fit w-full m-0 p-0`}
            rules={[
              {
                required: true,
                message: `Please select ${selectField.placeholder}!`,
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
      </Panel>
    </Collapse>
  );
};

export default SelectCollapse;
