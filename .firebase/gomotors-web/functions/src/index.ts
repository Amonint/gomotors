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

interface ContratacionData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  cv: string; // Base64 encoded PDF
}

interface DataProtectionData {
  name: string;
  lastName: string;
  id: string;
  phone: string;
  email: string;
  restrictions: {
    offers: boolean;
    surveys: boolean;
    maintenance: boolean;
    newProducts: boolean;
    all: boolean;
  };
}

interface CotizacionData {
  nombreCompleto: string;
  telefono: string;
  ciudad: string;
  marcaInteres: string;
  segmento: string;
  formaPago: string;
  comentario: string;
  aceptaTerminos: boolean;
}

interface DataCollectionData {
  nombres: string;
  email: string;
  cedulaPasaporte: string;
  telefono: string;
  ciudad: string;
  asesor: string;
  razon: string;
  comentario: string;
  aceptaPoliticas: boolean;
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
      from: `"referente-go" <${functions.config().email.user}>`,
      to: "marketingomo@gomotors.com.ec",
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

export const sendContratacionEmail = functions.https.onRequest(async (req, res) => {
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
    const data = req.body as ContratacionData;

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

    // Crear el contenido del correo con el CV adjunto
    const mailOptions = {
      from: `"Contratación GOmotors" <${functions.config().email.user}>`,
      to: "marketingomo@gomotors.com.ec",
      subject: `Nueva solicitud de empleo - ${data.position}`,
      html: `
        <h2>Nueva solicitud de empleo</h2>
        
        <h3>Datos del candidato:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${data.name} ${data.lastName}</li>
          <li><strong>Correo:</strong> ${data.email}</li>
          <li><strong>Teléfono:</strong> ${data.phone}</li>
          <li><strong>Puesto al que aplica:</strong> ${data.position}</li>
          ${data.message ? `<li><strong>Mensaje:</strong> ${data.message}</li>` : ''}
        </ul>
      `,
      attachments: data.cv ? [{
        filename: `CV_${data.name}_${data.lastName}.pdf`,
        content: data.cv,
        encoding: 'base64'
      }] : []
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending contratacion email:", error);
    res.status(500).json({ error: "Error al enviar el formulario de contratación" });
  }
});

export const sendDataProtectionEmail = functions.https.onRequest(async (req, res) => {
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
    const data = req.body as DataProtectionData;

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

    // Crear lista de restricciones
    const restrictions = [];
    if (data.restrictions.offers) restrictions.push("Ofertas y promociones");
    if (data.restrictions.surveys) restrictions.push("Encuestas de satisfacción");
    if (data.restrictions.maintenance) restrictions.push("Recordatorios de mantenimiento");
    if (data.restrictions.newProducts) restrictions.push("Nuevos productos y servicios");
    if (data.restrictions.all) restrictions.push("Todas las comunicaciones");

    // Crear el contenido del correo
    const mailOptions = {
      from: `"Protección de Datos GOmotors" <${functions.config().email.user}>`,
      to: "marketingomo@gomotors.com.ec",
      subject: "Solicitud de baja de datos personales",
      html: `
        <h2>Solicitud de baja de datos personales</h2>
        
        <h3>Datos del solicitante:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${data.name} ${data.lastName}</li>
          <li><strong>C.I.:</strong> ${data.id}</li>
          <li><strong>Teléfono:</strong> ${data.phone}</li>
          <li><strong>Correo:</strong> ${data.email}</li>
        </ul>

        <h3>Restricciones solicitadas:</h3>
        <ul>
          ${restrictions.map(restriction => `<li>${restriction}</li>`).join('')}
        </ul>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending data protection email:", error);
    res.status(500).json({ error: "Error al enviar la solicitud de protección de datos" });
  }
});

export const sendCotizacionEmail = functions.https.onRequest(async (req, res) => {
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
    const data = req.body as CotizacionData;

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
      from: `"Cotización GOmotors" <${functions.config().email.user}>`,
      to: "marketingomo@gomotors.com.ec",
      subject: "Nueva solicitud de cotización de vehículo",
      html: `
        <h2>Nueva solicitud de cotización</h2>
        
        <h3>Datos del cliente:</h3>
        <ul>
          <li><strong>Nombre completo:</strong> ${data.nombreCompleto}</li>
          <li><strong>Teléfono:</strong> ${data.telefono}</li>
          <li><strong>Ciudad:</strong> ${data.ciudad}</li>
        </ul>

        <h3>Interés en vehículo:</h3>
        <ul>
          <li><strong>Marca de interés:</strong> ${data.marcaInteres}</li>
          <li><strong>Segmento:</strong> ${data.segmento}</li>
          <li><strong>Forma de pago:</strong> ${data.formaPago || 'No especificado'}</li>
        </ul>

        ${data.comentario ? `
        <h3>Comentario adicional:</h3>
        <p>${data.comentario}</p>
        ` : ''}

        <p><em>Este cliente ha aceptado los términos y condiciones para recibir información sobre productos y servicios.</em></p>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending cotizacion email:", error);
    res.status(500).json({ error: "Error al enviar la solicitud de cotización" });
  }
});

export const sendDataCollectionEmail = functions.https.onRequest(async (req, res) => {
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
    const data = req.body as DataCollectionData;

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
      from: `"Recolección de Datos GOmotors" <${functions.config().email.user}>`,
      to: "marketingomo@gomotors.com.ec",
      subject: "Nueva solicitud de recolección de datos",
      html: `
        <h2>Nueva solicitud de recolección de datos</h2>

        <h3>Datos del solicitante:</h3>
        <ul>
          <li><strong>Nombres:</strong> ${data.nombres}</li>
          <li><strong>Correo electrónico:</strong> ${data.email}</li>
          <li><strong>Cédula/Pasaporte:</strong> ${data.cedulaPasaporte}</li>
          <li><strong>Teléfono:</strong> ${data.telefono}</li>
          <li><strong>Ciudad:</strong> ${data.ciudad}</li>
          <li><strong>Asesor asignado:</strong> ${data.asesor}</li>
          <li><strong>Razón de consulta:</strong> ${data.razon}</li>
        </ul>

        ${data.comentario ? `
        <h3>Comentario adicional:</h3>
        <p>${data.comentario}</p>
        ` : ''}

        <h3>Acuerdos legales:</h3>
        <ul>
          <li><strong>Acepta políticas de uso de datos:</strong> ${data.aceptaPoliticas ? 'Sí' : 'No'}</li>
        </ul>

        <p><em>Esta solicitud fue enviada desde el formulario de recolección de datos de GOmotors.</em></p>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending data collection email:", error);
    res.status(500).json({ error: "Error al enviar la solicitud de recolección de datos" });
  }
}); 