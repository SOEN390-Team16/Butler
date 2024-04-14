import {
  createEmployee, deleteEmployee,
  loginCompany, loginOwner,
  loginPublicUser,
  loginRenter, resetProfileCompany, resetProfilePublicUser, resetProfileRenter, viewProfileCompany,
  viewProfilePublicUser,
  viewProfileRenter
} from '../support/cypress-utils.js'

let baseURL = 'http://localhost:5173/'

beforeEach(()=> {
  cy.visit(baseURL)
})

describe("E2E Test for Use Case 1: Public User Sign Up With Email", () => {
  it("Should let new user sign up with a username, name, email, and password", () => {
    // Test
    cy.get("#root").get(".login__content").contains("a","New user, sign up!").click()
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
    cy.location("pathname").should('include', "/")
    cy.wait(1000)
    loginPublicUser()
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
    cy.location("pathname").should('include', "/DashboardHome/editUser")
  })
})

describe("E2E Test for Use Case 2: Public User Profile Creation", () => {
  it("Should let public users see their profile", () => {
    // Preconditions
    loginPublicUser()

    // Test
    cy.location("pathname").should('eq', "/DashboardHome/editUser")
  })
})

describe("E2E Test for Use Case 3: Public User Update Profile", () => {
  it("Should let public users update their profile", () => {
    // Preconditions
    loginPublicUser()
    viewProfilePublicUser()

    // Test
    cy.get("#root").get(".row").contains("button","Update Info").click()
    cy.get("#root").get("form")
        .get("input[name='first_name']").clear()
    cy.get("#root").get("form")
        .get("input[name='first_name']").type("CypressUpdateFirst").should("have.value", "CypressUpdateFirst")
    cy.get("#root").get("form")
        .get("input[name='last_name']").clear()
    cy.get("#root").get("form")
        .get("input[name='last_name']").type("CypressUpdateLast").should("have.value", "CypressUpdateLast")
    cy.get("#root").get("form")
        .get("input[name='email']").clear()
    cy.get("#root").get("form")
        .get("input[name='email']").type("CypressTest@email.com").should("have.value", "CypressTest@email.com")
    cy.get("#root").get("form").contains("button","Update Info").click()

    // Tear Down
    cy.wait(1500)
    resetProfilePublicUser()
  })
})

describe("E2E Test for Use Case 4: Register Condo Owners/Rental Users", () => {
  it.skip("Should allow public users to enter a registration key provided by condo management companies" +
      "to update their role to owner or renter", () => {
    // Preconditions


    // Test
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
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Edit profile").click()
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
    cy.get("#root").get("form")
        .get("input[name='first_name']").clear()
        .type("CypressUpdateRenterF").should("have.value", "CypressUpdateRenterF")
        .get("input[name='last_name']").clear()
        .type("CypressUpdateRenterL").should("have.value", "CypressUpdateRenterL")
        .get("input[name='email']").clear()
        .type("CypressRenter@email.com").should("have.value", "CypressRenter@email.com")
    cy.get("#root").get("form").contains("button","Done").click()

    // Tear Down
    resetProfileRenter()

  })
})

describe("E2E Test for Use Case 8: View The Dashboard Owner/Renter", () => {
  it("Should allow owners/renters to see the dashboard", () => {
    // Preconditions
    loginRenter()

    // Test
    cy.location("pathname").should('include', "/DashBoardHome")
  })
})

describe("E2E Test for Use Case 9: Display General Information Through the Dashboard", () => {
  it("Should allow owners/renters to see general information through the dashboard", () => {
    // Preconditions
    loginRenter()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
  })
})

describe("E2E Test for Use Case 10: Display Condo Information Through the Dashboard to Condo Owners", () => {
  it("Should allow owners to see condo information on their dashboard", () => {
    // Preconditions
    loginOwner()

    // Test
    cy.contains("h2", "My Condo Units")
  })
})

describe("E2E Test for Use Case 11: Display Financial Information Through the Dashboard", () => {
  it("Should allow condo owners to see financial information through the dashboard", () => {
    // Preconditions
    loginOwner()

    // Test
    cy.contains("div","Payment Due")
    cy.contains("div", "Upcoming Payment")
  })
})

describe("E2E Test for Use Case 12: Display Request Status Through The Dashboard", () => {
  it.skip("Should allow owners/renters to view submitted requests", () => {
    // Preconditions


    // Test
  })
})

describe("E2E Test for Use Case 13: Submit Requests Through The Dashboard", () => {
  it.skip("Should allow owners/renters to submit requests", () => {
    // Preconditions


    // Test
  })
})

describe("E2E Test for Use Case 14: View Facility Reservation Availability", () => {
  it.skip("Should allow owners/renters to view facility reservation", () => {
    // Preconditions


    // Test
  })
})

describe("E2E Test for Use Case 15: Reserve Facility", () => {
  it.skip("Should allow owners/renters to reserve facility", () => {
    // Preconditions


    // Test
  })
})

describe("E2E Test for Use Case 16: Create Condo Management Company Login", () => {
  it("should be able to sign up as a condo management company.", () => {
    // Test
    cy.get("#root").get(".login__content").contains("a","New user, sign up!").click()
    cy.location("pathname").should('eq',"/SignUp")
    cy.get(".signup__main__page").contains("a","Sign up with email").click()
    cy.get(".user__signup").contains("p","Company User").click()
    cy.get("input[name='company_name']").type("CypressCompanyName")
        .should("have.value", "CypressCompanyName")
    cy.get("input[name='email']").type("CypressCompany@email.com")
        .should("have.value", "CypressCompany@email.com")
    cy.get("input[name='password']").type("CypressCompanyPassword")
        .should("have.value", "CypressCompanyPassword")
    cy.get("button").click()
    cy.location("pathname").should('eq', '/')
  })
})



describe("E2E Test for Use Case 17: Create Condo Management Company Profile", () => {
  it("Should allow condo management to create a condo management profile", () => {
    // Preconditions
    loginCompany()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Edit profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUserCMC")

  })
})

describe("E2E Test for Use Case 18: Update Condo Management Profile", () => {
  it("Should allow condo management companies to update their profile", () => {
    // Preconditions
    loginCompany()
    viewProfileCompany()

    // Test
    cy.get("#root").get(".row").contains("button","Update Info").click()
    cy.get("#root").get(".container").get("form")
        .get("input[name='name']").clear()
        .type("CypressUpdateCompanyName").should("have.value", "CypressUpdateCompanyName")
        .get("input[name='email']").clear()
        .type("CypressCompany@email.com").should("have.value", "CypressCompany@email.com")
    cy.get("#root").get(".container").get("form").contains("button","Done").click()

    // Tear Down
    resetProfileCompany()
  })
})

describe("E2E Test for Use Case 19: Create Property Profile", () => {
  it("Should allow condo management companies to add new properties", () => {
    // Preconditions
    loginCompany()

    // Test
    cy.get("#root").contains('a', 'Add Property').click()
    cy.get("#root").contains('form').get("input[name='propertyName']")
        .type("CypressPropertyName").should("have.value", "CypressPropertyName")
    cy.get("#root").contains('form').get("input[name='propertyAddress']")
        .type("CypressPropertyAddress").should("have.value", "CypressPropertyAddress")
    cy.get("#root").contains('form').get("input[name='numberOfCondoUnits']")
        .type("50").should("have.value", "50")
    cy.get("#root").contains('form').get("input[name='numberOfParkingUnits']")
        .type("50").should("have.value", "50")
    cy.get("#root").contains('form').get("input[name='numberOfLockers']")
        .type("50").should("have.value", "50")
    cy.get("#root").contains('form').parent().contains('a', 'Add Property').click({ force: true })
  })
})

describe("E2E Test for Use Case 20: Read Property Profile", () => {
  it("Should allow condo management companies to view the properties they've added", () => {
    // Preconditions
    loginCompany()

    // Test
    cy.location("pathname").should('eq', "/DashboardHomeCMC")

  })
})

describe("E2E Test for Use Case 21: Update Property Profile", () => {
  it.skip("Should allow condo management companies to update their property profiles", () => {
    // not implemented
  })
})

describe("E2E Test for Use Case 22: Delete Property Profile", () => {
  it.skip("Should allow condo management companies to delete their property profiles", () => {
    // not implemented
  })
})

describe("E2E Test for Use Case 23: Upload Condo Files to Property", () => {
  it.skip("Should allow condo management companies to upload files related to condo units", () => {
    // Preconditions

    // Test
  })
})


describe("E2E Test for Use Case 24: Enter Detailed Condo Unit Information", () => {
  it("Should allow condo management companies to enter condo unit number, unit size, occupant type, and fees", () => {
    // Preconditions
    loginCompany()

    // Test
    cy.get(':nth-child(1) > .flex-col > :nth-child(2) > .rounded-lg > .w-full > .border > :nth-child(1)').children().click()
    cy.wait(500)
    cy.location("pathname").should("include", "/DashboardHomeCMC/property/")
    cy.get(':nth-child(2) > .flex-col > div.flex-row.items-center > div.flex-row > .gap-4 > .flex').click()
    cy.wait(500)
    cy.get("#condoUnitNumber").select("2").select("1").should("have.value", "1")
    cy.get("#condoUnitSize").type("650").should("have.value", "650")
    cy.get("#condoUnitOccupantType").select("Renter").select("Owner")
        .should("have.value", "Owner")
    cy.get("#condoUnitTotalFees").type("2500").should("have.value", "2500")
    cy.get('.fixed > .bg-white > .flex-row').click()

  })
})

describe("E2E Test for Use Case 25: Send Registration Key", () => {
  it.skip("Should allow condo management companies to send registration keys to public users", () => {
    // Preconditions

    // Test
  })
})

describe("E2E Test for Use Case 26: Revoke Registration Keys", () => {
  it.skip("Should allow condo management companies to revoke registration keys from owners/renters" +
      "turning them back into public users", () => {
    // Preconditions

    // Test
  })
})

describe("E2E Test for Use Case 27: Enter Detailed Parking Spot Information", () => {
  it("Should allow condo management companies to enter parking number, parking fee, parking owner, parking occupant",() => {
    // Preconditions
    loginCompany()

    // Test
    cy.get(':nth-child(1) > .flex-col > :nth-child(2) > .rounded-lg > .w-full > .border > :nth-child(1)').children().click()
    cy.wait(500)
    cy.location("pathname").should("include", "/DashboardHomeCMC/property/")
    cy.get(':nth-child(3) > .flex-col > div.flex-row.items-center > div.flex-row > .gap-4 > .flex').click()
    cy.wait(500)
    cy.get("#parkingUnitNumber").type("1").should("have.value", "1")
    cy.get("#parkingUnitFee").type("100").should("have.value", "100")
    cy.get("#parkingUnitOwner").type("CypressOwnerF")
        .should("have.value", "CypressOwnerF")
    cy.get("#parkingUnitOccupant").type("CypressRenterF").should("have.value", "CypressRenterF")
    cy.get('.fixed > .bg-white > .flex-row').click()
  })
})


describe("E2E Test for Use Case 28: Enter Detailed Locker Information", () => {
  it("Should allow condo management companies to enter locker number, locker fee, locker owner, locker occupant", () => {
    loginCompany()

    // Test
    cy.get(':nth-child(1) > .flex-col > :nth-child(2) > .rounded-lg > .w-full > .border > :nth-child(1)').children().click()
    cy.wait(500)
    cy.location("pathname").should("include", "/DashboardHomeCMC/property/")
    cy.get(':nth-child(4) > .flex-col > div.flex-row.items-center > div.flex-row > .gap-4 > .flex').click()
    cy.wait(500)
    cy.get("#lockerUnitNumber").type("1").should("have.value", "1")
    cy.get("#lockerUnitFee").type("100").should("have.value", "100")
    cy.get("#lockerUnitOwner").type("CypressOwnerF")
        .should("have.value", "CypressOwnerF")
    cy.get("#lockerUnitOccupant").type("CypressRenterF").should("have.value", "CypressRenterF")
    cy.get('.fixed > .bg-white > .flex-row').click()
  })
})

describe("E2E Test for Use Case 29: Enter Condo Fee Per Square Foot, Parking Spot, And Locker", () => {
  it.skip("should allow condo management companies to enter condo fee per square foot, parking spot fee, and locker fee" +
      "for any properties that they own", () => {
    // Preconditions
    // not implemented

    // Test

  })
})

describe("E2E test for Use Case 30: Calculate Total Condo Fees", () => {
  it.skip("Should calculate total condo fees based on cost per square feet, locker fee, and parking fee", () => {
    // Preconditions
    // not implemented
    // Test
  })
})

describe("E2E Test for Use Case 31: Send Total Condo Fees to Condo Owners", () => {
  it("Should allow condo Owners to see all fees related to their condo unit", () => {
    // Preconditions
    loginOwner()

    // Test
    cy.contains("div","Payment Due")
    cy.contains("div", "Upcoming Payment")
  })
})

describe("E2E Test for Use Case 32: Record Operational Budget", () => {
  it.skip("Should allow condo management companies to see total condo fees collected for each property", () => {
    // Preconditions

    // Test
  })
})

describe("E2E Test for Use Case 33: Record Operation Costs", () => {
  it.skip("Should allow condo management companies to record operational costs", () => {
    // Preconditions

    // Test
  })
})

describe("E2E Test for Use Case 34: Read Operational Costs", () => {
  it.skip("Should allow condo management companies to see entered operational costs", () => {
    // Preconditions

    // Test
  })
})

describe("E2E Test for Use Case 35: Update Operational Costs", () => {
  it.skip("Should allow condo management companies to update any entered operational costs", () => {
    // Preconditions

    // Test
  })
})

describe("E2E Test for Use Case 36: Generate Annual Report", () => {
  it.skip("Should allow condo management companies to see total fees collected - total operational costs " +
      "for any given year", () => {
    // Preconditions

    // Test
  })
})

describe("E2E Test for Use Case 37: Set Up Reservation System", () => {
  it.skip("Should allow condo management companies to add facilities to their properties that owners/renters" +
      "can reserve", () => {
    // Preconditions

    // Test
  })
})

describe("E2E Test for Use Case 38: Read Facility Availabilities", () => {
  it.skip("Should allow condo management companies to see added facilities", () => {
    // Preconditions

    // Test
  })
})

describe("E2E Test for Use Case 39: Block Reserved Facilities", () => {
  it.skip("Should allow condo management companies to block reserved facilities", () => {
    // Preconditions

    // Test
  })
})

describe("E2E Test for Use Case 40: Assign Employee Roles", () => {
  it("Should allow condo management companies to assign a role to added employees", () => {
    // Preconditions
    loginCompany()

    // Test
    const firstName = "CypressEmployeeF";
    cy.get("#root").contains("a","Add Employee").click()
    cy.get("#root").contains("form").get("input[name='first_name']").type(firstName)
        .should("have.value", firstName)
        .get("input[name='last_name']").type("CypressEmployeeL")
        .should("have.value", "CypressEmployeeL")
        .get("select[name='property_id']").select("CypressPropertyName")
        .get("input[name='role']").should("have.value", "employee")
    cy.get('.fixed > .bg-white').contains("a", "Add Employee").click()
    cy.wait(1000)

    // Tear Down
    deleteEmployee(firstName)
  })
})

describe("E2E Test for Use Case 41: Create Employee", () => {
  it("Should allow condo management companies to add employees to their dashboard", () => {
    // Preconditions
    loginCompany()

    // Test
    const firstName = "CypressEmployeeF";
    cy.get("#root").contains("a","Add Employee").click()
    cy.get("#root").contains("form").get("input[name='first_name']").type(firstName)
        .should("have.value", firstName)
        .get("input[name='last_name']").type("CypressEmployeeL")
        .should("have.value", "CypressEmployeeL")
        .get("select[name='property_id']").select("CypressPropertyName")
        .get("input[name='role']").should("have.value", "employee")
    cy.get('.fixed > .bg-white').contains("a", "Add Employee").click()
    cy.wait(1000)

    // Tear Down
    deleteEmployee(firstName)

  })

})

describe("E2E Test for Use Case 42: Read Employee", () => {
  it("Should allow condo management companies to see added employees", () => {
    // Preconditions
    loginCompany()
    const firstName = "CypressEmployeeF";
    createEmployee(firstName)

    // Test
    cy.reload()
    cy.get(':nth-child(2) > .rounded-lg > .w-full').last().within(() => {
      cy.get("td").contains(firstName)
    })

    // Tear Down
    deleteEmployee(firstName)
  })
})

describe("E2E Test for Use Case 43: Update Employee", () => {
  it("Should allow condo management companies to update any added employees", () => {
    // Preconditions
    loginCompany()
    const firstName = "CypressEmployeeF";
    createEmployee(firstName)

    // Test
    cy.reload()
    cy.get(':nth-child(2) > .rounded-lg > .w-full').last().within(() => {
      cy.get("td").contains(firstName).parent().within(() => {
        cy.get("td a").contains("Edit").click()
      })
    })
    cy.get("#root").contains("form").get("input[name='first_name']").clear()
        .type("CypressEmployeeUpdateF").should("have.value", "CypressEmployeeUpdateF")
    cy.get('.fixed > .bg-white').contains("a", "Confirm Edit").click()

    // Tear Down
    deleteEmployee("CypressEmployeeUpdateF")
  })
})

describe("E2E Test for Use Case 44: Delete Employee", () => {
  it("Should allow condo management companies to delete employees", () => {
    // Preconditions
    loginCompany()
    const firstName = "CypressEmployeeF";
    createEmployee(firstName)

    // Test
    cy.reload()
    cy.get(':nth-child(2) > .rounded-lg > .w-full').last().within(() => {
      cy.get("td").contains(firstName).parent().within(() => {
        cy.get('td a').contains("Delete").click()
      })
    })
    cy.wait(500)
    cy.get(".fixed > .bg-white").contains("a","Confirm").click()
    cy.wait(1000)
  })
})

describe("E2E Test for Use Case 45: Assign Requests to Employees", () => {
  it("Should allow condo management companies to assign requests to employees", () => {
    // Preconditions

    // Test

    // Tear Down
  })
})

