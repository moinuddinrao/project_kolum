import React, { useState } from "react";

import { Select } from "antd";
import { useNavigate } from "react-router-dom";

import OperatorDetails from "./OperatorDetails";

import { originData } from "@/pages/AllOperators/AllOperatorsData";
import styles from "@/assets/Styles";

export interface IAppProps {}

export function AddNewOperator() {
  const options = originData.map((item) => ({
    value: item.key,
    label: item.name,
  }));

  const [selectedData, setSelectedData] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const navigate = useNavigate();

  const onChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setSelectedData(selectedOption);
      navigate("/company/add-operator/operator-details");
      console.log(selectedData);
    }
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <section className={`${styles.section}`}>
      <div className="flex justify-between items-center">
        <h1 className={`${styles.heading1}`}>Your Operator</h1>
      </div>
      <div className={`${styles.box} flex flex-col items-center text-center`}>
        <h2 className={`${styles.heading2}`}>
          Search the kolum operator database
        </h2>
        <h2 className={`${styles.text}`}>
          Identify your supplier and connect with one click. <br />
          Alternatively, you can manually create a new operator <br /> in under
          3 minutes.
        </h2>
        <Select
          className="min-w-[50%]"
          size="large"
          showSearch
          placeholder="Search operator database..."
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={options}
        />
        {selectedData && (
          <OperatorDetails /> // Pass the selectedData as a prop
        )}
      </div>
    </section>
  );
}
