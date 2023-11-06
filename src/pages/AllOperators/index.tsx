import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import OperatorsTable from "./OperatorsTable";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

const AllOperators = () => {
  return (
    <section className={`${styles.section}`}>
      <div className="flex justify-between items-center">
        <h1 className={`${styles.heading1}`}>Your Operator</h1>
        <Link to={"/company/add-operator"}>
          <PrimaryButton>
            <PlusOutlined /> Add new Operator
          </PrimaryButton>
        </Link>
      </div>
      <OperatorsTable />
    </section>
  );
};

export default AllOperators;
