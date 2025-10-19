export const whatsappMessages = {
  pricing: "Hi! I'm interested in learning more about your pricing plans and how BoostACart can help my store.",
  demo: "Hi! I'd like to get a personal demo of BoostACart to see how it can help recover my abandoned carts.",
  support: "Hi! I need help with my BoostACart setup or have some questions.",
  upgrade: "Hi! I'd like to discuss upgrading my plan and increasing my lead limits.",
  general: "Hi! I have a question about BoostACart.",
}

export const getWhatsAppLink = (phoneNumber: string, messageType: keyof typeof whatsappMessages) => {
  const message = whatsappMessages[messageType]
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}
