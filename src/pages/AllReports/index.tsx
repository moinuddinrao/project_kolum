import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";

import OperatorsTable from "./ReportsTable";

import AddNewReport from "@/pages/AddNewReport";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

const AllReports = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
  };
  return (
    <section className={`${styles.section}`}>
      <div className="flex justify-between items-center">
        <h1 className={`${styles.heading1}`}>Your Reports</h1>
        <PrimaryButton onClick={showDrawer}>
          <PlusOutlined /> Generate new Report
        </PrimaryButton>
      </div>
      <AddNewReport visible={isDrawerVisible} onCloseDrawer={onCloseDrawer} />
      <OperatorsTable />
    </section>
  );
};

export default AllReports;
