

beforeEach(()=> {
  cy.visit('http://localhost:5173/')
})

describe("VisitHomepage", ()=> {
  it("should be able to see the homepage", () => {
    cy.contains("div","Sign in to Butler.")
  })
})

describe("NavigateToGoogleSignIn", () => {
  it("should Navigate to a google sign in page when 'Sign in With Google' is clicked", () => {
    cy.contains("button", "Sign in With Google").click()
    cy.location("pathname").should('eq', "/googleSignin")
  })
})

describe("PublicUserSignIn", () => {
  it("Should sign in when the public user enters their email and password", () =>{
    cy.get("input[name='email'").type("CypressTest@email.com").should("have.value",
        "CypressTest@email.com")
    cy.get("input[name='password").type("CypressTestPassword").should("have.value",
        "CypressTestPassword")
    cy.get(".continue__button").click()
    cy.location("pathname").should('eq', "/DashboardHome")
  })
})



