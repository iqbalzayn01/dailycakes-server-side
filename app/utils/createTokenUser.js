const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    email: user.email,
    // organizer: user.organizer,
  };
};

const createTokenCustomer = (Customer) => {
  return {
    lastName: Customer.lastName,
    CustomerId: Customer._id,
    firstName: Customer.firstName,
    email: Customer.email,
  };
};

module.exports = { createTokenUser, createTokenCustomer };
