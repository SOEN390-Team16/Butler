export function loginPublicUser(){
    cy.get("input[name='email']").type("CypressTest@email.com").should("have.value",
        "CypressTest@email.com")
    cy.get("input[name='password']").type("CypressTestPassword").should("have.value",
        "CypressTestPassword")
    cy.get(".continue__button").click()
    cy.location("pathname").should('include', "/DashboardHome/editUser")
}

export function viewProfilePublicUser() {
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
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Edit profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUser")
}

export function loginCompany() {
    cy.get("input[name='email']").type("CypressCompany@email.com")
        .should("have.value", "CypressCompany@email.com")
    cy.get("input[name='password']").type("CypressCompanyPassword")
        .should("have.value","CypressCompanyPassword")
    cy.get(".continue__button").click()
    cy.location("pathname").should('eq', "/DashboardHomeCMC")
}

export function viewProfileCompany() {
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Edit profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUserCMC")
}

export function resetProfileCompany() {
    cy.get("#root").get(".row").contains("button","Update Info").click()
    cy.get("#root").get(".container").get("form")
        .get("input[name='name']").clear()
        .type("CypressCompanyName").should("have.value", "CypressCompanyName")
        .get("input[name='email']").clear()
        .type("CypressCompany@email.com").should("have.value", "CypressCompany@email.com")
    cy.get("#root").get(".container").get("form").contains("button","Done").click()
}

export function resetProfileRenter() {
    cy.get("#root").get(".row").contains("button","Update Info").click()
    cy.get("#root").get("form")
        .get("input[name='first_name']").clear()
        .type("CypressRenterF").should("have.value", "CypressRenterF")
        .get("input[name='last_name']").clear()
        .type("CypressRenterL").should("have.value", "CypressRenterL")
        .get("input[name='email']").clear()
        .type("CypressRenter@email.com").should("have.value", "CypressRenter@email.com")
    cy.get("#root").get("form").contains("button","Done").click()

}

export function resetProfilePublicUser() {
    cy.get("#root").get(".row").contains("button","Update Info").click()
    cy.get("#root").get("form")
        .get("input[name='first_name']").clear()
    cy.get("#root").get("form")
        .get("input[name='first_name']").type("CypressFirst").should("have.value", "CypressFirst")
    cy.get("#root").get("form")
        .get("input[name='last_name']").clear()
    cy.get("#root").get("form")
        .get("input[name='last_name']").type("CypressLast").should("have.value", "CypressLast")
    cy.get("#root").get("form")
        .get("input[name='email']").clear()
    cy.get("#root").get("form")
        .get("input[name='email']").type("CypressTest@email.com").should("have.value", "CypressTest@email.com")
    cy.get("#root").get("form").contains("button","Update Info").click()

}
