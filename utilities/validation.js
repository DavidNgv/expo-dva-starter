export default validation = {
  email: {
    presence: {
      message: '^Please enter an email address'
    },
    format: {
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: '^Please enter a valid email address'
    }
  },

  password: {
    presence: {
      message: '^Please enter a password'
    },
    length: {
      minimum: 5,
      message: '^Your password must be at least 5 characters'
    }
  }
}