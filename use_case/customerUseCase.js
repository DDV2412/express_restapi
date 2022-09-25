class customerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }

    Register = async (customerData) => {
        return await this.customerRepository.Register(customerData);
    };

    Login = async (email, password) => {
        return await this.customerRepository.Login(email, password);
    };

    GetById = async (id) => {
        return await this.customerRepository.GetById(id);
    };

    GetAll = async () => {
        return await this.customerRepository.GetAll();
    };

    DelById = async (id) => {
        return await this.customerRepository.DelById(id);
    };
}

module.exports = customerUseCase;