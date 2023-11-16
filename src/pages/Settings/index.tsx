import React, { useState } from "react";

import { Form, Modal } from "antd";

import ChangeEmailModal from "./ChangeEmailModal";
import ResetPasswordModal from "./ResetPasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";

import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/assets/Styles";
import CustomForm from "@/components/Form/CustomForm";

// Interfaces for form data
export interface PersonalData {
  first: string;
  last: string;
  jobTitle: string;
  CBAMRole: string;
}

const Settings = () => {
  // Form instance
  const [form] = Form.useForm();

  // State to track modal visibility
  const [openEmail, setOpenEmail] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

  // State to track form values
  const [initialData, setInitialData] = useState<PersonalData>({
    first: "Helge",
    last: "Wieggrefe",
    jobTitle: "Import Manager",
    CBAMRole: "Importer for all goods",
  });

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setInitialData({ ...initialData, ...values });
      console.log("Success:", values);
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
    }
  };

  // Handle change email
  const handleChangeEmail = () => {
    setOpenEmail(true);
  };

  // handle reset password
  const handleResetPassword = () => {
    setOpenPassword(true);
  };

  // handle delete account
  const handleDeleteAccount = () => {
    setOpenAccount(true);
  };

  const handleCancel = () => {
    setOpenEmail(false);
    setOpenPassword(false);
    setOpenAccount(false);
  };

  return (
    <section id="settings" className={`${styles.section}`}>
      <h1 className={`${styles.heading1}`}>Settings</h1>

      <div className={`${styles.box}`}>
        {/* Personal Data */}
        <CustomForm<PersonalData>
          form={form}
          initialValues={initialData}
          onSubmit={handleSubmit}
          formFields={[
            {
              title: "Personal Data",
              fields: [
                {
                  type: "input",
                  label: "First Name",
                  name: "first",
                  required: true,
                },
                {
                  type: "input",
                  label: "Last Name",
                  name: "last",
                  required: true,
                },
                {
                  type: "input",
                  label: "Job Title",
                  name: "jobTitle",
                  required: true,
                },
                {
                  type: "select",
                  label: "CBAM Role",
                  name: "CBAMRole",
                  options: [
                    {
                      label: "Importer for all goods",
                      value: "Importer for all goods",
                    },
                    {
                      label: "Importer for some goods",
                      value: "Importer for some goods",
                    },
                    {
                      label: "Representative for all goods",
                      value: "Representative for all goods",
                    },
                    {
                      label: "Representative for some goods",
                      value: "Representative for some goods",
                    },
                  ],
                  required: true,
                },
              ],
            },
          ]}
        />

        {/* Line */}
        <hr className="m-0 border border-solid border-nao_light_gray" />

        {/* Account Security */}
        <div className={`flex flex-col gap-5`}>
          <h3 className={`${styles.heading3}`}>Account Security</h3>

          {/* Email */}

          <div className="flex justify-between items-start">
            <div className="w-1/3 flex flex-col items-left gap-3">
              <p className={`${styles.label}`}>Email</p>
              <p className={`${styles.text}`}>helge@kolum.earth</p>
            </div>
            <PrimaryButton onClick={handleChangeEmail}>
              Change Email
            </PrimaryButton>

            {/* Change Email Modal */}
            <Modal
              open={openEmail}
              onCancel={handleCancel}
              footer={null}
              className="!w-2/5 p-0"
            >
              <ChangeEmailModal />
            </Modal>
          </div>

          {/* Password */}
          <div className="flex justify-between items-start">
            <div className="w-1/3 flex flex-col items-left gap-3">
              <p className={`${styles.label}`}>Password</p>
              <p className={`${styles.text}`}>********</p>
            </div>
            <PrimaryButton onClick={handleResetPassword}>
              Reset Password
            </PrimaryButton>

            {/* Reset Password Modal */}
            <Modal
              open={openPassword}
              onCancel={handleCancel}
              footer={null}
              className="!w-2/5 p-0"
            >
              <ResetPasswordModal />
            </Modal>
          </div>

          {/* Line */}
          <hr className="m-0 border border-solid border-nao_light_gray" />

          {/* Danger Zone  */}
          <div className={`flex flex-col gap-5`}>
            <h3 className={`${styles.heading3}`}>Danger Zone</h3>

            {/* Delete Account */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col items-left gap-3">
                <p className={`${styles.label} !text-red`}>Delete My Account</p>
                <p className={`${styles.text}`}>
                  Permanently delete the account and remove access to the kolum
                  app.
                </p>
              </div>
              <PrimaryButton onClick={handleDeleteAccount} className="bg-red">
                Delete Account
              </PrimaryButton>

              {/* Delete Account Modal */}
              <Modal
                open={openAccount}
                onCancel={handleCancel}
                footer={null}
                className="!w-2/5 p-0"
              >
                <DeleteAccountModal />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
