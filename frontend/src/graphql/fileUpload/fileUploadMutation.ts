import gql from "graphql-tag";

export const fileUploadMutation = gql`
  mutation FileUpload($upload: Upload!) {
    fileUpload(file: $upload)
  }
`;
