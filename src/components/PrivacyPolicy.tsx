"use client";

import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="w-full bg-[#F5F5F5] border-b border-neutral-300">
        <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-16 lg:py-20">
          <div className="absolute top-8 left-8">
            <Link
              href="/"
              className="flex items-center text-white bg-black px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
            >
              <FaArrowLeft className="mr-2 text-white" /> Volver
            </Link>
          </div>

          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-normal text-neutral-800 mt-2">
                Política de Privacidad
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 prose prose-lg">
            <section>
              <p className="text-neutral-600 mb-4">
                El Titular le informa sobre su Política de Privacidad respecto del tratamiento y protección de los datos de carácter personal de los usuarios que puedan ser recabados durante la navegación a través del Sitio Web: https://www.gomotors.com.ec
              </p>
              <p className="text-neutral-600 mb-4">
                En este sentido, el Titular cumple con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas (RGPD).
              </p>
              <p className="text-neutral-600 mb-8">
                El uso de sitio Web implica la aceptación de esta Política de Privacidad así como las condiciones incluidas en el{" "}
                <Link href="/aviso-legal" className="text-black hover:text-neutral-600 transition-colors">
                  Aviso Legal
                </Link>{" "}
                y nuestra{" "}
                <Link href="/cookies" className="text-black hover:text-neutral-600 transition-colors">
                  Política de Cookies
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Quiénes somos
              </h2>
              <p className="text-neutral-600 mb-8">
                La empresa IOMOTORS S.A., entendiendo la importancia de una adecuada gestión de la información y de conformidad con la Ley Orgánica de Protección de Datos Personales, informa que, para brindar servicios relacionados a su objeto social, utiliza información personal de socios y clientes, la cual es utilizada de manera segura, responsable y acorde a los reglamentos y legislación vigente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Identidad del Responsable
              </h2>
              <ul className="list-none p-0 text-neutral-600">
                <li className="mb-2"><strong>Responsable:</strong> IOMOTORS S.A.</li>
                <li className="mb-2"><strong>Domicilio:</strong> Avenida 8 de diciembre S/N y Avenida Isidro Ayora., Loja - Ecuador.</li>
                <li className="mb-2"><strong>Correo electrónico:</strong> sistemas@gomotors.com.ec</li>
                <li className="mb-2"><strong>Teléfono de contacto:</strong> 072731143</li>
                <li className="mb-2"><strong>Sitio Web:</strong> https://www.gomotors.com.ec</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Principios aplicados en el tratamiento de datos
              </h2>
              <p className="text-neutral-600 mb-4">
                En el tratamiento de sus datos personales, el Titular aplicará los siguientes principios que se ajustan a las exigencias del nuevo reglamento europeo de protección de datos (RGPD):
              </p>
              <ul className="list-disc pl-6 text-neutral-600">
                <li className="mb-4">
                  <strong>Principio de licitud, lealtad y transparencia:</strong> El Titular siempre requerirá el consentimiento para el tratamiento de los datos personales que puede ser para uno o varios fines específicos sobre los que el Titular informará al Usuario previamente con absoluta transparencia.
                </li>
                <li className="mb-4">
                  <strong>Principio de minimización de datos:</strong> El Titular solicitará solo los datos estrictamente necesarios para el fin o los fines que los solicita.
                </li>
                <li className="mb-4">
                  <strong>Principio de limitación del plazo de conservación:</strong> El Titular mantendrá los datos personales recabados durante el tiempo estrictamente necesario para el fin o los fines del tratamiento. El Titular informará al Usuario del plazo de conservación correspondiente según la finalidad.
                  <br />
                  En el caso de suscripciones, el Titular revisará periódicamente las listas y eliminará aquellos registros inactivos durante un tiempo considerable.
                </li>
                <li className="mb-4">
                  <strong>Principio de integridad y confidencialidad:</strong> Los datos personales recabados serán tratados de tal manera que su seguridad, confidencialidad e integridad está garantizada.
                  <br />
                  El Titular toma las precauciones necesarias para evitar el acceso no autorizado o uso indebido de los datos de sus usuarios por parte de terceros.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Obtención de datos personales
              </h2>
              <p className="text-neutral-600 mb-4">
                Para navegar por el sitio Web no es necesario que facilite ningún dato personal.
              </p>
              <p className="text-neutral-600 mb-4">
                Los casos en los que usted sí proporciona sus datos personales son los siguientes:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 mb-8">
                <li className="mb-2">Al contactar a través de los formularios de contacto o enviar un correo electrónico.</li>
                <li className="mb-2">Al realizar un comentario en un artículo o en una página.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Derechos
              </h2>
              <p className="text-neutral-600 mb-4">
                El Titular le informa que sobre sus datos personales tiene derecho a:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 mb-8">
                <li className="mb-2">Solicitar el acceso a los datos almacenados.</li>
                <li className="mb-2">Solicitar una rectificación o la supresión.</li>
                <li className="mb-2">Solicitar la limitación de su tratamiento.</li>
                <li className="mb-2">Oponerse al tratamiento.</li>
                <li className="mb-2">No puede ejercitar el derecho a la portabilidad de los datos.</li>
              </ul>

              <p className="text-neutral-600 mb-4">
                El ejercicio de estos derechos es personal y por tanto debe ser ejercido directamente por el interesado, solicitándolo directamente al Titular, lo que significa que cualquier cliente, suscriptor o colaborador que haya facilitado sus datos en algún momento, puede dirigirse al Titular y pedir información sobre los datos que tiene almacenados y cómo los ha obtenido, solicitar la rectificación de los mismos, oponerse al tratamiento, limitar su uso o solicitar la supresión de esos datos en los ficheros del Titular.
              </p>

              <p className="text-neutral-600 mb-4">
                Para ejercitar sus derechos tiene que enviar su petición junto con una fotocopia del Documento Nacional de Identidad o equivalente a la dirección de correo electrónico: sistemas@gomotors.com.ec
              </p>

              <p className="text-neutral-600 mb-8">
                El ejercicio de estos derechos no incluye ningún dato que el Titular esté obligado a conservar con fines administrativos, legales o de seguridad.
              </p>

              <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                <p className="text-neutral-600 mb-4">
                  Para ejercer cualquiera de estos derechos, puede utilizar nuestro{" "}
                  <Link 
                    href="/baja-datos" 
                    className="text-black font-medium hover:text-neutral-600 transition-colors"
                  >
                    formulario de baja de datos
                  </Link>{" "}
                  o contactarnos directamente a través de sistemas@gomotors.com.ec
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Finalidad del tratamiento de datos personales
              </h2>
              <p className="text-neutral-600 mb-4">
                Cuando usted se conecta al Sitio Web para mandar un correo al Titular, escribe un comentario en un artículo o una página, se suscribe a su boletín está facilitando información de carácter personal de la que el responsable es el Titular. Esta información puede incluir datos de carácter personal como pueden ser su dirección IP, nombre y apellidos, dirección física, dirección de correo electrónico, número de teléfono, y otra información. Al facilitar esta información, da su consentimiento para que su información sea recopilada, utilizada, gestionada y almacenada por — IOMOTORS S.A — sólo como se describe en las páginas:
              </p>
              <ul className="list-none pl-0 text-neutral-600 mb-8">
                <li className="mb-2">
                  <Link href="/aviso-legal" className="text-black hover:text-neutral-600 transition-colors">
                    Aviso Legal
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/proteccion-datos" className="text-black hover:text-neutral-600 transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>

              <h3 className="text-lg font-medium text-neutral-800 mt-8 mb-4">
                Los datos personales y la finalidad del tratamiento por parte del Titular es diferente según el sistema de captura de información:
              </h3>
              <ul className="list-disc pl-6 text-neutral-600 mb-8">
                <li className="mb-4">
                  <strong>Formularios de contacto:</strong> El Titular solicita datos personales entre los que pueden estar: nombre y apellidos, dirección de correo electrónico, número de teléfono y dirección de sitio web con la finalidad de responder las consultas de los Usuarios.
                  <br />
                  Por ejemplo, el Titular utiliza esos datos para dar respuesta a mensajes, dudas, quejas, comentarios o inquietudes que pueden tener los Usuarios relativas a la información incluida en el sitio Web, el tratamiento de los datos personales, cuestiones referentes a los textos legales incluidos en el Sitio Web, así como cualquier otra consulta que el Usuario pueda tener y que no esté sujeta a las condiciones del sitio Web.
                </li>
                <li className="mb-4">
                  <strong>Formularios de comentarios:</strong> El Titular solicita datos personales entre los que pueden estar: nombre y apellidos, dirección de correo electrónico, y dirección de sitio Web con la finalidad de responder a los comentarios de los Usuarios.
                </li>
              </ul>

              <p className="text-neutral-600 mb-4">
                Existen otras finalidades por las que el Titular trata datos personales:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 mb-8">
                <li className="mb-2">Para garantizar el cumplimiento de las condiciones recogidas en la página de Aviso Legal y de la ley aplicable. Esto puede incluir el desarrollo de herramientas y algoritmos que ayuden al Sitio Web a garantizar la confidencialidad de los datos personales que recoge.</li>
                <li className="mb-2">Para apoyar y mejorar los servicios que ofrece este Sitio Web.</li>
                <li className="mb-2">Para analizar la navegación de los usuarios. El Titular recoge otros datos no identificativos que se obtienen mediante el uso de cookies que se descargan en el ordenador del Usuario cuando navega por el Sitio Web cuyas características y finalidad están detalladas en la página de{" "}
                  <Link href="/cookies" className="text-black hover:text-neutral-600 transition-colors">
                    Política de Cookies
                  </Link>
                  .
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Seguridad de los datos personales
              </h2>
              <p className="text-neutral-600 mb-4">
                Para proteger sus datos personales, el Titular toma todas las precauciones razonables y sigue las mejores prácticas de la industria para evitar su pérdida, mal uso, acceso indebido, divulgación, alteración o destrucción de los mismos.
              </p>
              <p className="text-neutral-600 mb-8">
                El Titular informa al Usuario de que sus datos personales no serán cedidos a terceras organizaciones, con la salvedad de que dicha cesión de datos esté amparada en una obligación legal o cuando la prestación de un servicio implique la necesidad de una relación contractual con un encargado de tratamiento. En este último caso, solo se llevará a cabo la cesión de datos al tercero cuando el Titular disponga del consentimiento expreso del Usuario.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Contenido de otros sitios web
              </h2>
              <p className="text-neutral-600 mb-4">
                Las páginas de este sitio Web pueden incluir contenido incrustado (por ejemplo, vídeos, imágenes, artículos, etc.). El contenido incrustado de otras web se comporta exactamente de la misma manera que si hubiera visitado la otra web.
              </p>
              <p className="text-neutral-600 mb-8">
                Estos sitios Web pueden recopilar datos sobre usted, utilizar cookies, incrustar un código de seguimiento adicional de terceros, y supervisar su interacción usando este código.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Política de Cookies
              </h2>
              <p className="text-neutral-600 mb-4">
                Para que este sitio Web funcione correctamente necesita utilizar cookies, que es una información que se almacena en su navegador web.
              </p>
              <p className="text-neutral-600 mb-8">
                Puede consultar toda la información relativa a la política de recogida y tratamiento de las cookies en la página de{" "}
                <Link href="/cookies" className="text-black hover:text-neutral-600 transition-colors">
                  Política de Cookies
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Cambios en la Política de Privacidad
              </h2>
              <p className="text-neutral-600 mb-4">
                El Titular se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas de la industria.
              </p>
              <p className="text-neutral-600 mb-8">
                Estas políticas estarán vigentes hasta que sean modificadas por otras debidamente publicadas.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 