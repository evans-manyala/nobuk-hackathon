const axios = require("axios");
const { Business } = require("../models/business");

const { userToken } = require("../utils/token");


const getBusiness = async (req, res) => {
  const businesses = await Business.find({});
  res.send(businesses).status(200);
};

const createBusiness = async (req, res) => {
  const { name, location, description, category } = req.body;

  if (!name | !location | !description | !category) {
    return res
      .status(400)
      .send({ error: "Please provide all the required fields" });
  }

  try {
    
    let data = JSON.stringify({
      name: name,
      registered_by: "2cc43240-91cf-4b65-b593-327266d88650",
      location: location,
      description: description,
      category: category
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.kana.africa/dev/ids/organizations",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${userToken}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(async (response) => {
        console.log(JSON.stringify(response.data));
        const response_data = response.data["data"]
        const newBusiness = await Business.create(response_data)
        console.log(newBusiness)
        //console.log(response_data)
        return res.send({ msg: "Business Successfully created" })
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ error: error.message })
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};


module.exports = { getBusiness, createBusiness }