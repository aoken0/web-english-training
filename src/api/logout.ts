import { auth } from "../../firebase";

export const logout = async () => {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    throw error;
  }
};
