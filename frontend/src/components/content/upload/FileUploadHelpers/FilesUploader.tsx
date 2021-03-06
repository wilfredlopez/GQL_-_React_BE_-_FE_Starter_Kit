import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFileUploadMutation } from "../../../../generated/apolloComponents";
import { filesQuery } from "../../../../graphql/fileUpload/fileQuery";

// const uploadFileMutation = gql`
//   mutation fileUpload($file: Upload!) {
//     fileUpload(file: $file)
//   }
// `;
// export const filesQuery = gql`
//   {
//     files
//   }
// `;

const FilesUploaderHelper: React.FunctionComponent = () => {
  // const [fileUpload] = useMutation(fileUploadMutation, {
  //   refetchQueries: [{ query: filesQuery }]
  // });

  const [doupload] = useFileUploadMutation({
    refetchQueries: [{ query: filesQuery }]
  });
  //   await apolloClient.mutate<ConfirmMutation, ConfirmMutationVariables>({
  //     mutation: confirmMutaion,
  //     variables: { token: token as string },
  //   })
  const onDrop = useCallback(
    ([file]) => {
      doupload({
        variables: {
          upload: file
        }
      });
      // fileUpload({ variables: { file } });
      console.log(file);
    },
    [
      //fileUpload,
      doupload
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <h1>This is a drag and drop to upload files to the server</h1>
      <div {...getRootProps()}>
        <input {...getInputProps({ type: "file" })} />
        {isDragActive ? (
          <p className="drop-area">Drop the files here ...</p>
        ) : (
          <p className="drop-area">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
    </>
  );
};

export default FilesUploaderHelper;

// import React, { useCallback } from "react"
// import { useDropzone } from "react-dropzone"
// import gql from "graphql-tag"
// import { useMutation } from "@apollo/react-hooks"

// export const filesQuery = gql`
//   {
//     files
//   }
// `

// const uploadFileMutation = gql`
//   mutation UploadFile($file: Upload!) {
//     uploadFile(file: $file)
//   }
// `

// const FilesUpload: React.FunctionComponent = () => {
//   const [uploadFile] = useMutation(uploadFileMutation, {
//     refetchQueries: [{ query: filesQuery }],
//   })
//   const onDrop = useCallback(
//     ([file]) => {
//       uploadFile({ variables: { file } })
//     },
//     [uploadFile],
//   )
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
//   return (
//     <>
//       <h1>This is a drag and drop to upload files to the server</h1>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p className="drop-area">Drop the files here ...</p>
//         ) : (
//           <p className="drop-area">
//             Drag 'n' drop some files here, or click to select files
//           </p>
//         )}
//       </div>
//     </>
//   )
// }

// export default FilesUpload
