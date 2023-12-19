import { userRole } from "@/constants/userRole";

export type UserInfo = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: userRole
  }
  