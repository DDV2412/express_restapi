const { fn } = require('sequelize');
const customerController = require('../controller/customerControllers');

let mockCustomerUC = {
    getAll: jest.fn().mockReturnValue({
        customer: [
            {
                id: "1234",
                name: "rangga"
            },
        ],
    })
}

const mockRequest = (body={}, query={}, params={}, use_case={}) => {
    return {
        body: body,
        query: query,
        params: params,
        ...use_case
    }
}

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
}

describe('Test Customer Controller', function() { 
    test('get All Customer',async() => {
        let req = mockRequest({},{},{}, {
            customerUC: mockCustomerUC
        });
        let res = mockResponse();
        await customerController.getAll(req, res, jest.fn());

        expect(mockCustomerUC.getAll).toBeCalledWith(req.body["role"]);
        expect(res.json).toBeCalledWith({
            succes: true,
            customer: [
                {
                    id: "1234",
                    name: "rangga"
                },
            ],
        });
    })
})

