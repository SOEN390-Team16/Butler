
export function loginPublicUser(){
    cy.get("input[name='email']").type("CypressTest@email.com").should("have.value",
        "CypressTest@email.com")
    cy.get("input[name='password']").type("CypressTestPassword").should("have.value",
        "CypressTestPassword")
    cy.get(".continue__button").click()
    cy.location("pathname").should('include', "/DashBoardHome")
}

export function viewProfilePublicUser(baseURL) {
    cy.visit(baseURL + "DashboardHome")
    cy.get(".dashboard__home").get(".patty__button").click()
    cy.get(".dashboard__home").get(".sidedrawer__open").get(".drawer__buttons")
        .get(".edit__profile").contains("button", "Edit Profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUser")
}

export function loginRenter() {
    cy.get("input[name='email']").type("CypressRenter@email.com")
        .should("have.value", "CypressRenter@email.com")
    cy.get("input[name='password']").type("CypressRenterPassword")
        .should("have.value","CypressRenterPassword")
    cy.get(".continue__button").click()
    cy.location("pathname").should('include', "/DashBoardHome")
}

export function viewProfileRenter() {
    cy.get(".dashboard__home").get(".patty__button").click()
    cy.get(".dashboard__home").get(".sidedrawer__open").get(".drawer__buttons")
        .get(".edit__profile").contains("button", "Edit Profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUser")
}
