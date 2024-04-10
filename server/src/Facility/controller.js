const pool = require('../../db')
const queries = require('./queries')

const getFacilityById = (req, res) => {
  console.log('Getting a facility by id')
  const { companyid, propertyid, facilityid, userid } = req.query;

  // Determine which query to execute based on provided parameters
  let query, params;
  if (companyid) {
    query = queries.getParkingSpotsByCompanyId;
    params = [parseInt(companyid)];
  } else if (propertyid) {
    query = queries.getParkingSpotsByPropertyId;
    params = [parseInt(propertyid)];
  }
  else if (facilityid){
    query = queries.getParkingSpotsByFacilityId;
    params = [parseInt(facilityid)];
  }
  else if (userid){
    query = queries.getParkingSpotsByUserId;
    params = [parseInt(userid)];
  } else {
    // If none of the parameters are provided, return an error
    return res.status(400).json({ error: 'At least one parameter (companyid, parkingid, or property_id) must be provided.' });
  }
  const parkingid = parseInt(req.params.parkingid)
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error finding facility by id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getReservedFacilityById = (req, res) => {
    console.log('Getting reserved facility/ies by id')
    const { companyid, propertyid, facilityid, userid } = req.query;
  
    // Determine which query to execute based on provided parameters
    let query, params;
    if (companyid) {
      query = queries.getParkingSpotsByCompanyId;
      params = [parseInt(companyid)];
    } else if (propertyid) {
      query = queries.getParkingSpotsByPropertyId;
      params = [parseInt(propertyid)];
    }
    else if (facilityid){
      query = queries.getParkingSpotsByFacilityId;
      params = [parseInt(facilityid)];
    }
    else if (userid){
      query = queries.getParkingSpotsByUserId;
      params = [parseInt(userid)];
    } else {
      // If none of the parameters are provided, return an error
      return res.status(400).json({ error: 'At least one parameter (companyid, parkingid, or property_id) must be provided.' });
    }
    const parkingid = parseInt(req.params.parkingid)
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error finding reserved facility by id: ', error)
        res.status(500).json({ error: 'Internal Server Error' })
      } else {
        res.status(200).json(results.rows)
      }
    })
}

module.exports = {
  getFacilityByDate,
  getFacilityById
}
