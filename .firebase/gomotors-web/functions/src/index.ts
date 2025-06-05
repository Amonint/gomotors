import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

interface ReferralData {
  referrerName: string;
  referrerLastName: string;
  referrerId: string;
  referrerPhone: string;
  referrerEmail: string;
  referredName: string;
  referredLastName: string;
  referredPhone: string;
  referredOccupation: string;
}

export const sendReferralEmail = functions.https.onRequest(async (req, res) => {
  // Configurar CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Manejar preflight requests
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  // Solo permitir POST
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const data = req.body as ReferralData;

    // Configurar el transporter de nodemailer para GOmotors
    const transporter = nodemailer.createTransport({
      host: "mail.gomotors.com.ec",
      port: 465,
      secure: true,
      auth: {
        user: functions.config().email.user,
        pass: functions.config().email.pass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Crear el contenido del correo
    const mailOptions = {
      from: `"Programa Referente GO" <${functions.config().email.user}>`,
      to: "paulayala@gomotors.com.ec",
      subject: "Nuevo referido - Programa Referente GO",
      html: `
        <h2>Nuevo referido registrado</h2>
        
        <h3>Datos del referido:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${data.referrerName} ${data.referrerLastName}</li>
          <li><strong>C.I.:</strong> ${data.referrerId}</li>
          <li><strong>Teléfono:</strong> ${data.referrerPhone}</li>
          <li><strong>Correo:</strong> ${data.referrerEmail}</li>
        </ul>

        <h3>Datos de la persona referida:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${data.referredName} ${data.referredLastName}</li>
          <li><strong>Teléfono:</strong> ${data.referredPhone}</li>
          <li><strong>Ocupación:</strong> ${data.referredOccupation}</li>
        </ul>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error al enviar el formulario" });
  }
}); 