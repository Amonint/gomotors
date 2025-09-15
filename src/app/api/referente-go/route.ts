import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Configurar el transporter de nodemailer para GOmotors
    const transporter = nodemailer.createTransport({
      host: "mail.gomotors.com.ec",
      port: 465,
      secure: true, // true para puerto 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Crear el contenido del correo
    const mailOptions = {
      from: `"Programa Referente GO" <${process.env.EMAIL_USER}>`,
      to: "sistemas@gomotors.com.ec",
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error al enviar el formulario" },
      { status: 500 }
    );
  }
} 