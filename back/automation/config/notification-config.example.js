export default {
  telegram_bot: {
    name: "arny_bot",
    token: "bot_token",
    notifier: {
      token: "bot_notifier_token"
    },
    user: {
      0: {
        name: "Name1",
        id: "1234567"
      },
      1: {
        name: "Name2",
        id: "123456789"
      }
    }
  },
  sms: {
    token: "XXX-XXX-XXX",
    url: "https://some.api",
    user: {
      0: {
        name: "Name1",
        phone: "1234567"
      },
      1: {
        name: "Name2",
        phone: "123456789"
      }
    }
  }
}
