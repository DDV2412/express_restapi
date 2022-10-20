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

  ForgotPassword = async (email) => {
    return await this.authRepository.ForgotPassword(email);
  };

  ResetPass = async (token, email, password) => {
    return await this.authRepository.ResetPass(token, email, password);
  };

  VerifyEmail = async (email) => {
    return await this.authRepository.VerifyEmail(email);
  };
}

module.exports = authUseCase;
