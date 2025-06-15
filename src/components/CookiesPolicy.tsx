"use client";

import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const CookiesPolicy = () => {
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
                Política de Cookies
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
            <h2 className="text-xl font-semibold text-neutral-800 mb-6">
              ¿Qué son las cookies?
            </h2>
            <p className="text-neutral-600 mb-4">
              En inglés, el término &quot;cookie&quot; significa galleta, pero en el ámbito de la navegación web, una &quot;cookie&quot; es algo completamente distinto. Cuando accede a nuestro Sitio Web, en el navegador de su dispositivo se almacena una pequeña cantidad de texto que se denomina &quot;cookie&quot;. Este texto contiene información variada sobre su navegación, hábitos, preferencias, personalizaciones de contenidos, etc...
            </p>
            <p className="text-neutral-600 mb-4">
              Existen otras tecnologías que funcionan de manera similar y que también se usan para recopilar datos sobre tu actividad de navegación. Llamaremos &quot;cookies&quot; a todas estas tecnologías en su conjunto.
            </p>
            <p className="text-neutral-600 mb-8">
              Los usos concretos que hacemos de estas tecnologías se describen en el presente documento.
            </p>

            <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
              ¿Para qué se utilizan las cookies en esta web?
            </h2>
            <p className="text-neutral-600 mb-4">
              Las cookies son una parte esencial de cómo funciona el Sitio Web. El objetivo principal de nuestras cookies es mejorar su experiencia en la navegación. Por ejemplo, para recordar sus preferencias (idioma, país, etc.) durante la navegación y en futuras visitas. La información recogida en las cookies nos permite además mejorar la web, adaptarla a sus intereses como usuario, acelerar las búsquedas que realice, etc..
            </p>
            <p className="text-neutral-600 mb-8">
              En determinados casos, si hemos obtenido su previo consentimiento informado, podremos utilizar cookies para otros usos, como por ejemplo para obtener información que nos permita mostrarle publicidad basada en el análisis de sus hábitos de navegación.
            </p>

            <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
              ¿Para qué NO se utilizan las cookies en esta web?
            </h2>
            <p className="text-neutral-600 mb-8">
              En las cookies que utilizamos no se almacena información sensible de identificación personal como su nombre, dirección, tu contraseña, etc...
            </p>

            <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
              ¿Quién utiliza la información almacenada en las cookies?
            </h2>
            <p className="text-neutral-600 mb-8">
              La información almacenada en las cookies de nuestro Sitio Web es utilizada exclusivamente por nosotros, a excepción de aquellas identificadas más adelante como &quot;cookie de terceros&quot;, que son utilizadas y gestionadas por entidades externas que nos proporcionan servicios que mejoran la experiencia del usuario. Por ejemplo las estadísticas que se recogen sobre el número de visitas, el contenido que más gusta, etc...
            </p>

            <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
              ¿Cómo puede evitar el uso de cookies en este Sitio Web?
            </h2>
            <p className="text-neutral-600 mb-8">
              Si prefiere evitar el uso de las cookies, puede RECHAZAR su uso o puede CONFIGURAR las que quiere evitar y las que permite utilizar (en este documento le damos información ampliada al respecto de cada tipo de cookie, su finalidad, destinatario, temporalidad, etc... ).
            </p>
            <p className="text-neutral-600 mb-8">
              Si las ha aceptado, no volveremos a preguntarle a menos que borre las cookies en su dispositivo según se indica en el apartado siguiente. Si quiere revocar el consentimiento tendrá que eliminar las cookies y volver a configurarlas.
            </p>

            <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
              ¿Cómo deshabilito y elimino la utilización de cookies?
            </h2>
            <p className="text-neutral-600 mb-4">
              El Titular muestra información sobre su Política de cookies en el banner de cookies accesible en todas las páginas del Sitio Web. El banner de cookies muestra información esencial sobre el tratamiento de datos y permite al Usuario realizar las siguientes acciones:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-8">
              <li className="mb-2">ACEPTAR o RECHAZAR la instalación de cookies, o retirar el consentimiento previamente otorgado.</li>
              <li className="mb-2">Obtener información adicional en la página de Política de Cookies.</li>
            </ul>
            <p className="text-neutral-600 mb-4">
              Para restringir, bloquear o borrar las cookies de este Sitio Web (y las usada por terceros) puede hacerlo, en cualquier momento, modificando la configuración de su navegador. Tenga en cuenta que esta configuración es diferente en cada navegador.
            </p>
            <p className="text-neutral-600 mb-4">
              En los siguientes enlaces encontrará instrucciones para habilitar o deshabilitar las cookies en los navegadores más comunes:
            </p>
            <ul className="list-none pl-0 text-neutral-600 mb-8">
              <li className="mb-2">
                <Link href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" className="text-black hover:text-neutral-600 transition-colors">
                  Firefox
                </Link>
              </li>
              <li className="mb-2">
                <Link href="https://support.google.com/chrome/answer/95647?hl=es" className="text-black hover:text-neutral-600 transition-colors">
                  Google Chrome
                </Link>
              </li>
              <li className="mb-2">
                <Link href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" className="text-black hover:text-neutral-600 transition-colors">
                  Internet Explorer
                </Link>
              </li>
              <li className="mb-2">
                <Link href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-black hover:text-neutral-600 transition-colors">
                  Microsoft Edge
                </Link>
              </li>
              <li className="mb-2">
                <Link href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" className="text-black hover:text-neutral-600 transition-colors">
                  Safari
                </Link>
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-neutral-800 mt-12 mb-6">
              ¿Qué tipos de cookies se utilizan en esta página web?
            </h2>
            <p className="text-neutral-600 mb-8">
              Cada página web utiliza sus propias cookies. En nuestra web utilizamos las que se indican a continuación:
            </p>

            <h3 className="text-lg font-medium text-neutral-800 mt-8 mb-4">
              SEGÚN LA ENTIDAD QUE LO GESTIONA
            </h3>
            
            <h4 className="text-base font-medium text-neutral-800 mt-6 mb-2">
              Cookies propias:
            </h4>
            <p className="text-neutral-600 mb-4">
              Son aquellas que se envían al equipo terminal del Usuario desde un equipo o dominio gestionado por el propio editor y desde el que se presta el servicio solicitado por el Usuario.
            </p>

            <h4 className="text-base font-medium text-neutral-800 mt-6 mb-2">
              Cookies de terceros:
            </h4>
            <p className="text-neutral-600 mb-4">
              Son aquellas que se envían al equipo terminal del Usuario desde un equipo o dominio que no es gestionado por el editor, sino por otra entidad que trata los datos obtenidos través de las cookies.
            </p>
            <p className="text-neutral-600 mb-8">
              En el caso de que las cookies sean servidas desde un equipo o dominio gestionado por el propio editor, pero la información que se recoja mediante estas sea gestionada por un tercero, no pueden ser consideradas como cookies propias si el tercero las utiliza para sus propias finalidades (por ejemplo, la mejora de los servicios que presta o la prestación de servicios de carácter publicitario a favor de otras entidades).
            </p>

            <h3 className="text-lg font-medium text-neutral-800 mt-8 mb-4">
              SEGÚN SU FINALIDAD
            </h3>

            <h4 className="text-base font-medium text-neutral-800 mt-6 mb-2">
              Cookies técnicas:
            </h4>
            <p className="text-neutral-600 mb-4">
              Son aquellas necesarias para la navegación y el buen funcionamiento de nuestro Sitio Web, como por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder a partes de acceso restringido, realizar la solicitud de inscripción o participación en un evento, contar visitas a efectos de la facturación de licencias del software con el que funciona el servicio del Sitio Web, utilizar elementos de seguridad durante la navegación, almacenar contenidos para la difusión de vídeos o sonido, habilitar contenidos dinámicos (por ejemplo, animación de carga de un texto o imagen).
            </p>

            <h4 className="text-base font-medium text-neutral-800 mt-6 mb-2">
              Cookies de análisis:
            </h4>
            <p className="text-neutral-600 mb-4">
              Permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del Sitio Web.
            </p>

            <h4 className="text-base font-medium text-neutral-800 mt-6 mb-2">
              Cookies de preferencias o personalización:
            </h4>
            <p className="text-neutral-600 mb-8">
              Son aquellas que permiten recordar información para que el Usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios, como, por ejemplo, el idioma, el número de resultados a mostrar cuando el Usuario realiza una búsqueda, el aspecto o contenido del servicio en función del tipo de navegador a través del cual el Usuario accede al servicio o de la región desde la que accede al servicio, etc.
            </p>

            <h3 className="text-lg font-medium text-neutral-800 mt-8 mb-4">
              SEGÚN EL PLAZO DE TIEMPO QUE PERMANECEN ACTIVADAS
            </h3>

            <h4 className="text-base font-medium text-neutral-800 mt-6 mb-2">
              Cookies de sesión:
            </h4>
            <p className="text-neutral-600 mb-4">
              Son aquellas diseñadas para recabar y almacenar datos mientras el Usuario accede a una página web.
            </p>
            <p className="text-neutral-600 mb-8">
              Se suelen emplear para almacenar información que solo interesa conservar para la prestación del servicio solicitado por el Usuario en una sola ocasión (por ejemplo, una lista de productos adquiridos) y desaparecen al terminar la sesión.
            </p>

            <h4 className="text-base font-medium text-neutral-800 mt-6 mb-2">
              Cookies persistentes:
            </h4>
            <p className="text-neutral-600 mb-8">
              Son aquellas en las que los datos siguen almacenados en el terminal y pueden ser accedidos y tratados durante un periodo definido por el responsable de la cookie, y que puede ir de unos minutos a varios años. A este respecto debe valorarse específicamente si es necesaria la utilización de cookies persistentes, puesto que los riesgos para la privacidad podrían reducirse mediante la utilización de cookies de sesión. En todo caso, cuando se instalen cookies persistentes, se recomienda reducir al mínimo necesario su duración temporal atendiendo a la finalidad de su uso. A estos efectos, el Dictamen 4/2012 del GT29 indicó que para que una cookie pueda estar exenta del deber de consentimiento informado, su caducidad debe estar relacionada con su finalidad. Debido a ello, es mucho más probable que se consideren como exceptuadas las cookies de sesión que las persistentes.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPolicy; 