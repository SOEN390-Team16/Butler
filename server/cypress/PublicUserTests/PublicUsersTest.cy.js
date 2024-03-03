/***  GET ALL PUBLIC USER ***/
describe("Testing getPublicUsers endpoint", () => {
  let token;
  beforeEach(() => {
    cy.request("POST", "http://localhost:3000/api/v1/login", {
      email: "Duguay9@gmail.com",
      password: "password",
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token;
    });
  });

  it("should return status 200 and non-empty list of public users if data exists", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/api/v1/pu/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array").that.is.not.empty;
    });
  });

  // it("should return status 404 if no public users found", () => {
  //   cy.intercept("GET", "http://localhost:3000/api/v1/pu/", {
  //     statusCode: 404,
  //     body: { error: "Public Users not found" },
  //   }).as("getPublicUsersEmpty");

  //   cy.request({
  //     method: "GET",
  //     url: "http://localhost:3000/api/v1/pu/",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     failOnStatusCode: false,
  //   }).then((response) => {
  //     expect(response.status).to.eq(404);
  //     expect(response.body.error).to.eq("Public Users not found");
  //   });
  // });

  // it("should return status 500 if there is an internal server error", () => {
  //   cy.intercept(
  //     {
  //       method: "GET",
  //       url: "http://localhost:3000/api/v1/pu/",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //     {
  //       statusCode: 500,
  //       body: { error: "Internal Server Error" },
  //     }
  //   ).as("getPublicUsersError");

  //   cy.request({
  //     method: "GET",
  //     url: "http://localhost:3000/api/v1/pu/",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     failOnStatusCode: false,
  //   }).then((response) => {
  //     console.log(response);
  //     expect(response.status).to.eq(500);
  //     expect(response.body.error).to.eq("Internal Server Error");
  //   });
  // });
});

/***  GET A PUBLIC USER BY ID  ***/
describe("Testing getPublicUserByID endpoint", () => {
  let token;
  beforeEach(() => {
    cy.request("POST", "http://localhost:3000/api/v1/login", {
      email: "Duguay9@gmail.com",
      password: "password",
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token;
    });
  });

  it("returns the specific Public User when valid ID is provided", () => {
    // cy.intercept("GET", "http://localhost:3000/api/v1/pu/:userid", (req) => {
    //   const userid = parseInt(req.params.userid);
    //   if (userid === 123) {
    //     req.reply({
    //       statusCode: 200,
    //       body: [{ userid: 123, name: "Test" }],
    //     });
    //   } else {
    //     req.reply({
    //       statusCode: 404,
    //       body: { error: "Public User not found" },
    //     });
    //   }
    // }).as("getPublicUser");

    // Making the request to getPublicUserById with the id provided in the intercept

    cy.request({
      method: "GET",
      url: "http://localhost:3000/api/v1/pu/19",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal([
        {
          email: "test@gmail.com2",
          first_name: "publicUserTest",
          last_name: "test",
          password: "fish",
          profile_picture: "a7a",
          role: "renter",
        },
      ]);
    });

    // Waiting for the intercept to be called
    // cy.wait("@getPublicUser").its("response.statusCode").should("eq", 200);
  });
});

/***  ADDING A PUBLIC USER ***/
describe("Testing addPublicUser endpoint", () => {
  let token;
  beforeEach(() => {
    cy.request("POST", "http://localhost:3000/api/v1/login", {
      email: "Duguay9@gmail.com",
      password: "password",
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token;
    });
  });

  it("adds a new Public User when provided with valid data", () => {
    // Making the request  with valid data
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/v1/pu/",
      body: {
        email: Math.random().toString(16).slice(-5) + "gmail.com",
        first_name: Math.random().toString(16).slice(-5),
        last_name: Math.random().toString(16).slice(-5),
        password: "password",
        profile_picture: "Not a valid picture",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.eq("Public User Created Successfully!");
    });
  });

  it("returns error when attempting to add Public User with existing email", () => {
    // Making the request with an existing email
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/v1/pu/",
      body: {
        email: "newuser@email.com", // existing email
        first_name: "Dja",
        last_name: "Dja",
        password: "password",
        profile_picture: "wtv",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.eq("Email Already Exists");
    });
  });
});

/***  REMOVING A PUBLIC USER ***/
describe("Testing removePublicUser endpoint", () => {
  let token;
  beforeEach(() => {
    cy.request("POST", "http://localhost:3000/api/v1/login", {
      email: "Duguay9@gmail.com",
      password: "password",
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token;
    });
  });

  // it('removes an existing Public User when provided with a valid user ID', () => {
  //   // Making the request to removePublicUser with a valid ID
  //   cy.request({
  //     method: 'DELETE',
  //     url: 'http://localhost:3000/api/v1/pu/65',
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body).to.eq('User removed successfully.');
  //   });
  // });

  it("returns error when attempting to remove non-existing Public User", () => {
    // Making the request to removePublicUser with a non-existing ID
    cy.request({
      method: "DELETE",
      url: "http://localhost:3000/api/v1/pu/999",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false, // prevent cypress from failing on 404 status
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.deep.equal({ error: "User not found" });
    });
  });
});
