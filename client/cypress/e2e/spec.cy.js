import {
  createEmployee, deleteEmployee,
  loginCompany2, loginOwner,
  loginPublicUser,
  loginRenter, resetProfileCompany, resetProfilePublicUser, resetProfileRenter, viewProfileCompany,
  viewProfilePublicUser,
  viewProfileRenter
} from '../support/cypress-utils.js'

let baseURL = 'http://localhost:5173/'

beforeEach(()=> {
  cy.visit(baseURL)
})


describe("E2E Test Case 1 for Use Case 1: Public User Sign Up With Email", () => {
  it("Should let new user sign up with a username, name, email, and password", () => {
    // Test
    cy.get(':nth-child(4) > .flex > .underline').click()
    cy.location("pathname").should('eq',"/SignUp")
    cy.get('.chakra-button').click()
    cy.location("pathname").should('eq',"/SignUp/userSignUp")
    cy.get("input[name='first_name']").type("CypressTestFirstName").should("have.value",
        "CypressTestFirstName")
    cy.get("input[name='last_name']").type("CypressTestLastName").should("have.value",
        "CypressTestLastName")
    cy.get("input[name='email']").filter(':visible').type("CypressTest@email.com").should("have.value",
        "CypressTest@email.com")
    cy.get("input[name='password']").filter(':visible').type("CypressTestPassword").should("have.value",
        "CypressTestPassword")
    cy.contains("button", "Sign up").click()
    cy.location("pathname").should('include', "/")
    cy.wait(1000)
    loginPublicUser()
  })
})

describe("E2E Test Case 2 for Use Case 46: Public User Email Login", () => {
  it("Should sign in when the public user enters their email and password", () =>{
    // Test
    cy.get("input[name='email']").type("CypressTest@email.com").should("have.value",
        "CypressTest@email.com")
    cy.get("input[name='password']").type("CypressTestPassword").should("have.value",
        "CypressTestPassword")
    cy.contains("button", "Sign In").click()
    cy.location("pathname").should('include', "/DashboardHome/editUser")
  })
})

describe("E2E Test Case 3 for Use Case 2: Public User Profile Creation", () => {
  it("Should let public users see their profile", () => {
    // Preconditions
    loginPublicUser()

    // Test
    cy.location("pathname").should('eq', "/DashboardHome/editUser")
  })
})

describe("E2E Test Case 4 for Use Case 3: Public User Update Profile", () => {
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

describe("E2E Test Case 5 for Use Case 4: Register Condo Owners/Rental Users", () => {
  it("Should allow public users to enter a registration key provided by condo management companies" +
      "to update their role to owner or renter", () => {
    // Preconditions
    loginPublicUser()

    // Test
    cy.contains("button", "Activate Registration Key").click()
    cy.get("input[name='token']").type("idnfh8clz4c-z1b1xi9diks-ndit90t18un")
    cy.contains("a", "Activate Key").click()
    cy.location("pathname").should('include', "/DashBoardHomeCO")
  })
})

describe("E2E Test Case 6 for Use Case 5: Condo Owner/Rental User Email Login", () => {
  it("Should allow Condo Owner/ Rental Users to log in via email and password", () => {
    // Test
    cy.get("input[name='email']").type("CypressRenter@email.com")
        .should("have.value", "CypressRenter@email.com")
    cy.get("input[name='password']").type("CypressRenterPassword")
        .should("have.value","CypressRenterPassword")
    cy.contains("button", "Sign In").click()
    cy.location("pathname").should('include', "/DashBoardHome")
  })
})

describe("E2E Test Case 7 for Use Case 6: Create Owner/Rental User Profile", () => {
  it("Should let owners/renters view their profile", () => {
    // Preconditions
    loginRenter()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Edit profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUser")
  })
})

describe("E2E Test Case 8 for Use Case 7: Update Condo Owner/Rental User Profile", () => {
  it("Should let owners/renters update their profile", () => {
    // Preconditions
    loginRenter()
    viewProfileRenter()

    // Test
    cy.get("#root").get(".row").contains("button","Update Info").click()
    cy.get("#root").get("form")
        .get("input[name='first_name']").clear({force: true})
        .type("CypressUpdateRenterF").should("have.value", "CypressUpdateRenterF")
        .get("input[name='last_name']").clear({force: true})
        .type("CypressUpdateRenterL").should("have.value", "CypressUpdateRenterL")
        .get("input[name='email']").clear({force: true})
        .type("CypressRenter@email.com").should("have.value", "CypressRenter@email.com")
    cy.get("#root").get("form").contains("button","Done").click()

    // Tear Down
    resetProfileRenter()

  })
})

describe("E2E Test Case 9 for Use Case 8: View The Dashboard Owner/Renter", () => {
  it("Should allow owners/renters to see the dashboard", () => {
    // Preconditions
    loginRenter()

    // Test
    cy.location("pathname").should('include', "/DashBoardHome")
  })
})

describe("E2E Test Case 10 for Use Case 9: Display General Information Through the Dashboard", () => {
  it("Should allow owners/renters to see general information through the dashboard", () => {
    // Preconditions
    loginRenter()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
  })
})

describe("E2E Test Case 11 for Use Case 10: Display Condo Information Through the Dashboard to Condo Owners", () => {
  it("Should allow owners to see condo information on their dashboard", () => {
    // Preconditions
    loginOwner()

    // Test
    cy.contains("h2", "My Condo Units")
  })
})

describe("E2E Test Case 12 for Use Case 11: Display Financial Information Through the Dashboard", () => {
  it("Should allow condo owners to see financial information through the dashboard", () => {
    // Preconditions
    loginOwner()

    // Test
    cy.contains("div","Payment Due")
    cy.contains("div", "Upcoming Payment")
  })
})

describe("E2E Test Case 13 for Use Case 12: Display Request Status Through The Dashboard", () => {
  it("Should allow owners/renters to view submitted requests", () => {
    // Preconditions
    loginOwner()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Your Requests").click()
    cy.location("pathname").should('eq', "/ServicesDashBoard")
    cy.contains("h2", "Your Service Requests")
  })
})

describe("E2E Test Case 14 for Use Case 13: Submit Requests Through The Dashboard", () => {
  it("Should allow owners/renters to submit requests", () => {
    // Preconditions
    loginOwner()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Your Requests").click()
    cy.location("pathname").should('eq', "/ServicesDashBoard")
    cy.contains("a", "Submit a Request").click()
    cy.get("input[name='type']").type("CypressRequest").should("have.value","CypressRequest")
    cy.get("input[name='description']").type("CypressDescription").should("have.value","CypressDescription")
    cy.contains("a","Submit Request").click()
  })
})

describe("E2E Test Case 15 for Use Case 14: View Facility Reservation Availability", () => {
  it("Should allow owners/renters to view facility reservation", () => {
    // Preconditions
    loginOwner()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Your Reservations").click()
    cy.location("pathname").should('eq', "/Reservation")
    cy.contains("h2", "Current Reservations")
  })
})

describe("E2E Test Case 16 for Use Case 15: Reserve Facility", () => {
  it("Should allow owners/renters to reserve facility", () => {
    // Preconditions
    loginOwner()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Your Reservations").click()
    cy.location("pathname").should('eq', "/Reservation")
    cy.contains("a","Add Reservation").click()
    cy.get(".chakra-select").first().select("CypressPropertyName")
    cy.get("select[name='facility_id']").select("CypressFacilityName")
    cy.contains("button", "30").click()
    cy.get('.fixed > .bg-white > .flex-row').click()

  })
})

describe("E2E Test Case 17 for Use Case 16: Create Condo Management Company Login", () => {
  it("should be able to sign up as a condo management company.", () => {
    // Test
    cy.get(':nth-child(4) > .flex > .underline').click()
    cy.location("pathname").should('eq',"/SignUp")
    cy.get('.chakra-button').click()
    cy.location("pathname").should('eq',"/SignUp/userSignUp")
    cy.contains("button", "Company").click()
    cy.get("input[name='company_name']").type("CypressCompanyName2")
        .should("have.value", "CypressCompanyName2")
    cy.get("input[name='email']").filter(":visible").type("CypressCompany2@email.com")
        .should("have.value", "CypressCompany2@email.com")
    cy.get("input[name='password']").filter(":visible").type("CypressCompanyPassword")
        .should("have.value", "CypressCompanyPassword")
    cy.get("button.chakra-button.css-4cuxxj").filter(":visible").click()
    cy.location("pathname").should('eq', '/')
  })
})



describe("E2E Test Case 18 for Use Case 17: Create Condo Management Company Profile", () => {
  it("Should allow condo management to create a condo management profile", () => {
    // Preconditions
    loginCompany2()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Edit profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUserCMC")

  })
})

describe("E2E Test Case 19 for Use Case 18: Update Condo Management Profile", () => {
  it("Should allow condo management companies to update their profile", () => {
    // Preconditions
    loginCompany2()
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

describe("E2E Test Case 20 for Use Case 19: Create Property Profile", () => {
  it("Should allow condo management companies to add new properties", () => {
    // Preconditions
    loginCompany2()

    // Test
    cy.get("#root").contains('a', 'Add Property').click()
    cy.get("#root").contains('form').get("input[name='propertyName']")
        .type("CypressPropertyName2").should("have.value", "CypressPropertyName2")
    cy.get("#root").contains('form').get("input[name='propertyAddress']")
        .type("CypressPropertyAddress").should("have.value", "CypressPropertyAddress")
    cy.get("#root").contains('form').get("input[name='numberOfCondoUnits']")
        .type("50").should("have.value", "50")
    cy.get("#root").contains('form').get("input[name='numberOfParkingUnits']")
        .type("50").should("have.value", "50")
    cy.get("#root").contains('form').get("input[name='numberOfLockers']")
        .type("50").should("have.value", "50")
    cy.get('.fixed > .bg-white > .flex-row').click({ force: true })
    cy.wait(5000)
  })
})

describe("E2E Test Case 21 for Use Case 20: Read Property Profile", () => {
  it("Should allow condo management companies to view the properties they've added", () => {
    // Preconditions
    loginCompany2()
    cy.wait(2000)

    // Test
    cy.location("pathname").should('eq', "/DashboardHomeCMC")

  })
})

describe("E2E Test Case 22 for Use Case 23: Upload Condo Files to Property", () => {
  it("Should allow condo management companies to upload files related to condo units", () => {
    // Preconditions

    // Test
  })
})


describe("E2E Test Case 23 for Use Case 24: Enter Detailed Condo Unit Information", () => {
  it("Should allow condo management companies to enter condo unit number, unit size, occupant type, and fees", () => {
    // Preconditions
    loginCompany2()
    cy.wait(2000)

    // Test
    cy.get(':nth-child(1) > .flex-col > :nth-child(2) > .rounded-lg > .w-full > .border > :nth-child(1)').click()
    cy.wait(500)
    cy.location("pathname").should("include", "/DashboardHomeCMC/property/")
    cy.contains("a", "Add Condo Units").click()
    cy.wait(500)
    cy.get("#condoUnitNumber").select("2").select("1").should("have.value", "1")
    cy.get("#condoUnitSize").type("650").should("have.value", "650")
    cy.get("#condoUnitOccupantType").select("Renter").select("Owner")
        .should("have.value", "Owner")
    cy.get("#condoUnitTotalFees").type("2500").should("have.value", "2500")
    cy.get('.fixed > .bg-white > .flex-row').click()

  })
})

describe("E2E Test Case 24 for Use Case 25: Send Registration Key", () => {
  it("Should allow condo management companies to send registration keys to public users", () => {
    // Preconditions

    // Test
    throw new Error ("Use Case Not Implemented")
  })
})

describe("E2E Test Case 25 for Use Case 27: Enter Detailed Parking Spot Information", () => {
  it("Should allow condo management companies to enter parking number, parking fee, parking owner, parking occupant",() => {
    // Preconditions
    loginCompany2()
    cy.wait(2000)

    // Test
    cy.get(':nth-child(1) > .flex-col > :nth-child(2) > .rounded-lg > .w-full > .border > :nth-child(1)').click()
    cy.wait(500)
    cy.location("pathname").should("include", "/DashboardHomeCMC/property/")
    cy.contains("a", "Add Parking Units").click()
    cy.wait(500)
    cy.get("#parkingUnitNumber").type("1").should("have.value", "1")
    cy.get("#parkingUnitFee").type("100").should("have.value", "100")
    cy.get("#parkingUnitOwner").type("CypressOwnerF")
        .should("have.value", "CypressOwnerF")
    cy.get("#parkingUnitOccupant").type("CypressRenterF").should("have.value", "CypressRenterF")
    cy.get('.fixed > .bg-white > .flex-row').click()
  })
})


describe("E2E Test Case 26 for Use Case 28: Enter Detailed Locker Information", () => {
  it("Should allow condo management companies to enter locker number, locker fee, locker owner, locker occupant", () => {
    loginCompany2()
    cy.wait(2000)

    // Test
    cy.get(':nth-child(1) > .flex-col > :nth-child(2) > .rounded-lg > .w-full > .border > :nth-child(1)').click()
    cy.wait(500)
    cy.location("pathname").should("include", "/DashboardHomeCMC/property/")
    cy.contains("a", "Add Locker Units").click()
    cy.wait(500)
    cy.get("#lockerUnitNumber").type("1").should("have.value", "1")
    cy.get("#lockerUnitFee").type("100").should("have.value", "100")
    cy.get("#lockerUnitOwner").type("CypressOwnerF")
        .should("have.value", "CypressOwnerF")
    cy.get("#lockerUnitOccupant").type("CypressRenterF").should("have.value", "CypressRenterF")
    cy.get('.fixed > .bg-white > .flex-row').click()
  })
})

describe("E2E Test Case 27 for Use Case 29: Enter Condo Fee Per Square Foot, Parking Spot, And Locker", () => {
  it("should allow condo management companies to enter condo fee per square foot, parking spot fee, and locker fee" +
      "for any properties that they own", () => {
    // Preconditions

    // This Use Case is covered by E2E Test Case 20 and E2E Test Case 23

    // Test

  })
})

describe("E2E Test Case 28 for Use Case 30: Calculate Total Condo Fees", () => {
  it("Should calculate total condo fees based on cost per square feet, locker fee, and parking fee", () => {
    // Preconditions
    loginCompany2()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Finance").click()
    cy.location("pathname").should("include", "/DashboardHomeCMC/Finance")
    cy.contains("th", "Total Condo Fees")
  })
})

describe("E2E Test Case 29 Use Case 31: Send Total Condo Fees to Condo Owners", () => {
  it("Should allow condo Owners to see all fees related to their condo unit", () => {
    // Preconditions
    loginOwner()

    // Test
    cy.contains("div","Payment Due")
    cy.contains("div", "Upcoming Payment")
  })
})

describe("E2E Test Case 30 for Use Case 32: Record Operational Budget", () => {
  it("Should allow condo management companies to see total condo fees collected for each property", () => {
    // Preconditions
    loginCompany2()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Finance").click()
    cy.location("pathname").should("include", "/DashboardHomeCMC/Finance")
    cy.contains("p", "Current Operational Budget:")
  })
})

describe("E2E Test Case 31 for Use Case 33: Record Operation Costs", () => {
  it("Should allow condo management companies to record operational costs", () => {
    // Preconditions
    loginCompany2()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Finance").click()
    cy.location("pathname").should("include", "/DashboardHomeCMC/Finance")
    cy.contains("a", "Add Transaction").click()
    cy.get("input[name='type']").type("CypressOperation")
        .should("have.value", "CypressOperation")
    cy.get("input[name='cost']").type("2000").should("have.value", "2000")
    cy.get("select[name='property_id']").select("CypressPropertyName2")
    cy.get("input[name='date']").type("2024-01-01")
    cy.contains("a", "Add Operation").click()
  })
})

describe("E2E Test Case 32 for Use Case 34: Read Operational Costs", () => {
  it("Should allow condo management companies to see entered operational costs", () => {
    // Preconditions
    loginCompany2()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Finance").click()
    cy.location("pathname").should("include", "/DashboardHomeCMC/Finance")
    cy.contains("h2", "Finance History")
  })
})

describe("E2E Test Case 33 for Use Case 35: Update Operational Costs", () => {
  it("Should allow condo management companies to update any entered operational costs", () => {
    // Preconditions
    loginCompany2()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Finance").click()
    cy.location("pathname").should("include", "/DashboardHomeCMC/Finance")
    cy.contains("a", "Edit").click()
    cy.get("input[name='type']").clear().type("CypressOperationUpdate")
    cy.contains("a", "Confirm Edit").click()
  })
})

describe("E2E Test Case 34 for Use Case 36: Generate Annual Report", () => {
  it("Should allow condo management companies to see total fees collected - total operational costs " +
      "for any given year", () => {
    // Preconditions
    loginCompany2()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Finance").click()
    cy.location("pathname").should("include", "/DashboardHomeCMC/Finance")
    cy.contains("h2", "Property Report")
  })
})

describe("E2E Test Case 35 for Use Case 37: Set Up Reservation System", () => {
  it("Should allow condo management companies to add facilities to their properties that owners/renters" +
      "can reserve", () => {
    loginCompany2()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Reservations").click()
    cy.location("pathname").should("include", "/ReservationCMC")
    cy.get('.chakra-select').select("CypressPropertyName2")
    cy.contains("a","Add Facility").click()
    cy.get("input[name='name']").type("CypressFacilityName2")
        .should("have.value", "CypressFacilityName2")
    cy.get("input[name='description']").type("CypressFacilityDescription")
        .should("have.value", "CypressFacilityDescription")
    cy.contains("a", "Add Facility").filter(":visible")
  })
})

describe("E2E Test Case 36 for Use Case 38: Read Facility Availabilities", () => {
  it("Should allow condo management companies to see added facilities", () => {
    loginCompany2()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Reservations").click()
    cy.location("pathname").should("include", "/ReservationCMC")
    cy.get('.chakra-select').select("CypressPropertyName2")
    cy.contains("h2", "Reservation Calendar")
  })
})

describe("E2E Test Case 37 for Use Case 39: Block Reserved Facilities", () => {
  it("Should block facilities once reserved", () => {
    // Preconditions
    loginCompany2()

    // Test
    cy.get(".dashboard__home").get("button[type='button']").click()
    cy.get(".chakra-ui-light").contains("button","Reservations").click()
    cy.location("pathname").should("include", "/ReservationCMC")
    cy.get('.chakra-select').select("CypressPropertyName2")
    cy.contains("h2", "Reservation Calendar")
  })
})

describe("E2E Test Case 38 for Use Case 40: Assign Employee Roles", () => {
  it("Should allow condo management companies to assign a role to added employees", () => {
    // Preconditions
    loginCompany2()

    // Test
    const firstName = "CypressEmployeeF";
    cy.get("#root").contains("a","Add Employee").click()
    cy.get("#root").contains("form").get("input[name='first_name']").type(firstName)
        .should("have.value", firstName)
        .get("input[name='last_name']").type("CypressEmployeeL")
        .should("have.value", "CypressEmployeeL")
        .get("select[name='property_id']").select("CypressPropertyName2")
        .get("input[name='role']").should("have.value", "employee")
    cy.get('.fixed > .bg-white').contains("a", "Add Employee").click()
    cy.wait(1000)

    // Tear Down
    deleteEmployee(firstName)
  })
})

describe("E2E Test Case 39 for Use Case 41: Create Employee", () => {
  it("Should allow condo management companies to add employees to their dashboard", () => {
    // Preconditions
    loginCompany2()

    // Test
    const firstName = "CypressEmployeeF";
    cy.get("#root").contains("a","Add Employee").click()
    cy.get("#root").contains("form").get("input[name='first_name']").type(firstName)
        .should("have.value", firstName)
        .get("input[name='last_name']").type("CypressEmployeeL")
        .should("have.value", "CypressEmployeeL")
        .get("select[name='property_id']").select("CypressPropertyName2")
        .get("input[name='role']").should("have.value", "employee")
    cy.get('.fixed > .bg-white').contains("a", "Add Employee").click()
    cy.wait(1000)

    // Tear Down
    deleteEmployee(firstName)

  })

})

describe("E2E Test Case 40 for Use Case 42: Read Employee", () => {
  it("Should allow condo management companies to see added employees", () => {
    // Preconditions
    loginCompany2()
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

describe("E2E Test Case 41 for Use Case 43: Update Employee", () => {
  it("Should allow condo management companies to update any added employees", () => {
    // Preconditions
    loginCompany2()
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

describe("E2E Test Case 42 for Use Case 44: Delete Employee", () => {
  it("Should allow condo management companies to delete employees", () => {
    // Preconditions
    loginCompany2()
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

describe("E2E Test Case 43 for Use Case 45: Assign Requests to Employees", () => {
  it("Should allow condo management companies to assign requests to employees", () => {
    // Preconditions

    // Test

    // Tear Down
  })
})

describe("E2E Test Case 44 for: Google Sign In", () => {
  it("Should allow users to sign in using their existing gmail account", () => {
    // Preconditions

    // Test

    // Tear Down
  })
})

