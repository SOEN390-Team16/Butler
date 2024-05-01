const pool = require('../../../db')

const getSingleFileByFileId = (property_file_id) => {
  const query = 'SELECT * FROM property_file WHERE property_file_id = $1;'
  return pool.query(query, [property_file_id])
    .then(result => {
      if (result.rows.length === 0) {
        throw new Error('No property file found with the given ID.')
      }
      return result.rows[0]
    })
    .catch(err => {
      console.error('Error executing search query', err.stack)
      throw err
    })
}

const getFilesByPropertyId = (property_id) => {
  const query = 'SELECT * FROM property_file WHERE property_id = $1;'
  return pool.query(query, [property_id])
    .then(result => {
      return result.rows
    })
    .catch(err => {
      console.error('Error executing search query', err.stack)
      throw err
    })
}

const savePropertyFile = (property_id, file_name, url) => {
  const query = 'INSERT INTO property_file (property_id, file_name, url) VALUES ($1, $2, $3) RETURNING *;'
  return pool.query(query, [property_id, file_name, url])
    .then(result => {
      return result.rows[0]
    })
    .catch(err => {
      console.error('Error executing insert query', err.stack)
      throw err
    })
}

const deletePropertyFileByFileName = (property_file_id) => {
  const query = 'DELETE FROM property_file WHERE property_file_id=$1'
  return pool.query(query, [property_file_id])
    .then(result => {
      return { success: true, message: 'File successfully deleted', rowCount: result.rowCount }
    })
    .catch(err => {
      console.error('Error executing delete query', err.stack)
      throw err
    })
}

module.exports = {
  getSingleFileByFileId,
  getFilesByPropertyId,
  savePropertyFile,
  deletePropertyFileByFileName
}
