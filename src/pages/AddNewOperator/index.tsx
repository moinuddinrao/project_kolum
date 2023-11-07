import React, { useState } from "react";

import { Select } from "antd";

import OperatorDetails from "./OperatorDetails";

import { originData } from "@/pages/AllOperators/AllOperatorsData";
import styles from "@/assets/Styles";

export interface IAppProps {}

export function AddNewOperator() {
  const options = originData.map((item) => ({
    value: item.key,
    label: item.name,
    city: item.city,
    country: item.city,
    imported_good: item.imported_good,
    Phone_number: item.Phone_number,
    Production_installation: item.Production_installation,
    editable: item.editable,
    dataIndex: item.dataIndex,
    title: item.title,
    eori: item.eori,
    portalId: item.portalId,
    streetName: item.streetName,
    streetNumber: item.streetNumber,
    zip: item.zip,
    poBox: item.poBox,
  }));

  const [selectedData, setSelectedData] = useState<{
    value: string;
    label: string;
    city: string;
    country: string;
    imported_good: string;
    Production_installation: string;
    Phone_number: string;
    editable: boolean;
    dataIndex: string;
    title: string;
  } | null>(null);

  const onChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setSelectedData(selectedOption);
      console.log(selectedData);
    }
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <section className={`${styles.section}`}>
      {selectedData ? (
        <OperatorDetails
          selectedData={selectedData}
          setSelectedData={setSelectedData}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className={`${styles.heading1}`}>Your Operator</h1>
          </div>
          <div
            className={`${styles.box} flex flex-col items-center text-center`}
          >
            <h2 className={`${styles.heading2}`}>
              Search the kolum operator database
            </h2>
            <h2 className={`${styles.text}`}>
              Identify your supplier and connect with one click. <br />
              Alternatively, you can manually create a new operator <br /> in
              under 3 minutes.
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
          </div>
        </>
      )}
    </section>
  );
}
