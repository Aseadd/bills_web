import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api, config, setConfig } from "../../utils/api";
import { stat } from "fs";

export class User {
    username: string = "";
    email: string = "";
    password: string = "";

}

interface ResStatus {
    status: number;
    msg: string;
  }

  export class Authorizations {
    canRead: boolean = false;
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;
    onlySelf: boolean = false;
  }

  interface State {
    users: User[];
    user: User;
    authorizations: Authorizations;
    xCsrfToken: string;
    loading: boolean;
    authenticated: boolean;
    status: string;
    error: string;
  }

const initialState: State = {
        users: [],
        user: new User(),
        authorizations: new Authorizations(),
        xCsrfToken: "",
        loading: false,
        authenticated: false,
        status: "",
        error: "",
    };

const UsersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUsers: (
          state: State,
          action: PayloadAction<User[]>
        ) => {
            state.users = action.payload;
        },
        addUsers: (
            state: State,
            action: PayloadAction<User>
            ) => {
                state.users.push(action.payload);
            },
        setUser: (state: State, action: PayloadAction<User>) => {
            state.user = action.payload;
            },
        setXCsrfToken: (state: State, action: PayloadAction<string>) => {
            state.xCsrfToken = action.payload;
        },
        setAuthorizations: (
            state: State,action: PayloadAction<Authorizations>
        ) => {
            state.authorizations = action.payload;
        },
        setLoading: (state: State, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setAuthenticated: (state: State, action: PayloadAction<boolean>) => {
            state.authenticated = action.payload;
        },
        setStatus: (state: State, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
        setError: (state: State, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    authenticate: (state: State, action: PayloadAction<User>): any => {
            const user = action.payload;
            state.user = user;
            state.authenticated = true;
          },
    },
});

export const { getUsers, addUsers, setAuthorizations, setAuthenticated, setXCsrfToken, setUser, setStatus, setError} = UsersSlice.actions;
export default UsersSlice.reducer;


export const Signup = (user: User) => async (dispatch: any) => {
    
    try {
        const response = await api.post("/signup", user, config);

        dispatch(setStatus(response.data.msg));
        dispatch(setError(""));
    } catch (error: any) {
        dispatch(setError(error.response?.data?.msg || "An error occurred"));
        dispatch(setStatus(""));
    }
}

export const CreateUser = (user: User) => async (dispatch: any) => {
    try {
        const response = await api.post("/users", user);
        dispatch(setStatus(response.data.msg));
        dispatch(setError(""));
    } catch (error: any) {
        dispatch(setError(error.response?.data?.msg || "An error occurred"));
        dispatch(setStatus(""));
    }
}

export const LoginUser = (user: User) => async (dispatch: any) => {
    try {
        const response = await api.post("/api-auth/login/", user);
        dispatch(setStatus(response.data.msg));
        dispatch(setError(""));
        dispatch(setAuthenticated(true));
        dispatch(setUser(response.data.user));
        dispatch(setXCsrfToken(response.data.csrfToken));
        setConfig(response.data.token, response.data.csrfToken);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("x-csrf-token", response.data.csrfToken);
    } catch (error: any) {
        dispatch(setError(error.response?.data?.msg || "An error occurred"));
        dispatch(setStatus(""));
    }
}


