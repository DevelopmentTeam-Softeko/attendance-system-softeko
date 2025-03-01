import { NextResponse } from "next/server";
import { EMAIL_USER } from "@/utils/constants";
import { sendEmailWithNodemailer } from "@/lib/emails";

export const POST = async (request: Request) => {
  const { email }: { email: string } = await request.json();

  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  try {
    const emailData = {
      from: EMAIL_USER,
      to: email,
      subject: "Reset Password Verification Code for Attendance System",
      html: `<html>
            <head>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        color: #333;
                    }}
                    .container {{
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }}
                    h4 {{
                        font-size: 1.2em;
                        margin-bottom: 20px;
                        color: #333;
                    }}
                    h3 {{
                        font-size: 2em;
                        margin-bottom: 20px;
                        color: #007BFF;
                    }}
                    p {{
                        font-size: 1em;
                        color: #666;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Greetings! ${email}</h2>
                    <h3>Use the following code to verify your email address and complete the reset password process. </h3>
                    <h3>${randomNumber}</h3>
                    <p>This code will be valid for 60 minutes.</p>
                    <p>If you didn't initiate this action or if you think you received this email by mistake, please contact</p>
                    <p style= "color:blue, font-wight:600">support@onlinegradecalculator.org</p>
                    <hr />
                    <p>Regards,</p>
                    <p style="font-size:17px;font-weight:600">Online Grade Calculator Team</p>
                </div>
            </body>
            </html>
                      `,
    };
    sendEmailWithNodemailer(emailData);
    return NextResponse.json({
      message: "Reset password verification code sent successfully",

      number: randomNumber,
      status: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
      status: 500,
      msg: "catch error",
    });
  }
};
