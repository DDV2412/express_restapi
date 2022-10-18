class customerUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }
  GetById = async (id) => {
    return await this.customerRepository.GetById(id);
  };

  GetAll = async (page, size, filters) => {
    return await this.customerRepository.GetAll(page, size, filters);
  };

  DelById = async (id) => {
    return await this.customerRepository.DelById(id);
  };

  UpdatePass = async (password, id) => {
    return await this.customerRepository.UpdatePass(password, id);
  };

  UpdateProfile = async (profile, id) => {
    return await this.customerRepository.UpdateProfile(profile, id);
  };
}

module.exports = customerUseCase;
