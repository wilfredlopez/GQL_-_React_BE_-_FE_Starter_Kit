import React from "react";
import UpdateUserForm from "./updateUserForm";

interface Props {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

const EditAccount: React.FC<Props> = props => {
  return (
    <div>
      <UpdateUserForm {...props} />
    </div>
  );
};

export default EditAccount;
