import React from "react";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";

export const ProducedGoodsData = [
  {
    key: "1",
    name: "Installation Name 1",
    city: "New York City",
    country: "USA",
    "UN/LOCODE Number": "US2M8",
    imported_good: [
      "7103 99 00 – Precious stones",
      "2323 10 10 - Cement clinkers",
    ],
    emissionData: ["Available", "Not Available"],
    productionProcess: ["Available", "Not Available"],
    carbonPricePaidData: ["Available", "Not Available"],
  },
  {
    key: "2",
    name: "Installation Name 2",
    city: "Beijing",
    country: "China",
    "UN/LOCODE Number": "CNBJS",
    imported_good: [
      "2507 00 80 - Other kaolinic clays",
      "8542 31 00 – Microprocessors",
    ],
    emissionData: ["Available", "Not Available"],
    productionProcess: ["Available", "Not Available"],
    carbonPricePaidData: ["Available", "Not Available"],
  },
];

export const ProducedGoodsColumn = [
  {
    title: "CN Code",
    dataIndex: "imported_good",
    key: "imported_good",
    render: (importedGood: string[]) => (
      <div className="flex flex-col gap-5">
        {importedGood.map((code, index) => (
          <div key={index}>{code}</div>
        ))}
      </div>
    ),
  },
  {
    title: "Emission Data",
    dataIndex: "emissionData",
    key: "emissionData",
    render: (emissionData: string[], record: any) => (
      <div className="flex flex-col gap-5">
        {emissionData.map((data, index) =>
          data === "Available" ? (
            <PrimaryButton key={index}>{data}</PrimaryButton>
          ) : (
            <SecondaryButton key={index}>Add</SecondaryButton>
          ),
        )}
      </div>
    ),
  },
  {
    title: "Production Process",
    dataIndex: "productionProcess",
    key: "productionProcess",
    render: (productionProcess: string[]) => (
      <div className="flex flex-col gap-5">
        {productionProcess.map((data, index) =>
          data === "Available" ? (
            <PrimaryButton key={index}>{data}</PrimaryButton>
          ) : (
            <SecondaryButton key={index}>Add</SecondaryButton>
          ),
        )}
      </div>
    ),
  },
  {
    title: "Carbon Price Paid Data",
    dataIndex: "carbonPricePaidData",
    key: "carbonPricePaidData",
    render: (carbonPricePaidData: string[]) => (
      <div className="flex flex-col gap-5 justify-center">
        {carbonPricePaidData.map((data, index) =>
          data === "Available" ? (
            <PrimaryButton key={index}>{data}</PrimaryButton>
          ) : (
            <SecondaryButton key={index}>Add</SecondaryButton>
          ),
        )}
      </div>
    ),
  },
];
