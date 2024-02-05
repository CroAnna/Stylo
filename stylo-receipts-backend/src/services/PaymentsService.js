const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const publishableKey = "pk_test_51OYt9KJFdGhTPPB09zQdYSEWqi9ZKmkxxPeheh9OTs22R0CCXLosuXGsp2Yp2pt28G33i8GoIezV3tUNmwydVevW005tgmc80X";

async function createPaymentSession(totalAmount) {
    try {
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2023-10-16'}
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'eur',
            customer: customer.id,
          });
          

        return {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: publishableKey
        };

    }catch (err) {
        console.error(err);
        throw err;
    }
}

async function createWebPaymentSession(products) {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: products.map(item => {
                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            mode: 'payment',
            success_url: `http://localhost:${process.env.CLIENT_PORT}/success`,
            cancel_url: `http://localhost:${process.env.CLIENT_PORT}/cancel`
        });
    
        console.log(session.url);
        return session.url;
    }
    catch(err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    createPaymentSession,
    createWebPaymentSession
}