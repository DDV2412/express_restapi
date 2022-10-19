module.exports = {

    '/api/order/addOrders': {
        post: {
            tags: ['order'],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                status: {
                                    type: 'string',
                                    default: 'rejected',
                                    format: 'enum',
                                    enum: ['approved', 'rejected']
                                },
                                payment_method: {
                                    type: 'string',
                                    format: 'enum',
                                    enum: ['cash', 'credit']
                                },
                                confirm_payment: {
                                    type: 'string',
                                    format: 'enum',
                                    enum: ['Next', 'Cancel']
                                },
                                amount: {
                                    type: 'string',
                                },
                                cartID: {
                                    type: 'string'
                                }
                            },
                            required: ['cartID', 'amount', 'status', 'payment_method', 'confirm_payment'],
                        },
                    }
                }
            },
            responses: {
                201: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            example: {
                                status: '201',
                                message: 'Added order is successfully',
                                
                            }
                        }
                    }
                },
                401: {
                    description: 'Order not found',
                    content: {
                        'application/json': {
                            example: {
                                status: '401',
                                message: 'Order not found',
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            example: {
                                status: '500 || error',
                                message: 'Internal Server Error while adding order data',
                            }
                        }
                    }
                }
            }
        }
    },    
   
    '/api/order/orders/{id}': {
        get: {
            tags: ['order'],
            summary: 'Get order by id',
            description: 'Get order by id',
            operationId: 'getOrderById',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID of order that needs to be fetched',
                    required: true,
                    schema : {
                        type: 'string',
                        format: 'uuid',
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Orders'
                            }  
                        }
                    }
                },
                401: {
                    description: 'Order not found',
                    content: {
                        'application/json': {
                            example: {
                                status: 401,
                                error: {
                                    message: "Order not found",
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            example: {
                                status: '500',
                                msg: 'Internal Server Error while getting order data',
                            }
                        }
                    }
                }
            },
        },

        put: {
            tags: ['order'],
            summary: 'Update order by id',
            description: 'Update order by id',
            operationId: 'updateOrderById',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID of order that needs to be updated',
                    required: true,
                    schema : {
                        type: 'string',
                        format: 'uuid',
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                status: {
                                    type: 'string',
                                    default: 'rejected',
                                    format: 'enum',
                                    enum: ['approved', 'rejected']
                                },
                                payment_method: {
                                    type: 'string',
                                    format: 'enum',
                                    enum: ['cash', 'credit']
                                },
                                confirm_payment: {
                                    type: 'string',
                                    format: 'enum',
                                    enum: ['Next', 'Cancel']
                                },
                                amount: {
                                    type: 'string',
                                },
                                cartID: {
                                    type: 'string'
                                }
                            },
                            required: ['cartID', 'amount', 'status', 'payment_method', 'confirm_payment'],
                            
                        }
                    }
                }
            },
            responses: {
                203: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            example: {
                                status : '203',
                                message: 'Order updated successfully',
                            }
                        }
                    }
                },
                404: {
                    description: 'Not Found',
                    content: {
                        'application/json': {
                            example: {
                                status: '404',
                                message: "Cannot find Order with id 6f0c8067-c045-4c3c-b10f-fe8e12fb52cd."
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            example: {
                                status: '500',
                                message: 'Internal Server Error while updating order data',
                            }
                        }
                    }
                }
            },
        },

        delete: {
            tags: ['order'],
            summary: 'Delete order by id',
            description: 'Delete order by id',
            operationId: 'deleteOrder',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Order id',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'uuid',
                    }
                }
            ],
            responses: {
                204: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            example: {
                                status: '204',
                                message: 'Order deleted successfully',
                            }
                        }
                    }
                },
                404: {
                    description: 'Not Found',
                    content: {
                        'application/json': {
                            example: {
                                status: '404',
                                message: 'Cannot find Order with id 6f0c8067-c045-4c3c-b10f-fe8e12fb52cd.'
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            example: {
                                status: '500',
                                msg: 'Internal Server Error while deleting order data',
                            }
                        }
                    }
                }
            },
        }
    },
}


            
