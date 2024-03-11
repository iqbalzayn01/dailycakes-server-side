const createTokenCustomer = (customer) => {
  return {
    lastName: customer.lastName,
    CustomerId: customer._id,
    firstName: customer.firstName,
    email: customer.email,
  };
};

module.exports = { createTokenCustomer };
