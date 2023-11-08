import React from "react";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";

interface ReviewDataProps {
  personalData: {
    first: string;
    last: string;
    jobTitle: string;
    CBAMRole: string;
  };
  companyData: {
    name: string;
    eori: string;
    portalId: number | null;
    streetName: string | null;
    streetNumber: string | null;
    addressAddition: string | null;
    city: string | null;
    zip: number | null;
    country: string | null;
    poBox: string | null;
  };
  goBack: () => void;
  onSuccess: () => void;
}

const ReviewData = ({
  personalData,
  companyData,
  goBack,
  onSuccess,
}: ReviewDataProps) => {
  return (
    <section className={`w-full flex flex-col items-end gap-10`}>
      {/* Section Heading */}
      <h2 className={`w-full ${styles.heading2} text-center`}>
        Finally, please check your data
      </h2>

      {/* Personal Data */}
      <div className="w-full flex flex-col gap-10">
        <h3 className={`${styles.heading3}`}>Personal Data</h3>
        <div className="flex flex-wrap gap-y-10">
          {/* Name */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>Name</p>
            <p className={`${styles.text}`}>
              {personalData.first} {personalData.last}
            </p>
          </div>

          {/* Job Title */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>Job Title</p>
            <p className={`${styles.text}`}>{personalData.jobTitle}</p>
          </div>

          {/* CBAM Role */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>CBAM Role</p>
            <p className={`${styles.text}`}>{personalData.CBAMRole}</p>
          </div>
        </div>
      </div>

      {/* Company Legal Information */}
      <div className="w-full flex flex-col gap-10">
        <h3 className={`${styles.heading3}`}>Company Data</h3>
        <div className="flex flex-wrap gap-y-10">
          {/* Legal Name */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>Legal Name</p>
            <p className={`${styles.text}`}>{companyData.name}</p>
          </div>

          {/* EORI */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>EORI</p>
            <p className={`${styles.text}`}>{companyData.eori}</p>
          </div>

          {/* Trader Portal ID */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>Trader Portal ID</p>
            <p className={`${styles.text}`}>
              {companyData.portalId ?? "Not Provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Company Address */}
      <div className="w-full flex flex-col gap-10">
        <h3 className={`${styles.heading3}`}>Company Address</h3>
        <div className="flex flex-wrap gap-y-10">
          {/* Street Name */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>Street Name</p>
            <p className={`${styles.text}`}>
              {companyData.streetName ?? "Not Provided"}
            </p>
          </div>

          {/* Street Number */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>Street Number</p>
            <p className={`${styles.text}`}>
              {companyData.streetNumber ?? "Not Provided"}
            </p>
          </div>

          {/* City */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>City</p>
            <p className={`${styles.text}`}>
              {companyData.city ?? "Not Provided"}
            </p>
          </div>

          {/* ZIP */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>Zip Code</p>
            <p className={`${styles.text}`}>
              {companyData.zip ?? "Not Provided"}
            </p>
          </div>

          {/* Country */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>Country</p>
            <p className={`${styles.text}`}>
              {companyData.country ?? "Not Provided"}
            </p>
          </div>

          {/* PO Box */}
          <div className="w-1/3 flex flex-col items-left gap-3">
            <p className={`${styles.label}`}>PO Box</p>
            <p className={`${styles.text}`}>
              {companyData.poBox ?? "Not Provided"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-5">
        {/* Back Button */}
        <SecondaryButton onClick={goBack} className="w-fit h-fit !px-5 text-lg">
          Back
        </SecondaryButton>

        {/* Next Button */}
        <PrimaryButton
          onClick={onSuccess}
          className="w-fit h-fit !px-5 text-lg"
        >
          Finish Setup
        </PrimaryButton>
      </div>
    </section>
  );
};

export default ReviewData;
