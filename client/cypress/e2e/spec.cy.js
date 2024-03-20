import {loginPublicUser, loginRenter, viewProfilePublicUser, viewProfileRenter} from '../support/cypress-utils.js'

let baseURL = 'http://localhost:5173/'

beforeEach(()=> {
  cy.visit(baseURL)
})

describe("E2E Test for Use Case 1: Public User Sign Up With Email", () => {
  it("Should let new user sign up with a username, name, email, and password", () => {
    // Test
    cy.get(".login__content").contains("a","New user, sign up!").click()
    cy.location("pathname").should('eq',"/SignUp")
    cy.get(".signup__main__page").contains("a","Sign up with email").click()
    cy.location("pathname").should('eq',"/SignUp/userSignUp")
    cy.get("input[name='first_name']").type("CypressTestFirstName").should("have.value",
        "CypressTestFirstName")
    cy.get("input[name='last_name']").type("CypressTestLastName").should("have.value",
        "CypressTestLastName")
    cy.get("input[name='email']").type("CypressTest@email.com").should("have.value",
        "CypressTest@email.com")
    cy.get("input[name='password']").type("CypressTestPassword").should("have.value",
        "CypressTestPassword")
    cy.get(".continue__button").click()
    cy.location("pathname").should('include', "/DashboardHome")
  })
})

describe("E2E Test for Use Case 46: Public User Email Login", () => {
  it("Should sign in when the public user enters their email and password", () =>{
    // Test
    cy.get("input[name='email']").type("CypressTest@email.com").should("have.value",
        "CypressTest@email.com")
    cy.get("input[name='password']").type("CypressTestPassword").should("have.value",
        "CypressTestPassword")
    cy.get(".continue__button").click()
    cy.location("pathname").should('include', "/DashboardHome")
  })
})

describe("E2E Test for Use Case 2: Public User Profile Creation", () => {
  it("Should let public users see their profile", () => {
    // Preconditions
    loginPublicUser()

    // Test
    cy.visit(baseURL + "DashboardHome")
    cy.get(".dashboard__home").get(".patty__button").click()
    cy.get(".dashboard__home").get(".sidedrawer__open").get(".drawer__buttons")
        .get(".edit__profile").contains("button", "Edit Profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUser")
  })
})

describe("E2E Test for Use Case 3: Public User Update Profile", () => {
  it("Should let public users update their profile", () => {
    // Preconditions
    loginPublicUser()
    viewProfilePublicUser(baseURL)

    // Test
    cy.get("#root").get(".row").contains("button","Update Info").click()
    cy.get("#root").get(".container").get("form")
        .get("input[name='firstName']")
        .type("CypressUpdateFirst").should("have.value", "CypressUpdateFirst")
        .get("input[name='lastName']")
        .type("CypressUpdateLast").should("have.value", "CypressUpdateLast")
        .get("input[name='email']")
        .type("CypressUpdate@email.com").should("have.value", "CypressUpdate@email.com")
    cy.get("#root").get(".container").get("form").contains("button","Done").click()
  })
})

describe("E2E Test for Use Case 5: Condo Owner/Rental User Email Login", () => {
  it("Should allow Condo Owner/ Rental Users to log in via email and password", () => {
    // Test
    cy.get("input[name='email']").type("CypressRenter@email.com")
        .should("have.value", "CypressRenter@email.com")
    cy.get("input[name='password']").type("CypressRenterPassword")
        .should("have.value","CypressRenterPassword")
    cy.get(".continue__button").click()
    cy.location("pathname").should('include', "/DashBoardHome")
  })
})

describe("E2E Test for Use Case 6: Create Owner/Rental User Profile", () => {
  it("Should let owners/renters view their profile", () => {
    // Preconditions
    loginRenter()

    // Test
    cy.get(".dashboard__home").get(".patty__button").click()
    cy.get(".dashboard__home").get(".sidedrawer__open").get(".drawer__buttons")
        .get(".edit__profile").contains("button", "Edit Profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUser")
  })
})

describe("E2E Test for Use Case 7: Update Condo Owner/Rental User Profile", () => {
  it("Should let owners/renters update their profile", () => {
    // Preconditions
    loginRenter()
    viewProfileRenter()

    // Test
    cy.get("#root").get(".row").contains("button","Update Info").click()
    cy.get("#root").get(".container").get("form")
        .get("input[name='firstName']")
        .type("CypressUpdateRenterF").should("have.value", "CypressUpdateRenterF")
        .get("input[name='lastName']")
        .type("CypressUpdateRenterL").should("have.value", "CypressUpdateRenterL")
        .get("input[name='email']")
        .type("CypressRenterUpdate@email.com").should("have.value", "CypressRenterUpdate@email.com")
    cy.get("#root").get(".container").get("form").contains("button","Done").click()

  })
})









