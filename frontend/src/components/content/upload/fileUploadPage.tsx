import React from "react";
import FilesUploaderHelper from "./FileUploadHelpers/FilesUploader";
import FilesGetter from "./FileUploadHelpers/FilesGetter";

const FilesUploadPage = () => {
  return (
    <div>
      <h1>Files Upload</h1>
      <FilesUploaderHelper />
      <div>
        <FilesGetter />
      </div>
    </div>
  );
};

export default FilesUploadPage;
