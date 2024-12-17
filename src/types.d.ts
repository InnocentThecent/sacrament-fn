import { COUNTRIES } from "./constants/countries";

type DefaultProps = {
  customClass?: string;
};

const customClassDefaultProps = {
  customClass: "",
} as DefaultProps;

export interface Login {
  username: string;
  password: string;
}

export interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export type fields = {
  [key: string]: string | number;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  telephone?: string;
  password: string;
  profilePicture;
  username?: string;
  gender: string;
  profilePicture?: string;
  role: "CHRISTIAN" | "CLERGY" | "HIGH_PRIEST";
  createdAt: Date;
  christian: ?Christian;
};

export type Offering = {
  id: number;
  amount: number;
  year: number;
  christian: Christian;
  status: string;
  christianId: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface ChristianSacraments {
  id: number;
  christian: Christian;
  christianId: number;
  sacrament: Sacrament;
  sacramentId: number;
  dateReceived: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Christian {
  id: number;
  user: User;
  christianSacraments: Sacrament[];
  userId: number;
  fatherName: string;
  motherName: string;
  dob: Date;
  uniqueCode: string;
  godParent: string;
  baptismDate: Date;
  homeAddress: string;
  euchristDate: Date;
  offerings: Offering[];
  confirmationDate: Date;
  marriageDate: Date;
  province: string;
  district: string;
  sacramentApplication: Application[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: number;
  type: string;
  status: string;
  burialDate: Date;
  christian: Christian;
  massRequester: Christian;
  relationship?: string;
  sacramentAmount?: number;
  burialDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  christian: User;
}

export interface Sacrament {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SelectMenuOption = (typeof COUNTRIES)[number];
