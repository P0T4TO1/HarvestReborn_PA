export interface IOrganization {
  id?: string;

  user_id?: string;
  user_email: string;
  user_password: string;

  org_name: string;
  org_cluni: string;
  org_acro: string;
  org_rfc: string;
  org_tel: string;
  org_direction?: string;
  org_description?: string;
}
