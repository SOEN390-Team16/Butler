export function loginPublicUser(){
    cy.get("input[name='email']").type("CypressTest@email.com").should("have.value",
        "CypressTest@email.com")
    cy.get("input[name='password']").type("CypressTestPassword").should("have.value",
        "CypressTestPassword")
    cy.contains("button", "Sign In").click()
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
    cy.contains("button", "Sign In").click()
    cy.location("pathname").should('include', "/DashBoardHome")
}

export function viewProfileRenter() {
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Edit profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUser")
}

export function loginOwner() {
    cy.get("input[name='email']").type("CypressOwner@email.com")
        .should("have.value", "CypressOwner@email.com")
    cy.get("input[name='password']").type("CypressOwnerPassword")
        .should("have.value","CypressOwnerPassword")
    cy.contains("button", "Sign In").click()
    cy.location("pathname").should('include', "/DashBoardHomeCO")
}

export function loginCompany() {
    cy.get("input[name='email']").type("CypressCompany@email.com")
        .should("have.value", "CypressCompany@email.com")
    cy.get("input[name='password']").type("CypressCompanyPassword")
        .should("have.value","CypressCompanyPassword")
    cy.contains("button", "Sign In").click()
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

export function createEmployee(firstName) {
    cy.get("#root").contains("a","Add Employee").click()
    cy.get("#root").contains("form").get("input[name='first_name']").type(firstName)
        .should("have.value", firstName)
        .get("input[name='last_name']").type("CypressEmployeeL")
        .should("have.value", "CypressEmployeeL")
        .get("select[name='property_id']").select("CypressPropertyName")
        .get("input[name='role']").should("have.value", "employee")
    cy.get('.fixed > .bg-white').contains("a", "Add Employee").click()
    cy.wait(1000)
}

export function deleteEmployee(firstName) {
    cy.reload()
    cy.get(':nth-child(2) > .rounded-lg > .w-full').last().within(() => {
        cy.get("td").contains(firstName).parent().within(() => {
            cy.get('td a').contains("Delete").click()
        })
    })
    cy.wait(500)
    cy.get(".fixed > .bg-white").contains("a","Confirm").click()
    cy.wait(1000)
}
