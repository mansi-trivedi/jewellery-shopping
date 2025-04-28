import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import juice from "juice";
import path from "path";
import fs from "fs";
import { CartAPIProps } from "types/cart";

export async function POST(req: Request) {
  try {
    const { name, email, orderItems, orderId, totalAmount, address } =
      await req.json();

    const templatePath = path.join(
      process.cwd(),
      "/src/components/email-template",
      "order-confirmation.html"
    );
    // generate purchased items row dynamically
    const purchasedItemsHtml = (orderItems as CartAPIProps["cartItem"][])
      ?.map(
        (item) => `
      <tr>
        <td bgcolor="#FFF" width="40" align="left" style="color:#5a5a5a;padding:10px 0 10px 0;font-family: 'Lato', Arial, Helvetica, sans-serif;font-weight:bold;font-size:14px;-webkit-font-smoothing:antialiased;line-height:1.4;">
				</td>
        <td bgcolor="#FFFFFF" align="left" style="color:#5a5a5a;padding:10px 40px 10px 40px;font-family: 'Lato', Arial, Helvetica, sans-serif;font-weight:normal;font-size:14px;-webkit-font-smoothing:antialiased;line-height:1.4;">${item.name}</td>
        <td bgcolor="#FFFFFF" align="right" style="color:#5a5a5a;padding:10px 40px 10px 40px;font-family: 'Lato', Arial, Helvetica, sans-serif;font-weight:bold;font-size:14px;-webkit-font-smoothing:antialiased;line-height:1.4;">${item.price}</td>
        	<td bgcolor="#FFF" width="40" align="left" style="color:#5a5a5a;padding:10px 0 10px 0;font-family: 'Lato', Arial, Helvetica, sans-serif;font-weight:bold;font-size:14px;-webkit-font-smoothing:antialiased;line-height:1.4;">
				</td>
      </tr>
    `
      )
      .join("");

    let htmlTemplate = fs.readFileSync(templatePath, "utf8");
    // 2. Replace variables in template
    htmlTemplate = htmlTemplate.replace("{{name}}", name);
    htmlTemplate = htmlTemplate.replace("{{email}}", email);
    htmlTemplate = htmlTemplate.replace("{{orderId}}", orderId);
    htmlTemplate = htmlTemplate.replace("{{totalAmount}}", totalAmount);
    htmlTemplate = htmlTemplate.replace("{{address}}", address);
    htmlTemplate = htmlTemplate.replace(
      "{{purchasedItems}}",
      purchasedItemsHtml
    );

    // 3. Inline CSS using Juice
    const inlinedHtml = juice(htmlTemplate);

    // Configure Nodemailer
    const transporter = nodemailer.createTransport(
      new SMTPTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    );

    // Email Options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.SMTP_RECEIPT,
      subject: "Order Placement",
      html: inlinedHtml,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
