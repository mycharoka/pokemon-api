const { pool } = require('../../core/database')

const router = require('express').Router()

router.get('/personal', async (req, res) => {
  try {
    const query = "SELECT * FROM pokemon_tbl"
    const results = await pool.query(query)
    console.log(results.rows)
    return res.json({
      message: 'success',
      data: results.rows
    })
  } catch (error) {
    return res.json({
      status: 'error',
      message: error.message
    })
  }
})

router.post('/personal', async (req, res) => {
  try {
    const isRenameWritten = req.body.pokemon_rename

    if (isRenameWritten) {
      const query = "INSERT INTO pokemon_tbl(pokemon_name, pokemon_rename) VALUES ($1, $2)"
      const values = [req.body.pokemon_name, isRenameWritten]
      await pool.query(query, values)

      return res.json({
        status: 'success',
        message: 'Save pokemon with new name'
      })
    } else {
      const query = "INSERT INTO pokemon_tbl(pokemon_name, pokemon_rename) VALUES($1, $1)"
      const values = [req.body.pokemon_name]
      await pool.query(query, values)

      return res.json({
        status: 'success',
        message: 'Save pokemon without new name'
      })
    }

  } catch (error) {
    return res.json({
      status: 'error',
      message: error.message
    })
  }
})

router.put('/personal/:id', async (req, res) => {
  try {
    console.log('req body >>', req.body.pokemon_rename.length)
    if (req.body.pokemon_rename.length == 0) {
      const query = "SELECT pokemon_name, rename_count, pokemon_rename FROM pokemon_tbl WHERE id = $1"
      const values = [req.params.id]
      let result = await pool.query(query, values)

      if (result.rows[0].pokemon_rename) {
        let existedRename = result.rows[0].pokemon_rename
        let renameCount = result.rows[0].rename_count
        const updateCount = fibonacci(renameCount)

        const updateQuery = "UPDATE pokemon_tbl SET pokemon_rename = $1, rename_count = $2"
        const updateValues = [`${existedRename}-${updateCount}`, renameCount + 1]
        const updateResult = await pool.query(updateQuery, updateValues)

        return res.json({
          message: "Updated with existed rename pokemon name",
          data: updateResult.rows[0]
        })

      } else {
        const originalName = result.rows[0].pokemon_name
        let renameCount = result.rows[0].rename_count
        const updateCount = fibonacci(renameCount)

        const updateQuery = "UPDATE pokemon_tbl SET pokemon_rename = $1, rename_count = $2"
        const updateValues = [`${originalName}-${updateCount}`, renameCount + 1]
        const updateResult = await pool.query(updateQuery, updateValues)

        return res.json({
          message: "Updated without rename",
          data: updateResult.rows[0]
        })
      }

    } else if (req.body.pokemon_rename.length > 0) {
      const query = "SELECT rename_count FROM pokemon_tbl WHERE id = $1"
      const values = [req.params.id]
      let result = await pool.query(query, values)

      let renameCount = result.rows[0].rename_count
      const updateCount = fibonacci(renameCount)

      const updateQuery = "UPDATE pokemon_tbl SET pokemon_rename = $1, rename_count = $2"
      const updateValues = [`${req.body.pokemon_rename}-${updateCount}`, renameCount + 1]
      const updateResult = await pool.query(updateQuery, updateValues)

      return res.json({
        message: "Updated with rename",
        data: updateResult.rows[0]
      })
    }
  } catch (error) {
    return res.json({
      status: 'error',
      message: error.message
    })
  }
})

function isPrime(num) {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

function fibonacci(index) {
  let firstVal = 0;
  let secondVal = 1;

  let sum = 0;

  for (let i = 2; i <= index; i++) {
    sum = firstVal + secondVal;
    firstVal = secondVal;
    secondVal = sum;
  }

  const result = BigInt(index ? secondVal : firstVal)

  return result;

}



module.exports = router