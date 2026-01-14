
export const sendToWhatsApp = (formData) => {
  const phoneNumber = "1234567890";

  const message = `
New Contact Form Message:

First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}
  `;

  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
};

// enquiry message
export const sendEnquiryMessage = () => {
  const phoneNumber = "12345677890";

  const message = "I would like to know more about Cryptonite";
  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
};
