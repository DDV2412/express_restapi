function errorHandler (err, req, res, next) {
    console.log (err.message);
    let message = 'Internal server error';
    let status = 500;

    if (err.name === 'ValidationError') {
        message = err.message;
        status = 400;
    }

    else if (err.error === "Email is already exist") {
        status = 400;
        message = "Email is already exist";
    }

    else if (err.error === "password is incorrect") {
        status = 401;
        message = "password is incorrect, please try again";
    }

    else if (err.error === "Email is incorrect") {
        status = 401;
        message = "Email is incorrect, please try again";
    }

    else if (err.error === "Cannot find Order with id") {
        status = 404;
        message = "Cannot find Order with id ";
    }

    else if (err.error === "Quantity is number only") {
        status = 400;
        message = "qty is not a number";
    }

    else if (err.error === "Unauthorized") {
        status = 401;
        if (err.authType === "admin") message= "Unauthorized. Only admin can access this endpoint.";
        else if (err.authType === "seller") message= "Unauthorized. Only seller can access this endpoint.";
        else if (err.authType === "customer") message= "Unauthorized. Only customer can access this endpoint.";
    }

    else if (err.error === 'column "photo" of relation "Items" does not exist') {
        status = 400;
        message = 'There is no column "photo" in table "Items"';
    }

    else if (err.error === "Bad Request") {
        status = 400;
        message = "Bad request 400 - Invalid request body";
    }

    else if (err.error === "request entity too large") {
        status = 413;
        message = "File is too large";
    }
    else if (err.message === 'Unsupport file format') {
        status = 400;
        message = `Unsupport file format. Can only accept ${err.support} format.`;
      }
    
      else if (err.message === 'File cannot be empty') {
        status = 400;
        message = `File cannot be empty. Required minimal 1 file.`;
      }
    
      else if (err.message === 'Field value too long') {
        status = 400;
        message = `Max accumulation files size is 500Kb.`;
      }
    
      else if (err.message === 'File too large') {
        status = 400;
        message = `Max file size is 500Kb.`;
      }
    
      else if (err.error === 'Null Value Constraint') {
        status = 400;
        message = `Please kindly check your input. ${err.attribute} cannot be null.`;
      }
    
      else if (err.error === 'Invalid Type') {
        status = 400;
        message = `Invalid type. ${err.attribute} should be a ${err.requiredType}.`;
      }
    
      else if (err.error === 'Min Value Constraint') {
        status = 400;
        message = `Please kindly check your input. ${err.attribute} should not less than ${err.min} character${err.min > 1 ? 's' : ''}.`;
      }
    
      else if (err.error === 'Max Value Constraint') {
        status = 400;
        message = `Please kindly check your input. ${err.attribute} should not more than ${err.max} character${err.max > 1 ? 's' : ''}.`;
      }

      else if (err.error === 'File cannot be empty') {
        status = 400;
        message = `File cannot be empty. Required minimal 1 file.`;
      }

      else if (err.error === 'upload is not defined') {
        status = 400;
        message = `upload is not defined.`;
      }

      else if (err.error === 'undefined') {
        status = 400;
        message = `TypeError: Cannot read properties of undefined (reading 'id')`;
      }

      else if (err.error === 'Unexpected field') {
        status = 400;
        message = `Unexpected field. ${err.attribute} is not allowed.`;
      }

      else if (err.error === 'field is not defined') {
        status = 400;
        message = `field is not defined.`;
      }

      else if (err.error === 'Item cannot be found') {
        status = 404;
        message = `Item with id ${id} cannot be found.`;
      }

      else if (err.error === "Error retrieving") {
        status = 500;
        if (err.authType === "order") message= "Error retrieving Order with id = " + id;
        else if (err.authType === "item") message= "Error retrieving Item with id = " + id;
    }

      else if (err.error === 'Item already exists.') {
        status = 400;
        message = `Item already exists.`;
      }

      else if (err.error === 'Cannot find item with id') {
        status = 404;
        message = `Cannot find item with id ${id}.`;
      }

      else if (err.error === 'Cannot find Order with id') {
        status = 404;
        message = `Cannot find Order with id ${id}.`;
      }

      else if (err.error === "Cannot find Order with customer_id ") {
        status = 404;
        message = `Cannot find Order with customer_id ${customer_id}`;
      }

      else if (err.error === "customer_id or item_id is incorrect") {
        status = 400;
        message = "customer_id or item_id is incorrect";
      }

      else if (err.error === "Cannot find Customer or Item with id") {
        status = 404;
        message = `Cannot find Customer or Item with id ${id}.`;
      }



    return res.status(status).json({
        status: status,
        error: {
            message
        }
    });
}

module.exports = errorHandler;
