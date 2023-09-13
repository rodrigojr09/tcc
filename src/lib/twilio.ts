import Twilio from 'twilio';
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = Twilio(accountSid,authToken)

export default client;