export const devLog = (message: any, flag: any, callingModule: any) => {
  switch (flag) {
    case "s":
      console.log("\n----success-------------\n");
      console.log("\nlogged at time:::::", new Date(), "\n");
      console.log("caller:::", callingModule);
      console.log("\n");
      console.log(message);
      console.log("\n");
      break;
    case "e":
      console.log("\n----error-----------------------\n");
      console.log("\nlogged at time:::::", new Date(), "\n");
      console.log("caller:::", callingModule);
      console.log("\n");
      console.log(message);
      console.log("\n");
      break;
    default:
      console.log("\n----generic log--------------------\n");
      console.log("\nlogged at time::::::", new Date(), "\n");
      console.log("caller:::", callingModule);
      console.log("\n");
      console.log(message);
      console.log("\n");
  }
};
