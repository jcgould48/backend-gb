const getUniqueErrorMessage = (err) => {
    let output;
    try{
        let errMessage = err.message
        let firstQ= err.message.indexOf('"')
        let lastQ = err.message.indexOf('}')
        console.log(errMessage.slice((firstQ)+1,(lastQ)-2))
        errMessage = `${errMessage.slice((firstQ)+1,(lastQ)-2)} already exists`
        console.log(errMessage)
        output = errMessage
    }catch(e){
        console.log(e)
    }
    return output
};
const getErrorMessage = (err) => {
  let message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "something went wrong";
    }
  } else if (err.message) {
    return err.message;
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }
  return message;
};
module.exports = getErrorMessage;