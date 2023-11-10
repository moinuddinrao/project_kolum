import React from "react";

import { Drawer } from "antd";

interface AddNewReportProps {
  visible: boolean;
  onCloseDrawer: () => void;
}

const AddNewReportDrawer: React.FC<AddNewReportProps> = ({
  visible,
  onCloseDrawer,
}) => {
  return (
    <div>
      <Drawer
        title="Add New Report"
        placement="right"
        closable={false}
        onClose={onCloseDrawer}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default AddNewReportDrawer;
