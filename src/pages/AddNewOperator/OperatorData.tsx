import React from "react";

import { QuestionCircleOutlined } from "@ant-design/icons";

import { PrimaryButton } from "@/components/Button/PrimaryButton";

export const GoodsData = [
  {
    key: "1",
    cnCode: "2507 00 80 - Other kaolinic clays",
    productionInstallation: "Installation Name 1",
    productionProcess: "Available",
    carbonPrizePaidData: "Available",
  },
  {
    key: "2",
    cnCode: "2323 10 10 - Cement clinkers",
    productionInstallation: "Installation Name 2",
    productionProcess: undefined,
    carbonPrizePaidData: undefined,
  },
];

export const GoodsColumn = [
  {
    title: "CN Code",
    dataIndex: "cnCode",
    key: "cnCode",
  },
  {
    title: "Production Installation",
    dataIndex: "productionInstallation",
    key: "productionInstallation",
  },
  {
    title: (
      <span>
        Production Process <QuestionCircleOutlined className="text-sm" />
      </span>
    ),
    dataIndex: "productionProcess",
    key: "productionProcess",
    render: (text: any) => {
      if (text) {
        return text;
      } else {
        return <PrimaryButton type="primary">Add</PrimaryButton>;
      }
    },
  },
  {
    title: (
      <span>
        Carbon Prize Paid Data <QuestionCircleOutlined className="text-sm" />
      </span>
    ),
    dataIndex: "carbonPrizePaidData",
    key: "carbonPrizePaidData",
    render: (text: any) => {
      if (text) {
        return text;
      } else {
        return <PrimaryButton type="primary">Add</PrimaryButton>;
      }
    },
  },
];

export const InstallationData = [
  {
    key: "1",
    name: "Installation Name 1",
    city: "New York City",
    country: "USA",
    "UN/LOCODE Number": "US2M8",
    installationID: "ID123",
    economicActivity: "Steel Production",
  },
  {
    key: "2",
    name: "Installation Name 2",
    city: "Beijing",
    country: "China",
    "UN/LOCODE Number": "CNBJS",
    installationID: "ID456",
    economicActivity: "Manufacturing",
  },
];

export const InstallationColumn = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "UN/LOCODE Number",
    dataIndex: "UN/LOCODE Number",
    key: "UN/LOCODE Number",
  },
  {
    title: "Installation ID",
    dataIndex: "installationID",
    key: "installationID",
  },
  {
    title: "Economic Activity",
    dataIndex: "economicActivity",
    key: "economicActivity",
  },
];
