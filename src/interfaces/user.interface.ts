export interface IUser {
  id: string;
  role_id: number;
  user_email: string;
  user_password: string;
  userStatus_id: number;

  business?: {
    business_id: number;

    user_id?: string;
    user_email: string;
    user_password: string;

    businessOwnerName: string;
    businessOwnerSurname: string;
    business_name: string;
    business_tel: string;
    business_direction?: string;
    business_description?: string;

    inventory_id?: number;
  };
  organization?: {
    id?: string;

    user_id?: string;
    user_email: string;
    user_password: string;

    organization_name: string;
    organization_cluni: string;
    organization_acronym: string;
    organization_rfc: string;
    organization_tel: string;
    organization_direction?: string;
    organization_description?: string;
  };
}
