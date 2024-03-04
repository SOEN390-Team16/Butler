
beforeEach(()=> {
  cy.visit('http://localhost:5173/')
  cy.wait(4000)
})

describe("VisitHomepage", ()=> {
  it("should be able to see the homepage", () => {
    cy.contains("div","Sign in to Butler.")
  })
})

describe("NavigateToGoogleSignIn", () => {
  it("should Navigate to a google sign in page when 'Sign in With Google' is clicked", () => {
    cy.contains("button", "Sign in With Google").click()
    cy.wait(4000)
    cy.location("pathname").should('eq', "/googleSignin")
  })
})

describe("NewUserSignIn-Email", () => {
  it("Should let new sign up with a username, name, email, and password", () => {
    cy.get(".login__content").contains("a","New user, sign up!").click()
    cy.wait(4000)
    cy.location("pathname").should('eq',"/SignUp")
    cy.get(".email__signUp").contains("a","Sign up with email").click()
    cy.wait(4000)
    cy.location("pathname").should('eq',"/SignUp/userSignUp")
    cy.get("input[name='username']").type("CypressTestUsername").should("have.value",
        "CypressTestUsername")
    cy.get("input[name='name']").type("CypressTestName").should("have.value",
        "CypressTestName")
    cy.get("input[name='email']").type("CypressTest@email.com").should("have.value",
        "CypressTest@email.com")
    cy.get("input[name='password']").type("CypressTestPassword").should("have.value",
        "CypressTestPassword")
    cy.get(".continue__button").click()
    cy.wait(4000)
    cy.location("pathname").should('eq', "/")
  })
})

describe("PublicUserSignIn", () => {
  it("Should sign in when the public user enters their email and password", () =>{
    cy.get("input[name='email']").type("CypressTest@email.com").should("have.value",
        "CypressTest@email.com")
    cy.get("input[name='password']").type("CypressTestPassword").should("have.value",
        "CypressTestPassword")
    cy.get(".continue__button").click()
    cy.wait(4000)
    cy.location("pathname").should('eq', "/DashboardHome")
  })
})





