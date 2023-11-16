import React from "react";

import {
  BasicInformation,
  ContactData,
} from "@/pages/AllOperators/AddNewOperator";
import ViewInstallationDetails from "@/components/ViewInstallationDetails";

interface ViewOperatorDetailsProps {
  basicInformation: BasicInformation;
  contactData: ContactData;
}

const ViewOperatorDetails: React.FC<ViewOperatorDetailsProps> = ({
  basicInformation,
  contactData,
}) => {
  return (
    <div>
      <ViewInstallationDetails
        basicInformation={basicInformation}
        contactData={contactData}
      />
    </div>
  );
};

export default ViewOperatorDetails;
