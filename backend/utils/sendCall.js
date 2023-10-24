// const axios = require('axios'); // You can use Axios to make HTTP requests
// const sendCall = async (options) => {
//   try {
//     // Set your Exotel credentials and parameters
//     const exotelSid = process.env.EXOTEL_SID;
//     const exotelToken = process.env.EXOTEL_TOKEN;
//     const exotelNumber = process.env.EXOTEL_PHONE_NUMBER; // Your Exotel phone number
//     const recipientNumber = options.number; // The recipient's phone number
//     const message = options.message;

//     // Construct the URL for making a call using Exotel's API
//     const exotelApiUrl = `https://api.exotel.in/v1/Accounts/${exotelSid}/Calls/connect.json`;
//     const callData = {
//       From: exotelNumber,
//       To: recipientNumber,
//       CallerId: exotelNumber,
//       Url: `http://yourwebhookurl.com`, // Replace with your webhook URL for call handling
//     };

//     // Send the call request to Exotel
//     const response = await axios.post(exotelApiUrl, callData, {
//       auth: {
//         username: exotelSid,
//         password: exotelToken,
//       },
//     });``

//     // Check the response for success or handle any errors
//     if (response.status === 200) {
//       console.log('Call request sent successfully');
//     } else {
//       console.error('Error sending call request:', response.data);
//     }
//   } catch (error) {
//     console.error('Error sending call:', error);
//   }
// };

// module.exports = sendCall;
