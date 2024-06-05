import {
  deleteUserQuery,
  loginQuery,
  signupQuery,
} from "../graphql/mutations/user.mutations";
import { createAxios } from "../lib/axios";

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const res = await createAxios().post("http://localhost:3001/graphql", {
      query: loginQuery,
      variables: {
        username: username,
        password: password,
      },
    });
    return res;
  } catch (error) {
    console.error("Error occurred during login:", error);
    throw error;
  }
}

export async function signup({
  fullName,
  username,
  password,
  gender,
  email,
  role,
}: {
  fullName: string;
  username: string;
  password: string;
  gender: string;
  email: string;
  role: string;
}) {
  try {
    const res = await createAxios().post("http://localhost:3001/graphql", {
      query: signupQuery,
      variables: {
        input: {
          username: username,
          password: password,
          fullName: fullName,
          gender: gender,
          email: email,
          role: role,
        },
      },
    });
    return res;
  } catch (error) {
    console.error("Error occurred during sign up:", error);
    throw error;
  }
}

export async function deleteUser({ id }: { id: string }) {
  try {
    const res = await createAxios().post("http://localhost:3001/graphql", {
      query: deleteUserQuery,
      variables: {
        deleteUserId: id,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error occurred during user deletion:", error);
    throw error;
  }
}
