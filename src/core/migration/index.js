const { client } = require("./db")

let migration = async () => {
  try {
    await client.connect();
    await client.end();
  } catch (err) {
    console.log(err.message);
    await client.end();
  }
};

migration();