import mail from '@mailchimp/mailchimp_marketing';

const apiKey = process.env.EMAIL_APIKEY as string;
const dc = process.env.EMAIL_DC as string;

mail.setConfig({
    apiKey, server: dc
})

export default mail;