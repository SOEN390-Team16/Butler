import { PublicUser } from "./public-user.model.js";

export class CondoManagementCompany {
  companyid
  company_name
  email
  role

  constructor(builder) {
    this.companyid = builder.companyid
    this.company_name = builder.company_name
    this.email = builder.email
    this.role = builder.role
  }

  static copy(condoManagementCompany) {
    return new CondoManagementCompany.newBuilder()
      .withCompanyId(condoManagementCompany.companyid)
      .withCompanyName(condoManagementCompany.company_name)
      .withEmail(condoManagementCompany.email)
      .withRole(condoManagementCompany.role)
  }

  static newBuilder() {
    return new Builder()
  }

  static fromJson(json) {
    return new Builder()
      .withCompanyId(json.companyid)
      .withCompanyName(json.company_name)
      .withEmail(json.email)
      .withRole(json.role)
  }

  static toJson(condoManagementCompany) {
    return {
      companyid: condoManagementCompany.companyid,
      company_name: condoManagementCompany.company_name,
      email: condoManagementCompany.email,
      role: condoManagementCompany.role
    }
  }
}

class Builder {

  withCompanyId(companyid) {
    this.companyid = companyid
    return this
  }

  withCompanyName(company_name) {
    this.company_name = company_name
    return this
  }

  withEmail(email) {
    this.email = email
    return this
  }

  withRole(role) {
    this.role = role
    return this
  }

  build() {
    return new PublicUser(this)
  }
}