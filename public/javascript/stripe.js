/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51J7szLLdfwfgNXuj1FsUV7f6nbeVIkkggNQ2jhpGD60U5ex8VyfKckx8noy2V0zkxnXv6tkqFtYYFhX6WLrAbhUG00kjuHgEFt'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
