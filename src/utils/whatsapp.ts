import { CartItem } from '../components/Cart';

const WHATSAPP_NUMBER = '919665655595';

export function sendOrderToWhatsApp(items: CartItem[]) {
  const orderDetails = items.map((item, index) =>
    `${index + 1}. ${item.product.name}\n   Qty: ${item.quantity}\n   Price: ₹${item.product.price}\n   Subtotal: ₹${item.product.price * item.quantity}`
  ).join('\n\n');

  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const message = `*New Order from Mauli Mart*\n\n${orderDetails}\n\n━━━━━━━━━━━━━━━━\n*Total Items:* ${totalItems}\n*Total Amount:* ₹${totalPrice}\n━━━━━━━━━━━━━━━━\n\nPlease confirm my order. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  console.log("encodemsg",encodedMessage)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  console.log("whatsappUrl",whatsappUrl)

  window.open(whatsappUrl, '_blank');
}
