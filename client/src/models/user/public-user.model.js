export class PublicUser {
  userid
  first_name
  last_name
  email
  role
  profile_picture

  constructor(builder) {
    this.userid = builder.userid
    this.first_name = builder.first_name
    this.last_name = builder.last_name
    this.email = builder.email
    this.role = builder.role
    this.profile_picture = builder.profile_picture
  }

  static copy(publicUser) {
    return PublicUser.newBuilder()
      .withUserId(publicUser.userid)
      .withFirstName(publicUser.first_name)
      .withLastName(publicUser.last_name)
      .withEmail(publicUser.email)
      .withRole(publicUser.role)
      .withProfilePicture(publicUser.profile_picture)
  }

  static newBuilder() {
    return new Builder()
  }

  static fromJson(json) {
    return new Builder()
      .withUserId(json.userid)
      .withFirstName(json.first_name)
      .withLastName(json.last_name)
      .withEmail(json.email)
      .withRole(json.role)
      .withProfilePicture(json.profile_picture)
      .build();
  }

  static toJson(publicUser) {
    return {
      userid: publicUser.userid,
      first_name: publicUser.first_name,
      last_name: publicUser.last_name,
      email: publicUser.email,
      role: publicUser.role,
      profile_picture: publicUser.profile_picture
    }
  }

}

class Builder {

  withUserId(userid) {
    this.userid = userid
    return this
  }

  withFirstName(first_name) {
    this.first_name = first_name
    return this
  }

  withLastName(last_name) {
    this.last_name = last_name
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

  withProfilePicture(profile_picture) {
    this.profile_picture = profile_picture
    return this
  }

  build() {
    return new PublicUser(this)
  }
}