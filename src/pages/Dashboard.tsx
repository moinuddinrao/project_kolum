import React, { useState } from "react";

import { EditOutlined, CloseOutlined } from "@ant-design/icons";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";

interface Company {
  name: string;
  eori: string;
  portalId: string | null;
  streetName: string | null;
  streetNumber: string | null;
  addressAddition: string | null;
  city: string | null;
  zip: number | null;
  country: string | null;
  poBox: string | null;
}

const Dashboard = () => {
  const [isUpdateData, setIsUpdateData] = useState(false);

  const companyData: Company = {
    name: "kolum.earth",
    eori: "DE123456789",
    portalId: "123456789",
    streetName: "Kolum Street",
    streetNumber: "1",
    addressAddition: "1st Floor",
    city: "Berlin",
    zip: 12345,
    country: "Germany",
    poBox: null,
  };

  return (
    // Company Data Section
    <section id="company-data" className={`${styles.section}`}>
      <h1 className={`${styles.heading1}`}>Company Data</h1>

      {/* Box Start */}
      <div className={`${styles.box}`}>
        {/* Company Name */}
        <h2 className={`${styles.heading2}`}>kolum.earth</h2>

        {/* Legal Information */}
        <div className={`flex flex-col gap-5`}>
          <div className="flex items-center justify-between">
            <h3 className={`${styles.heading3}`}>Legal Information</h3>
            {companyData && (
              <PrimaryButton
                onClick={() => {
                  setIsUpdateData(!isUpdateData);
                }}
                className="w-10 h-10 flex justify-center items-center text-xl"
              >
                {isUpdateData ? <CloseOutlined /> : <EditOutlined />}
              </PrimaryButton>
            )}
          </div>

          {/* View Legal Information */}
          <div className={`${isUpdateData ? "hidden" : "block"} flex`}>
            {/* Legal Name */}
            <div className="w-1/3 flex flex-col items-left gap-3">
              <p className={`${styles.label}`}>Legal Name*</p>
              <p className={`${styles.text}`}>{companyData.name}</p>
            </div>

            {/* EORI Number */}
            <div className="w-1/3 flex flex-col items-left gap-3">
              <p className={`${styles.label}`}>EORI Number*</p>
              <p className={`${styles.text}`}>{companyData.eori}</p>
            </div>

            {/* Trader Portal ID Number*/}
            <div className="w-1/3 flex flex-col items-left gap-3">
              <p className={`${styles.label}`}>Trader Portal ID Number</p>
              <p className={`${styles.text}`}>{companyData.portalId}</p>
            </div>
          </div>

          {/* Update Legal Information */}
          <div className={`${isUpdateData ? "block" : "hidden"}`}>
            {/* <UpdateLegalInformation /> */}
          </div>
        </div>

        {/* Address */}
        <div className={`flex flex-col gap-5`}>
          <div className="flex items-center justify-between">
            <h3 className={`${styles.heading3}`}>Address</h3>
            {companyData && (
              <PrimaryButton
                onClick={() => {
                  setIsUpdateData(!isUpdateData);
                }}
                className="w-10 h-10 flex justify-center items-center text-xl"
              >
                {isUpdateData ? <CloseOutlined /> : <EditOutlined />}
              </PrimaryButton>
            )}
          </div>

          {/* View Address */}
          <div
            className={`${
              isUpdateData ? "hidden" : "block"
            } flex flex-col gap-5`}
          >
            {/* Address First Row */}
            <div className="flex">
              {/* Street Name */}
              <div className="w-1/3 flex flex-col items-left gap-3">
                <p className={`${styles.label}`}>Street Name*</p>
                <p className={`${styles.text}`}>{companyData.streetName}</p>
              </div>

              {/* Street Number */}
              <div className="w-1/3 flex flex-col items-left gap-3">
                <p className={`${styles.label}`}>Street Number*</p>
                <p className={`${styles.text}`}>{companyData.streetNumber}</p>
              </div>
            </div>

            {/* Address Second Row */}
            <div className="flex">
              {/* City */}
              <div className="w-1/3 flex flex-col items-left gap-3">
                <p className={`${styles.label}`}>City</p>
                <p className={`${styles.text}`}>{companyData.city}</p>
              </div>

              {/* Zip */}
              <div className="w-1/3 flex flex-col items-left gap-3">
                <p className={`${styles.label}`}>Zip Code</p>
                <p className={`${styles.text}`}>{companyData.zip}</p>
              </div>
            </div>

            {/* Address Third Row */}
            <div className="flex">
              {/* Country */}
              <div className="w-1/3 flex flex-col items-left gap-3">
                <p className={`${styles.label}`}>Country</p>
                <p className={`${styles.text}`}>{companyData.country}</p>
              </div>

              {/* PO Box */}
              <div className="w-1/3 flex flex-col items-left gap-3">
                <p className={`${styles.label}`}>PO Box</p>
                <p className={`${styles.text}`}>{companyData.poBox}</p>
              </div>
            </div>
          </div>

          {/* Update Address */}
          <div className={`${isUpdateData ? "block" : "hidden"}`}>
            {/* <UpdateAddress /> */}
          </div>
        </div>

        {/* Line */}
        <hr className="m-0 h-0.5 text-nao_blue" />

        {/* Team Members */}
        <div className={`flex flex-col gap-5`}>
          <h3 className={`${styles.heading3}`}>Team Members</h3>

          {/* Team Members List */}
          <p className={`${styles.text}`}>Manage your team members here</p>
          <div className="flex items-left gap-3">
            <PrimaryButton className="bg-nao_turquoise opacity-50 pointer-events-none cursor-not-allowed">
              Add new member
            </PrimaryButton>
            <p className={`${styles.text}`}>coming soon</p>
          </div>

          {/* Line */}
          <hr className="m-0 h-0.5 text-nao_blue" />

          {/* Table Header */}
          <div className="flex">
            <p className={`${styles.label} w-1/3`}>User</p>
            <p className={`${styles.label} w-1/3`}>Access Level ?</p>
          </div>

          {/* Line */}
          <hr className="m-0 h-0.5 text-nao_blue" />

          {/* Table Body */}
          <div className="flex">
            <p className={`${styles.text} w-1/3`}>John Doe</p>
            <p className={`${styles.text} w-1/3`}>Admin</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <PrimaryButton className="w-fit h-fit px-10 text-lg">
            Save
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
