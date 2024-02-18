# Butler

Welcome to Butler, a condo management application offering a robust solution for efficiently managing condominium properties. This application provides a platform for condo owners, rental users, and management companies to streamline property-related activities and communication.

## Table of Contents
- [Features](#Features)
- [Usage](#Usage)
- [Technology Stack](#Technology-Stack)
- [Wiki](#Wiki)

## Features

The Condo Management Application offers a range of features, including:
- User profile creation and management
- Property and unit information tracking
- Financial system for condo fee management
- Reservation system for common facilities
- Request submission and tracking
- Event organization and invitation
- Discounts and offers listing

## Usage

Register and create your profile using a registration key obtained from your condo management company.
Explore property details, financial information, and manage reservations.
Submit requests, participate in the forum, and organize events.
Condo management companies can create property profiles, manage files, and set up employee roles.

## Technology Stack

The Condo Management Application is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The technology stack ensures a scalable, efficient, and modern web application.

- MySQL: SQL database for clear relationships and fast queries.
- Express.js: Backend framework for handling server-side operations.
- React.js: Frontend library for building dynamic user interfaces.
- Node.js: JavaScript runtime for server-side scripting.

### Team Members

| Name                   | Student ID | GitHub Username |
| ------------------------ | ------------ | ----------------- |
| Daniel Duguay	 | 40202775 | DanDuguay |
| Nicolas Chelico	| 40156158 | NicolasChelico |
| Wadeh Hamati	| 40216893 | wade3hamati |
| Walid Achlaf	| 40210355 | walidoow |
| Charles Eimer	| 26747310 | eimcharles |
| Houssam Righi	| 40155074 | |
| Ceyhun Topcu	| 40159200 | ceyhuntopcu |
| Monika Moanes	| 40188452 | MonikaaMoanes |
| Mohammed Rahman | 	40203098 | Afifr2001 |
| Khalil Garaali	| 40226310 | KhalilGarali |
| Youssef Alsheghri	| 40108014 | yousfino |


## How to run

1. Pull the repository into IDE of your choice.
2. Open a new terminal in the console. 
3. Navigate to the client folder by doing the following command: cd client
4. Once in client, run the following command in the terminal: npm run dev
5. A localhost will appear, use that localhost url into your browser
6. Enjoy :)


## Wiki

## General Github Workflow

## Git Workflow

### "One Branch, One Feature" Workflow

The main branch should be reserved for finished and tested code.
When assigned to a "feature" issue, create a new branch for that feature.

Once you have cloned the main branch, use the following git command from your IDE's terminal to start working on a new feature:

`git checkout main` // ensure that you are on the main branch

`git pull` // ensure that the main branch is up to date

`git checkout -b <BRANCH_NAME>` // checkout -b creates a new branch, and the branch name should match the following branch naming convention: FeatureName_YourName_YourTeam_Sprint# . `git checkout -b PublicUserLogin_DanDuguay_Backend_Sprint2`, for example.

<br/>

**While working on your feature:**

`git add .` // adds your updated files to the staging, most IDEs do this automatically.

`git commit -m "<MESSAGE>"` // Your commit message should clearly describe the change you made. `git commit -m "Changed the navigation bar format from scroll menu to vertical sidebar"` for example.

`git push -u origin <BRANCH_NAME>` // Pushes your commit to the branch. `git push -u origin PublicUserLogin_DanDuguay_Backend_Sprint2` for example.

Make sure to run the command `git pull origin main` frequently while working on your feature, to stay current with the main branch.


### Pull Requests

Once you have completed a feature, tested the new functionality, and are ready to merge it with the main branch:

`git pull origin main` // Pull any new code from the main branch one last time. Solve any merge conflicts that may occur.

`git add .`

`git commit -m "<FEATURE> pull request ready."`

`git push -u origin <BRANCH_NAME>`

<br/>
In GitHub, do the following steps:

1. On the main page of the main repository, go to the list of branches found above the repo's list of files/folders.

2. Begin a new pull request by clicking on the "New pull request" button next to your branch's name.

3. Include any information and tasks necessary for someone else to test your branch.

4. Assign someone, other than yourself, to review your pull request.

5. Finalize the pull request by clicking the green "Create pull request" button.


### Approve Pull Requests

If you were assigned to a pull request, do the following steps:

1. Select the pull request from the list found in the "Pull requests" tab on GitHub.

2. Check off tasks as you perform them and test the code:
   a. To test the code locally, use the following git commands in your IDE:

     `git checkout main`

     `git pull`

     `git checkout <BRANCH_NAME>`

     `git pull` // shouldn't be necessary, but doesn't hurt.

   b. Test the code.

3. Click the green "Merge pull request" once everything is tested, if this button is grayed out then there are still merge conflicts to resolve. Resolve the conflicts and commit/push the changes to the branch.

4. After the branch is merged, delete the branch.

