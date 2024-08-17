const axios = require("axios");
const { PayerDetail } = require("../models/business");

const { userToken } = require("../utils/token");

const getPayerDetails = async (req, res) => {
  const payerdetails = await PayerDetail.find({});
  res.send(payerdetails).status(200);
};

const createPayerDetail = async (req, res) => {
  const { pay_type_main, pay_type, pay_detail_1, pay_detail_2 } = req.body;

  if (!pay_type_main | !pay_type | !pay_detail_1 | !pay_detail_2) {
    return res
      .status(400)
      .send({ error: "Please provide all the required fields" });
  }

  try {
    let data = JSON.stringify({
      org_id: "d371b6b8-1a2e-4b56-815a-f7b7b3827876",
      pay_type_main: pay_type_main,
      pay_type: pay_type,
      pay_detail_1: pay_detail_1,
      pay_detail_2: pay_detail_2,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.kana.africa/dev/ids/paydetails",
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
        const payerDetails = await PayerDetail.create(response.data["data"])
        if(!payerDetails) return res.status(404).send({ error: "Payer details could not be created" })
        return res.send({ msg: "Payer details created!!" }).status(200)
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


module.exports = { getPayerDetails, createPayerDetail }