import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";

import { ImportsTable } from "./ImportsTable";

import { AddNewImport } from "@/pages/AllImports/AddNewImport";
import { NewImportData } from "@/pages/AllImports/AddNewImport";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

export const AllImports = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleDataSave = (data: NewImportData) => {
    // TODO: Save data to database
    onCloseDrawer();
  };

  return (
    <section className={`${styles.section}`}>
      <div className="flex justify-between items-center">
        <h1 className={`${styles.heading1}`}>Your Imports</h1>
        <PrimaryButton onClick={showDrawer}>
          <PlusOutlined /> Add new Import
        </PrimaryButton>
      </div>
      <AddNewImport
        visible={isDrawerVisible}
        onCloseDrawer={onCloseDrawer}
        onDataSave={handleDataSave}
      />
      <ImportsTable />
    </section>
  );
};
