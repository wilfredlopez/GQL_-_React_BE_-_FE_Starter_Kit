import React from "react";
import { FilesComponent } from "../../../../generated/apolloComponents";

const GOOGLE_GLOUD_STORAGE_URL =
  "https://storage.cloud.google.com/files-wilfred";

const FilesGetter = () => {
  return (
    <>
      <hr></hr>
      <FilesComponent>
        {({ data }) => {
          return (
            <div>
              {data && data.files ? (
                <>
                  <h2>
                    This are files uploaded to {`${GOOGLE_GLOUD_STORAGE_URL}`}
                  </h2>

                  <div className="display-area">
                    {data.files.map(x => (
                      <div className="display-area_item" key={x.name}>
                        <img
                          style={{ width: 200 }}
                          src={`${x.link}`}
                          alt={x.name}
                        />
                        <a
                          href={`${x.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download {x.name}
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                "Loading..."
              )}
            </div>
          );
        }}
      </FilesComponent>
    </>
  );
};

export default FilesGetter;

//OLD WAY

// import { useQuery } from "@apollo/react-hooks"
// import gql from "graphql-tag"
// export const filesQuery = gql`
//   {
//     files
//   }
// `

// export const FilesGetter = () => {
//   const { data, loading } = useQuery(filesQuery)

//   if (loading) {
//     return <div>loading...</div>
//   }

//   return (
//     <>
//       <h2>This are files uploaded to {`${GOOGLE_GLOUD_STORAGE_URL}`}</h2>

//       <div className="display-area">
//         {data.files.map((x: string) => (
//           <div className="display-area_item">
//             <img
//               style={{ width: 200 }}
//               key={x}
//               src={`${GOOGLE_GLOUD_STORAGE_URL}/${x}`}
//               alt={x}
//             />
//             <a
//               href={`${GOOGLE_GLOUD_STORAGE_URL}/${x}`}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Download
//             </a>
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }
