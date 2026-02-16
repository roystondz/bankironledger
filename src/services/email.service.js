const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user:process.env.EMAIL_USER,
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken:process.env.REFRESH_TOKEN,
        
    },
});

transporter.verify((error,success)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Transporter is ready to send emails");
    }
})

const sendMail = async(to,subject,text,html)=>{
    try {
        const info = await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        })
        
        console.log("Message sent: %s",info.messageId);
        console.log("Preview URL: %s",nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error);
    }
}

async function sendRegistrationMail(userEmail,name){
    const subject = "Welcome to our platform";
    const text = "Thank you for registering with our platform";
    const html = `<h1>Thank you ${name} for registering with our platform</h1>`;
    await sendMail(userEmail,subject,text,html);
}

async function sendTransactionMail(userEmail,name,amount,toAccount){
    const subject = "Transaction completed";
    const text = `Your transaction of $${amount} to account ${toAccount} has been completed`;
    const html = `<h1>Your transaction of $${amount} to account ${toAccount} has been completed</h1>`;
    await sendMail(userEmail,subject,text,html);
}

async function sendTransactionFailedMail(userEmail,name,amount,toAccount){
    const subject = "Transaction failed";
    const text = `Your transaction of $${amount} to account ${toAccount} has failed`;
    const html = `<h1>Your transaction of $${amount} to account ${toAccount} has failed</h1>`;
    await sendMail(userEmail,subject,text,html);
}

module.exports = {sendRegistrationMail,sendTransactionMail,sendTransactionFailedMail};