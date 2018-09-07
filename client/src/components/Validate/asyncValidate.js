const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
  return sleep(1000) // simulate server latency
    .then(() => {
      if ([ 'admin1@email.com', 'paul', 'george', 'ringo' ].includes(values.email)) {
        // eslint-disable-next-line
        throw { email: 'That email address is taken' }
      }
    })
}

export default asyncValidate