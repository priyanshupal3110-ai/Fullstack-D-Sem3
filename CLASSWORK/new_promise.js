//function GetData(dataId) {
const Getpromise = () => {
    return new Promise((resolve, reject) => {
//      setTimeout(() => {
            console.log("i m a promise");
            resolve("successful");
        //  resolve("data fetched");
        //}, 1000);
 
        reject("network error");
        });
    };
    let promise = Getpromise();
    promise.then (() => {
        console.log(" promise is fulfilled");
    })