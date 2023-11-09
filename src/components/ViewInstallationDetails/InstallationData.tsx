import React from "react";

import { QuestionCircleOutlined } from "@ant-design/icons";

import { PrimaryButton } from "@/components/Button/PrimaryButton";

export const ProducedGoodsData = [
  {
    key: "1",
    category: "Cement",
    cnCode: "2507 00 80 - Other kaolinic clays",
    productionProcess: "Available",
    carbonPrizePaidData: "Available",
  },
  {
    key: "2",
    category: "Cement",
    cnCode: "2323 10 10 - Cement clinkers",
    productionProcess: "Not Available",
    carbonPrizePaidData: "Not Available",
  },
];

export const ProducedGoodsColumn = [
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "CN Code",
    dataIndex: "cnCode",
    key: "cnCode",
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
