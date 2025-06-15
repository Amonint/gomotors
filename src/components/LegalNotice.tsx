"use client";

import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const LegalNotice = () => {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="w-full bg-[#F5F5F5] border-b border-neutral-300">
        <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-16 lg:py-20">
          <div className="absolute top-8 left-8">
            <Link
              href="/proteccion-datos"
              className="flex items-center text-white bg-black px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
            >
              <FaArrowLeft className="mr-2 text-white" /> Volver
            </Link>
          </div>

          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-normal text-neutral-800 mt-2">
                Aviso Legal
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
              <h2 className="text-xl font-semibold text-neutral-800 mb-6">
                Identificación y Titularidad
              </h2>
              <p className="text-neutral-600 mb-4">
                A continuación el Titular expone sus datos identificativos:
              </p>
              <ul className="list-none p-0 text-neutral-600">
                <li className="mb-2"><strong>Titular:</strong> IOMOTORS S.A.</li>
                <li className="mb-2"><strong>Domicilio:</strong> Avenida 8 de diciembre S/N y Avenida Isidro Ayora., Loja - Ecuador.</li>
                <li className="mb-2"><strong>Correo electrónico:</strong> sistemas@gomotors.com.ec</li>
                <li className="mb-2"><strong>Teléfono de contacto:</strong> 072731143</li>
                <li className="mb-2"><strong>Sitio Web:</strong> https://www.gomotors.com.ec</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Finalidad
              </h2>
              <p className="text-neutral-600 mb-8">
                La finalidad del Sitio Web es: Actividades relacionadas a la compra y venta de vehículos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Condiciones de Uso
              </h2>
              <p className="text-neutral-600 mb-4">
                La utilización del Sitio Web le otorga la condición de Usuario, e implica la aceptación completa de todas las cláusulas y condiciones de uso incluidas en las páginas:
              </p>
              <ul className="list-none p-0 text-neutral-600 mb-8">
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
                <li className="mb-2">
                  <Link href="/cookies" className="text-black hover:text-neutral-600 transition-colors">
                    Política de Cookies
                  </Link>
                </li>
              </ul>

              <p className="text-neutral-600 mb-4">
                Si no estuviera conforme con todas y cada una de estas cláusulas y condiciones absténgase de utilizar el Sitio Web.
              </p>

              <p className="text-neutral-600 mb-4">
                El acceso al Sitio Web no supone, en modo alguno, el inicio de una relación comercial con el Titular.
              </p>

              <p className="text-neutral-600 mb-4">
                A través del Sitio Web, el Titular le facilita el acceso y la utilización de diversos contenidos que el Titular y/o sus colaboradores han publicado por medio de Internet.
              </p>

              <p className="text-neutral-600 mb-8">
                A tal efecto, está obligado y comprometido a NO utilizar cualquiera de los contenidos del Sitio Web con fines o efectos ilícitos, prohibidos en este Aviso Legal o por la legislación vigente, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de los contenidos, los equipos informáticos o los documentos, archivos y toda clase de contenidos almacenados en cualquier equipo informático propios o contratados por el Titular, de otros usuarios o de cualquier usuario de Internet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Medidas de seguridad
              </h2>
              <p className="text-neutral-600 mb-4">
                Los datos personales que facilite al Titular pueden ser almacenados en bases de datos automatizadas o no, cuya titularidad corresponde en exclusiva al Titular, que asume todas las medidas de índole técnica, organizativa y de seguridad que garantizan la confidencialidad, integridad y calidad de la información contenida en las mismas de acuerdo con lo establecido en la normativa vigente en protección de datos.
              </p>
              <p className="text-neutral-600 mb-8">
                No obstante, debe ser consciente de que las medidas de seguridad de los sistemas informáticos en Internet no son enteramente fiables y que, por tanto el Titular no puede garantizar la inexistencia de virus u otros elementos que puedan producir alteraciones en los sistemas informáticos (software y hardware) del Usuario o en sus documentos electrónicos y ficheros contenidos en los mismos aunque el Titular pone todos los medios necesarios y toma las medidas de seguridad oportunas para evitar la presencia de estos elementos dañinos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Tratamiento de Datos Personales
              </h2>
              <p className="text-neutral-600 mb-8">
                Puede consultar toda la información relativa al tratamiento de datos personales que recoge el Titular en la página de{" "}
                <Link href="/proteccion-datos" className="text-black hover:text-neutral-600 transition-colors">
                  Política de Privacidad
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Contenidos
              </h2>
              <p className="text-neutral-600 mb-4">
                El Titular ha obtenido la información, el contenido multimedia y los materiales incluidos en el Sitio Web de fuentes que considera fiables, pero, si bien ha tomado todas las medidas razonables para asegurar que la información contenida es correcta, el Titular no garantiza que sea exacta, completa o actualizada. El Titular declina expresamente cualquier responsabilidad por error u omisión en la información contenida en las páginas del Sitio Web.
              </p>
              <p className="text-neutral-600 mb-4">
                Queda prohibido transmitir o enviar a través del Sitio Web cualquier contenido ilegal o ilícito, virus informáticos, o mensajes que, en general, afecten o violen derechos del Titular o de terceros.
              </p>
              <p className="text-neutral-600 mb-4">
                Los contenidos del Sitio Web tienen únicamente una finalidad informativa y bajo ninguna circunstancia deben usarse ni considerarse como oferta de venta, solicitud de una oferta de compra ni recomendación para realizar cualquier otra operación, salvo que así se indique expresamente.
              </p>
              <p className="text-neutral-600 mb-4">
                El Titular se reserva el derecho a modificar, suspender, cancelar o restringir el contenido del Sitio Web, los vínculos o la información obtenida a través del Sitio Web, sin necesidad de previo aviso.
              </p>
              <p className="text-neutral-600 mb-8">
                El Titular no es responsable de los daños y perjuicios que pudieran derivarse de la utilización de la información del Sitio Web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Política de cookies
              </h2>
              <p className="text-neutral-600 mb-8">
                Puede consultar toda la información relativa a la política de recogida y tratamiento de las cookies en la página de{" "}
                <Link href="/cookies" className="text-black hover:text-neutral-600 transition-colors">
                  Política de Cookies
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Enlaces a otros sitios Web
              </h2>
              <p className="text-neutral-600 mb-4">
                El Titular puede proporcionarle acceso a sitios Web de terceros mediante enlaces con la finalidad exclusiva de informar sobre la existencia de otras fuentes de información en Internet en las que podrá ampliar los datos ofrecidos en el Sitio Web.
              </p>
              <p className="text-neutral-600 mb-4">
                Estos enlaces a otros sitios Web no suponen en ningún caso una sugerencia o recomendación para que usted visite las páginas web de destino, que están fuera del control del Titular, por lo que el Titular no es responsable del contenido de los sitios web vinculados ni del resultado que obtenga al seguir los enlaces.
              </p>
              <p className="text-neutral-600 mb-4">
                El establecimiento del enlace no implica en ningún caso la existencia de relaciones entre el Titular y el propietario del sitio en el que se establezca el enlace, ni la aceptación o aprobación por parte del Titular de sus contenidos o servicios.
              </p>
              <p className="text-neutral-600 mb-8">
                Si accede a un sitio web externo desde un enlace que encuentre en el Sitio Web usted deberá leer la propia política de privacidad del otro sitio web que puede ser diferente de la de este sitio Web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Propiedad intelectual e industrial
              </h2>
              <p className="text-neutral-600 mb-4">
                Todos los derechos están reservados.
              </p>
              <p className="text-neutral-600 mb-8">
                Todo acceso a este Sitio Web está sujeto a las siguientes condiciones: la reproducción, almacenaje permanente y la difusión de los contenidos o cualquier otro uso que tenga finalidad pública o comercial queda expresamente prohibida sin el consentimiento previo expreso y por escrito del Titular.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Limitación de responsabilidad
              </h2>
              <p className="text-neutral-600 mb-4">
                La información y servicios incluidos o disponibles a través del Sitio Web pueden incluir incorrecciones o errores tipográficos. De forma periódica el Titular incorpora mejoras y/o cambios a la información contenida y/o los Servicios que puede introducir en cualquier momento.
              </p>
              <p className="text-neutral-600 mb-4">
                El Titular no declara ni garantiza que los servicios o contenidos sean interrumpidos o que estén libres de errores, que los defectos sean corregidos, o que el servicio o el servidor que lo pone a disposición estén libres de virus u otros componentes nocivos sin perjuicio de que el Titular realiza todos los esfuerzos en evitar este tipo de incidentes.
              </p>
              <p className="text-neutral-600 mb-4">
                El Titular declina cualquier responsabilidad en caso de que existan interrupciones o un mal funcionamiento de los Servicios o contenidos ofrecidos en Internet, cualquiera que sea su causa. Asimismo, el Titular no se hace responsable por caídas de la red, pérdidas de negocio a consecuencia de dichas caídas, suspensiones temporales de fluido eléctrico o cualquier otro tipo de daño indirecto que te pueda ser causado por causas ajenas a el Titular.
              </p>
              <p className="text-neutral-600 mb-8">
                Antes de tomar decisiones y/o acciones con base a la información incluida en el Sitio Web, el Titular le recomienda comprobar y contrastar la información recibida con otras fuentes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
                Contacto
              </h2>
              <p className="text-neutral-600">
                En caso de que usted tenga cualquier duda acerca de este Aviso Legal o quiera realizar cualquier comentario sobre el Sitio Web, puede enviar un mensaje de correo electrónico a la dirección: sistemas@gomotors.com.ec
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalNotice; 