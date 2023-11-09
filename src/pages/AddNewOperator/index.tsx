import React, { useState } from "react";

import { Select } from "antd";

import AddOperatorSearch from "./AddOperatorSearch";

import { originData } from "@/pages/AllOperators/AllOperatorsData";
import styles from "@/assets/Styles";
import { PrimaryButton } from "@/components/Button/PrimaryButton";

export interface IAppProps {}

const AddNewOperator = () => {
  const options = originData.map((item) => ({
    value: item.key,
    label: item.name,
    city: item.city,
    country: item.city,
    imported_good: item.imported_good,
    Phone_number: item.Phone_number,
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
  } | null>(null);
  const [fetching, setFetching] = useState(true);

  const onChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setSelectedData(selectedOption);
      setFetching(false);
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
        <AddOperatorSearch
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
              notFoundContent={
                fetching ? (
                  <div
                    className={`${styles.box} flex flex-col items-center text-center`}
                  >
                    <p className={`${styles.text}`}>
                      No operators found for your search
                    </p>
                    <PrimaryButton>Add new Operator</PrimaryButton>
                  </div>
                ) : null
              }
              options={options}
            />
          </div>
        </>
      )}
    </section>
  );
};
export default AddNewOperator;
