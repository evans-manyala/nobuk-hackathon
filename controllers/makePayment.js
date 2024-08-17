const axios = require("axios");
const { userToken } = require("../utils/token");

const makePayment = async (req, res) => {
    const { pay_amount, pay_number, pay_name } = req.body

    if(!pay_amount | !pay_number  | !pay_name) return res.status(400).send({ error: "Please provide all the required fields" })

  try {
    let data = JSON.stringify({
      paylink_id: "eac57d39-a942-4c6b-a54e-5358171b9f6f",
      org_id: "d590ffb6-b8ef-4106-b7fa-d21de4b9166f",
      sale_trx_code: "XYZX3",
      pay_amount: pay_amount,
      pay_number: pay_number,
      pay_name: pay_name,
      pay_type: "MPESA",
      multi_names: false,
      pay_details: "Test Payments"
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.kana.africa/dev/paylink/stktrigger",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return res.send(response.data).status(200)
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


module.exports = { makePayment }