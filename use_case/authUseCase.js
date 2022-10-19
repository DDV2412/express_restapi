class authUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  Register = async (customerData) => {
    return await this.authRepository.Register(customerData);
  };

  Login = async (userName, password) => {
    return await this.authRepository.Login(userName, password);
  };
}

module.exports = authUseCase;
