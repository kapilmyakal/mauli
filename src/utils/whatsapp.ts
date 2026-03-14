import { CartItem } from '../components/Cart';

const WHATSAPP_NUMBER = '919665655595';

export function sendOrderToWhatsApp(items: CartItem[]) {

  const orderDetails = items
    .map((item, index) => {
      const subtotal = item.product.price * item.quantity;
      return `${index + 1}. ${item.product.name} × ${item.quantity}  = ₹${subtotal}`;
    })
    .join('\n');

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const message = `*New Order - Mauli Mart*

Hello,

I would like to place the following order:

${orderDetails}

━━━━━━━━━━━━━━━━
*Total Items:* ${totalItems}
*Total Amount:* ₹${totalPrice}
━━━━━━━━━━━━━━━━

Courier charges will apply based on delivery location.

Please confirm the order and share payment details.

Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}