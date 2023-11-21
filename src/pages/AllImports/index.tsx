import React from "react";

import { PlusOutlined } from "@ant-design/icons";

import ImportsTable from "./ImportsTable";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

const AllImports = () => {
  return (
    <section className={`${styles.section}`}>
      <div className="flex justify-between items-center">
        <h1 className={`${styles.heading1}`}>Your Imports</h1>
        <PrimaryButton>
          <PlusOutlined /> Add new Import
        </PrimaryButton>
      </div>
      <ImportsTable />
    </section>
  );
};

export default AllImports;
