export const testData = {
  users: {
    valid: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    invalid: {
      username: 'standard_user',
      password: 'wrong_password'
    },
    locked: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    }
  },

  checkout: {
    valid: {
      firstName: 'Cecilia',
      lastName: 'QA',
      postalCode: '7130'
    },
    withoutPostalCode: {
      firstName: 'Cecilia',
      lastName: 'QA',
      postalCode: ''
    }
  }
};