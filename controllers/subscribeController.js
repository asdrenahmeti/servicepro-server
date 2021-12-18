const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sequelize = require("./../db/db_connection");
const { transaction } = require("../db/db_connection");
const modUser = require("./../models/User")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


exports.getCheckoutSession = catchAsync(async(req, res, next) => {
    // const user = await modUser.findOne({
    //     where:{
    //         id: req.user.id
    //     }
    // })

    const session = await stripe.checkout.session.create({
        payment_method_types:['card'],
        success_url: `localhost:3000/subscribe/success`,
        cancel_url: `localhost:3000/subscribe/fail`,
        customer_email: req.user.email,
        client_reference_id: req.user.id,
        line_items: [
            {
                name: req.user.name,
                description: "Subscribe for one month",
                amount: 2000,
                currency: 'eur',
                quantity:1
            }
        ]
    })
    res.status(200).json({
        status: "success",
        session
    })
});
