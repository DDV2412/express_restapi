class cusAddressUseCase {
  constructor(custAddressRepository) {
    this.custAddressRepository = custAddressRepository;
  }

  FindAll = async (customer_id) => {
    return await this.custAddressRepository.FindAll(customer_id);
  };

  FindById = async (id) => {
    return await this.custAddressRepository.FindById(id);
  };

  Create = async (addressData) => {
    return await this.custAddressRepository.Create(addressData);
  };

  Update = async (addressData, id) => {
    return await this.custAddressRepository.Update(addressData, id);
  };

  Delete = async (id) => {
    return await this.custAddressRepository.Delete(id);
  };
}

module.exports = cusAddressUseCase;
