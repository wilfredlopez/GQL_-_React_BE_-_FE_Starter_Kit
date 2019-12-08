import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};

export type FileResponse = {
   __typename?: 'FileResponse',
  name: Scalars['String'],
  link: Scalars['String'],
};

export type FilesType = {
   __typename?: 'FilesType',
  files: Array<FileResponse>,
};

export type Mutation = {
   __typename?: 'Mutation',
  fileUpload: Scalars['String'],
  register: User,
  updateUser: Scalars['Boolean'],
  login?: Maybe<User>,
  changeTheme: Scalars['Boolean'],
  logout: Scalars['Boolean'],
  makeUserAdmin: Scalars['Boolean'],
  confirmUser: Scalars['Boolean'],
};


export type MutationFileUploadArgs = {
  file: Scalars['Upload']
};


export type MutationRegisterArgs = {
  userData: UserInputType
};


export type MutationUpdateUserArgs = {
  userInput: UpdateUserInputType
};


export type MutationLoginArgs = {
  loginData: UserLoginInput
};


export type MutationChangeThemeArgs = {
  themeMode: Scalars['String']
};


export type MutationMakeUserAdminArgs = {
  email: Scalars['String']
};


export type MutationConfirmUserArgs = {
  token: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  files: Array<FileResponse>,
  me?: Maybe<User>,
  AmIAuthorized?: Maybe<Scalars['Boolean']>,
  getAllUsers: Array<User>,
};

export type UpdateUserInputType = {
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
};


export type UploadType = {
   __typename?: 'UploadType',
  stream: Scalars['Boolean'],
  createReadStream: Scalars['Boolean'],
  filename: Scalars['String'],
  mimetype: Scalars['String'],
  encoding: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  stripeId?: Maybe<Scalars['String']>,
  ccLast4?: Maybe<Scalars['String']>,
  subscriptionStatus?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  count: Scalars['Float'],
  admin?: Maybe<Scalars['Boolean']>,
  confirmed: Scalars['Boolean'],
  avatar?: Maybe<Scalars['String']>,
  accessToken?: Maybe<Scalars['String']>,
  refreshToken?: Maybe<Scalars['String']>,
  themeMode?: Maybe<Scalars['String']>,
  playlistId?: Maybe<Scalars['String']>,
  name: Scalars['String'],
};

export type UserInputType = {
  email: Scalars['String'],
  password: Scalars['String'],
  firstname?: Maybe<Scalars['String']>,
  lastname?: Maybe<Scalars['String']>,
};

export type UserLoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type FilesQueryVariables = {};


export type FilesQuery = (
  { __typename?: 'Query' }
  & { files: Array<(
    { __typename?: 'FileResponse' }
    & Pick<FileResponse, 'name' | 'link'>
  )> }
);

export type FileUploadMutationVariables = {
  upload: Scalars['Upload']
};


export type FileUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'fileUpload'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'name' | 'avatar' | 'id' | 'email' | 'admin' | 'firstName' | 'lastName' | 'accessToken' | 'refreshToken' | 'themeMode'>
);

export type ChangeThemeMutationMutationVariables = {
  themeMode: Scalars['String']
};


export type ChangeThemeMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeTheme'>
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<{ __typename?: 'User' }
    & UserFragmentFragment
  > }
);

export type LogoutMutationMutationVariables = {};


export type LogoutMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: { __typename?: 'User' }
    & UserFragmentFragment
   }
);

export type UpdateUserMutationVariables = {
  email: Scalars['String'],
  lastName: Scalars['String'],
  firstName: Scalars['String']
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUser'>
);

export type AmIAuthorizedQueryVariables = {};


export type AmIAuthorizedQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'AmIAuthorized'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<{ __typename?: 'User' }
    & UserFragmentFragment
  > }
);

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  name
  avatar
  id
  email
  admin
  firstName
  lastName
  accessToken
  refreshToken
  themeMode
}
    `;
export const FilesDocument = gql`
    query Files {
  files {
    name
    link
  }
}
    `;
export type FilesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FilesQuery, FilesQueryVariables>, 'query'>;

    export const FilesComponent = (props: FilesComponentProps) => (
      <ApolloReactComponents.Query<FilesQuery, FilesQueryVariables> query={FilesDocument} {...props} />
    );
    
export type FilesProps<TChildProps = {}> = ApolloReactHoc.DataProps<FilesQuery, FilesQueryVariables> & TChildProps;
export function withFiles<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FilesQuery,
  FilesQueryVariables,
  FilesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, FilesQuery, FilesQueryVariables, FilesProps<TChildProps>>(FilesDocument, {
      alias: 'files',
      ...operationOptions
    });
};

    export function useFilesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FilesQuery, FilesQueryVariables>) {
      return ApolloReactHooks.useQuery<FilesQuery, FilesQueryVariables>(FilesDocument, baseOptions);
    }
      export function useFilesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FilesQuery, FilesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<FilesQuery, FilesQueryVariables>(FilesDocument, baseOptions);
      }
      
export type FilesQueryHookResult = ReturnType<typeof useFilesQuery>;
export type FilesQueryResult = ApolloReactCommon.QueryResult<FilesQuery, FilesQueryVariables>;
export const FileUploadDocument = gql`
    mutation FileUpload($upload: Upload!) {
  fileUpload(file: $upload)
}
    `;
export type FileUploadMutationFn = ApolloReactCommon.MutationFunction<FileUploadMutation, FileUploadMutationVariables>;
export type FileUploadComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<FileUploadMutation, FileUploadMutationVariables>, 'mutation'>;

    export const FileUploadComponent = (props: FileUploadComponentProps) => (
      <ApolloReactComponents.Mutation<FileUploadMutation, FileUploadMutationVariables> mutation={FileUploadDocument} {...props} />
    );
    
export type FileUploadProps<TChildProps = {}> = ApolloReactHoc.MutateProps<FileUploadMutation, FileUploadMutationVariables> & TChildProps;
export function withFileUpload<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FileUploadMutation,
  FileUploadMutationVariables,
  FileUploadProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, FileUploadMutation, FileUploadMutationVariables, FileUploadProps<TChildProps>>(FileUploadDocument, {
      alias: 'fileUpload',
      ...operationOptions
    });
};

    export function useFileUploadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FileUploadMutation, FileUploadMutationVariables>) {
      return ApolloReactHooks.useMutation<FileUploadMutation, FileUploadMutationVariables>(FileUploadDocument, baseOptions);
    }
export type FileUploadMutationHookResult = ReturnType<typeof useFileUploadMutation>;
export type FileUploadMutationResult = ApolloReactCommon.MutationResult<FileUploadMutation>;
export type FileUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<FileUploadMutation, FileUploadMutationVariables>;
export const ChangeThemeMutationDocument = gql`
    mutation ChangeThemeMutation($themeMode: String!) {
  changeTheme(themeMode: $themeMode)
}
    `;
export type ChangeThemeMutationMutationFn = ApolloReactCommon.MutationFunction<ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables>;
export type ChangeThemeMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables>, 'mutation'>;

    export const ChangeThemeMutationComponent = (props: ChangeThemeMutationComponentProps) => (
      <ApolloReactComponents.Mutation<ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables> mutation={ChangeThemeMutationDocument} {...props} />
    );
    
export type ChangeThemeMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables> & TChildProps;
export function withChangeThemeMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ChangeThemeMutationMutation,
  ChangeThemeMutationMutationVariables,
  ChangeThemeMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables, ChangeThemeMutationProps<TChildProps>>(ChangeThemeMutationDocument, {
      alias: 'changeThemeMutation',
      ...operationOptions
    });
};

    export function useChangeThemeMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables>) {
      return ApolloReactHooks.useMutation<ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables>(ChangeThemeMutationDocument, baseOptions);
    }
export type ChangeThemeMutationMutationHookResult = ReturnType<typeof useChangeThemeMutationMutation>;
export type ChangeThemeMutationMutationResult = ApolloReactCommon.MutationResult<ChangeThemeMutationMutation>;
export type ChangeThemeMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(loginData: {email: $email, password: $password}) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables> & TChildProps;
export function withLogin<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

    export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
      return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
    }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutMutationDocument = gql`
    mutation LogoutMutation {
  logout
}
    `;
export type LogoutMutationMutationFn = ApolloReactCommon.MutationFunction<LogoutMutationMutation, LogoutMutationMutationVariables>;
export type LogoutMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutationMutation, LogoutMutationMutationVariables>, 'mutation'>;

    export const LogoutMutationComponent = (props: LogoutMutationComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutationMutation, LogoutMutationMutationVariables> mutation={LogoutMutationDocument} {...props} />
    );
    
export type LogoutMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LogoutMutationMutation, LogoutMutationMutationVariables> & TChildProps;
export function withLogoutMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LogoutMutationMutation,
  LogoutMutationMutationVariables,
  LogoutMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LogoutMutationMutation, LogoutMutationMutationVariables, LogoutMutationProps<TChildProps>>(LogoutMutationDocument, {
      alias: 'logoutMutation',
      ...operationOptions
    });
};

    export function useLogoutMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutationMutation, LogoutMutationMutationVariables>) {
      return ApolloReactHooks.useMutation<LogoutMutationMutation, LogoutMutationMutationVariables>(LogoutMutationDocument, baseOptions);
    }
export type LogoutMutationMutationHookResult = ReturnType<typeof useLogoutMutationMutation>;
export type LogoutMutationMutationResult = ApolloReactCommon.MutationResult<LogoutMutationMutation>;
export type LogoutMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutationMutation, LogoutMutationMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $firstName: String, $lastName: String) {
  register(userData: {email: $email, password: $password, firstname: $firstName, lastname: $lastName}) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    
export type RegisterProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RegisterMutation, RegisterMutationVariables> & TChildProps;
export function withRegister<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterMutation,
  RegisterMutationVariables,
  RegisterProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps>>(RegisterDocument, {
      alias: 'register',
      ...operationOptions
    });
};

    export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
      return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
    }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($email: String!, $lastName: String!, $firstName: String!) {
  updateUser(userInput: {email: $email, firstName: $firstName, lastName: $lastName})
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export type UpdateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserMutation, UpdateUserMutationVariables>, 'mutation'>;

    export const UpdateUserComponent = (props: UpdateUserComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserMutation, UpdateUserMutationVariables> mutation={UpdateUserDocument} {...props} />
    );
    
export type UpdateUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateUserMutation, UpdateUserMutationVariables> & TChildProps;
export function withUpdateUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UpdateUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserMutation, UpdateUserMutationVariables, UpdateUserProps<TChildProps>>(UpdateUserDocument, {
      alias: 'updateUser',
      ...operationOptions
    });
};

    export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
    }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const AmIAuthorizedDocument = gql`
    query amIAuthorized {
  AmIAuthorized
}
    `;
export type AmIAuthorizedComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AmIAuthorizedQuery, AmIAuthorizedQueryVariables>, 'query'>;

    export const AmIAuthorizedComponent = (props: AmIAuthorizedComponentProps) => (
      <ApolloReactComponents.Query<AmIAuthorizedQuery, AmIAuthorizedQueryVariables> query={AmIAuthorizedDocument} {...props} />
    );
    
export type AmIAuthorizedProps<TChildProps = {}> = ApolloReactHoc.DataProps<AmIAuthorizedQuery, AmIAuthorizedQueryVariables> & TChildProps;
export function withAmIAuthorized<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AmIAuthorizedQuery,
  AmIAuthorizedQueryVariables,
  AmIAuthorizedProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, AmIAuthorizedQuery, AmIAuthorizedQueryVariables, AmIAuthorizedProps<TChildProps>>(AmIAuthorizedDocument, {
      alias: 'amIAuthorized',
      ...operationOptions
    });
};

    export function useAmIAuthorizedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AmIAuthorizedQuery, AmIAuthorizedQueryVariables>) {
      return ApolloReactHooks.useQuery<AmIAuthorizedQuery, AmIAuthorizedQueryVariables>(AmIAuthorizedDocument, baseOptions);
    }
      export function useAmIAuthorizedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AmIAuthorizedQuery, AmIAuthorizedQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<AmIAuthorizedQuery, AmIAuthorizedQueryVariables>(AmIAuthorizedDocument, baseOptions);
      }
      
export type AmIAuthorizedQueryHookResult = ReturnType<typeof useAmIAuthorizedQuery>;
export type AmIAuthorizedQueryResult = ApolloReactCommon.QueryResult<AmIAuthorizedQuery, AmIAuthorizedQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<MeQuery, MeQueryVariables> & TChildProps;
export function withMe<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};

    export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
      return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
    }
      export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
      
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;