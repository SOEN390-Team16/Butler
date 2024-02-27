const getCMCs = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, pu.role, " +
    "cmc.companyID FROM public_user pu, condo_management_company cmc WHERE pu.userID = cmc.companyID;";
const getCMCById = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, pu.role," + 
"cmc.companyID FROM public_user pu JOIN condo_management_company cmc ON pu.userid = cmc.userid WHERE cmc.companyID = $1;"; 
const checkIfEmailExists = "SELECT * FROM public_user pu WHERE pu.email = $1;";
const addCMC = "INSERT INTO condo_management_company(userID) VALUES ((SELECT userID FROM public_user pu WHERE pu.email = $1));" +
"UPDATE public_user SET role = condo_management_company WHERE condo_management_company.userid = public_user.userid;";
const removeCMC = "DELETE FROM condo_management_company cmc WHERE companyID = $1;";

module.exports = {
    getCMCs,
    getCMCById,
    checkIfEmailExists,
    addCMC,
    removeCMC,
    updateCMC
}