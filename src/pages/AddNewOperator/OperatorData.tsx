import React from "react";

import { QuestionCircleOutlined } from "@ant-design/icons";

import { PrimaryButton } from "@/components/Button/PrimaryButton";

export const CNCodeData = [
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

export const CNCodeColumn = [
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
    City: "New York City",
    country: "USA",
    "UN/LOCODE Number": "US2M8",
  },
  {
    key: "2",
    name: "Installation Name 2",
    City: "Beijing",
    country: "China",
    "UN/LOCODE Number": "CNBJS",
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
    dataIndex: "City",
    key: "City",
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
];
