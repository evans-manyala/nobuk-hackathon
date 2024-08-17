const axios = require("axios");
const { PaymentLink } = require("../models/business");

const { userToken } = require("../utils/token");

const getPaymentLinks = async (req, res) => {
  const links = await PaymentLink.find({});
  res.send(links).status(200);
};

const viewLinks = async (req, res) => {
  const { orgId } = req.params;
  const { account_number } = req.body;

  if(!orgId | !account_number ) return res.status(400).send({ error: "Please provide all required fields" })

  try {
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.kana.africa/dev/ids/paydetails/${orgId}`,
      headers: {
        Authorization:
          `Bearer ${userToken}`,
      },
    };

    axios
      .request(config)
      .then(async (response) => {
        const data = response.data["data"]
        const foundPayment = data.find(payment => payment.pay_detail_2 === account_number)
        console.log(foundPayment)
        if(foundPayment) {
          const payment = await PaymentLink.findByIdAndUpdate()
          if(payment) {
            payment.link_id = foundPayment.link_id
            await payment.save()
            return res.send(payment).status(200)
          }
        }
        return res.send(foundPayment).status(200)
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

const verifyPaymentLink = async (req, res) => {
  const { payerdetails_id, notification_email } = req.body;

  if (!payerdetails_id | !notification_email) {
    return res
      .status(400)
      .send({ error: "Please provide all the required fields" });
  }

  try {
    const currency = "KES";
    let data = JSON.stringify({
      paydetails_id: payerdetails_id,
      currency: currency,
      notification_email: notification_email,
      link_status: 1,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.kana.africa/dev/ids/paydetails/paylinks",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(async (response) => {
        console.log(JSON.stringify(response.data));
        const newPayLink = await PaymentLink.create(
          response.data["data"]["data"]
        );

        if (!newPayLink)
          return res.status(404).send({ error: "Link could not be created" });
        newPayLink.payerdetails_id = payerdetails_id;
        newPayLink.currency = currency;
        newPayLink.notification_email = notification_email;
        await newPayLink.save();
        return res.send(newPayLink).status(201);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    return res.send(500).send({ error: error.message });
  }
};

module.exports = { getPaymentLinks, verifyPaymentLink, viewLinks };
