import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Steps } from "antd";

import PersonalDataForm from "./PersonalDataForm";
import CompanyDataForm from "./CompanyDataForm";
import ReviewData from "./ReviewData";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import styles from "@/assets/Styles";
import { ROUTES } from "@/Router";

const { Step } = Steps;

// Interfaces for form data
export interface PersonalData {
  first: string;
  last: string;
  jobTitle: string;
  CBAMRole: string;
}

export interface CompanyData {
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
}

const CompanySetup: React.FC = () => {
  const [current, setCurrent] = useState(-1);
  const [data, setData] = useState<{
    personalData: PersonalData;
    companyData: CompanyData;
  }>({
    personalData: {
      first: "",
      last: "",
      jobTitle: "",
      CBAMRole: "",
    },
    companyData: {
      name: "",
      eori: "",
      portalId: null,
      streetName: "",
      streetNumber: "",
      addressAddition: "",
      city: "",
      zip: null,
      country: "",
      poBox: "",
    },
  });

  const navigate = useNavigate();

  const handleSkip = () => {
    navigate(ROUTES.dashboard);
  };

  const goBack = () => {
    setCurrent(current - 1);
  };

  const handlePersonalData = (values: PersonalData) => {
    setData((prevData) => ({
      ...prevData,
      personalData: values,
    }));
    setCurrent(current + 1);
  };

  const handleCompanyData = (values: CompanyData) => {
    setData((prevData) => ({
      ...prevData,
      companyData: values,
    }));
    setCurrent(current + 1);
  };

  const handleSubmit = () => {
    console.log("Data", data);
    navigate(ROUTES.dashboard);
  };

  const steps = [
    {
      title: "Personal Data",
      content: (
        <PersonalDataForm goBack={goBack} onSuccess={handlePersonalData} />
      ),
    },
    {
      title: "Company Data",
      content: (
        <CompanyDataForm goBack={goBack} onSuccess={handleCompanyData} />
      ),
    },
    {
      title: "Check & Finish",
      content: (
        <ReviewData
          personalData={data.personalData}
          companyData={data.companyData}
          goBack={goBack}
          onSuccess={handleSubmit}
        />
      ),
    },
  ];

  return (
    <section id="company-data" className={`${styles.section}`}>
      <h1 className={`${styles.heading1}`}>Company Profile Setup</h1>

      {current === -1 && (
        <div className={`${styles.box}`}>
          <div className="w-full flex flex-1 flex-col gap-5 justify-center items-center text-center">
            <h3 className={`${styles.heading3}`}>Welcome to kolum</h3>

            <p className={`${styles.text} max-w-sm`}>
              Let&apos;s set up your profile to make your report creation and
              submission as easy as possible.
            </p>
          </div>

          <div className="flex justify-end gap-5">
            <SecondaryButton
              onClick={handleSkip}
              className="w-fit h-[40px] !px-5"
            >
              Skip
            </SecondaryButton>
            <PrimaryButton
              onClick={() => setCurrent(0)}
              className="w-fit h-[40px] !px-5"
            >
              Start
            </PrimaryButton>
          </div>
        </div>
      )}

      {current >= 0 && (
        <div className={`${styles.box}`}>
          <Steps className={`${styles.text}`} current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          {/* Content */}
          <div className="w-full flex flex-1">{steps[current].content}</div>
        </div>
      )}
    </section>
  );
};

export default CompanySetup;
