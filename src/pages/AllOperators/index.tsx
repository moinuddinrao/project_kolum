import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";

import OperatorsTable from "./OperatorsTable";

import AddNewOperator, {
  BasicInformation,
  ContactData,
} from "@/pages/AllOperators/AddNewOperator"; // Import the types here
import ViewOperatorDetails from "@/pages/ViewOperatorDetails";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

const AllOperators = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [savedData, setSavedData] = useState<{
    basicInformation: BasicInformation;
    contactData: ContactData;
  } | null>(null);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleDataSave = (data: {
    basicInformation: BasicInformation;
    contactData: ContactData;
  }) => {
    setSavedData(data);
  };

  return (
    <section className={`${styles.section}`}>
      {savedData ? (
        <ViewOperatorDetails
          basicInformation={savedData.basicInformation}
          contactData={savedData.contactData}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className={`${styles.heading1}`}>Your Operator</h1>
            <PrimaryButton onClick={showDrawer}>
              <PlusOutlined /> Add new Operator
            </PrimaryButton>
          </div>
          <AddNewOperator
            visible={isDrawerVisible}
            onCloseDrawer={onCloseDrawer}
            onDataSave={handleDataSave}
          />
          <OperatorsTable />
        </>
      )}
    </section>
  );
};

export default AllOperators;
