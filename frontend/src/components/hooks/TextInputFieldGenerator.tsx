import React from "react";
import { Field } from "formik";
import TextInputField from "./textInputField";

interface Props {
  placeholder: string;
  name: string;
  type?: string;
}

export const TextInputFieldGenerator: React.FC<Props> = ({
  name,
  placeholder,
  type = "text"
}) => {
  return (
    <div className="form-control">
      <Field
        name={name}
        type={type}
        label={placeholder}
        component={TextInputField}
        placeholder={placeholder}
      />
    </div>
  );
};
