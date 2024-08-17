const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
    id: String,
    registered_by: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const PayerDetailSchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business"
    },
    id: String,
    org_id: String,
    pay_type_main: String,
    pay_type: String,
    pay_detail_1: String,
    pay_detail_2: String
});

const PaymentLinkSchema = new mongoose.Schema({
    id: String,
    call_back_url: String,
    name: String,
    short_code: String,
    api_key: String,
    account_number: String,
    org_id: String,
    link_mode: String,
    payerdetails_id: String,
    currency: String,
    notification_email: String,
    link_status: Number,
    link_id: String,
})

const Business = mongoose.model("Business", BusinessSchema);
const PayerDetail = mongoose.model("PayerDetail", PayerDetailSchema);
const PaymentLink = mongoose.model("PaymentLink", PaymentLinkSchema);

module.exports = { Business, PayerDetail, PaymentLink }