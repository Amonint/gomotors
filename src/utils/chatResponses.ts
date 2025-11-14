export interface ChatResponse {
  text: string;
  quickReplies: string[];
  context: string;
}

// Variantes de respuestas para evitar repetición
const responseVariants: Record<string, string[]> = {
  precio: [
    "Los precios varían según el modelo, versión y las promociones vigentes. Tenemos opciones desde vehículos accesibles hasta premium, y lo mejor es que hay promociones especiales que cambian cada semana. Un asesor puede mostrarte opciones que se ajusten a tu presupuesto y las mejores formas de pago. ¿Te gustaría conocer las opciones disponibles?",
    "Manejamos una amplia gama de precios dependiendo del modelo y versión que te interese. Lo bueno es que siempre tenemos promociones activas. Para darte un precio exacto y las mejores condiciones, un especialista puede ayudarte. ¿Qué modelo te interesa?",
    "El precio depende del modelo específico, la versión y las promociones del momento. Tenemos facilidades de pago increíbles. ¿Prefieres que un asesor te muestre las opciones disponibles en tu rango de presupuesto?"
  ],
  financiamiento: [
    "💳 Tenemos planes de financiamiento muy flexibles desde **12 hasta 84 meses**, con tasas competitivas. Lo interesante es que cada perfil puede acceder a condiciones especiales:\n\n✅ Profesionales independientes\n✅ Empleados públicos y privados\n✅ Empresarios\n\nCada caso tiene su mejor plan personalizado. ¿Te gustaría que un especialista revise tu caso específico y te muestre las mejores opciones?",
    "Ofrecemos financiamiento desde 12 hasta 84 meses con condiciones muy accesibles. Dependiendo de tu perfil, podemos ofrecerte tasas preferenciales. ¿Te gustaría que calculemos una cuota aproximada?",
    "Nuestros planes de financiamiento son súper flexibles. Trabajamos con varios bancos y tenemos opciones para diferentes perfiles. Un especialista puede mostrarte exactamente cuánto pagarías mensualmente según el vehículo que elijas. ¿Hablamos?"
  ]
};

// Función para obtener variante de respuesta
const getResponseVariant = (category: string, defaultText: string): string => {
  if (responseVariants[category]) {
    const variants = responseVariants[category];
    const randomIndex = Math.floor(Math.random() * variants.length);
    return variants[randomIndex];
  }
  return defaultText;
};

// Respuestas inteligentes basadas en IA (fallback cuando API no está disponible)
export const getAILikeResponse = (userInput: string): ChatResponse => {
  const input = userInput.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normalizar y quitar acentos

  console.log('🤖 Analizando:', userInput);
  console.log('📝 Normalizado:', input);

  // Sistema de detección de intención inteligente (más completo)
  const intentions = {
    // Preguntas sobre ubicación y horarios (NUEVO - PRIORIDAD ALTA)
    ubicacion: ['ubicacion', 'direccion', 'donde estan', 'donde se encuentran', 'donde quedan', 'como llegar', 'ubicados', 'sucursal', 'showroom', 'concesionario'],
    horarios: ['horario', 'horarios', 'que hora', 'a que hora', 'cuando abren', 'cuando cierran', 'atencion', 'abierto', 'cerrado'],
    // Preguntas sobre marcas
    marcas: ['marca', 'marcas', 'que marcas', 'cuales marcas', 'que venden', 'que tienen', 'que cuentan', 'catalogo', 'ofrecen'],
    // Saludos
    saludo: ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'que tal', 'hey'],
    // Preguntas sobre precios
    precio: ['precio', 'costo', 'cuanto cuesta', 'cuanto vale', 'cuanto sale', 'valor', 'cuanto es', 'cuantos dolares', 'plata', 'caro', 'barato', 'economico'],
    // Preguntas sobre características
    caracteristicas: ['caracteristicas', 'especificaciones', 'ficha tecnica', 'motor', 'potencia', 'consumo', 'cilindrada', 'caballos', 'torque', 'rendimiento'],
    // Preguntas sobre disponibilidad
    disponibilidad: ['disponible', 'stock', 'hay', 'tienen', 'existe', 'inventario', 'conseguir', 'comprar'],
    // Preguntas sobre financiamiento
    financiamiento: ['financiamiento', 'credito', 'cuotas', 'entrada', 'enganche', 'tasa', 'plazo', 'pago', 'mensualidad', 'financiar', 'banco', 'opciones de financiamiento'],
    // Preguntas sobre modelos
    modelos: ['modelo', 'version', 'variante', 'tipo', 'great wall', 'haval', 'swm', 'soueast', 'dfsk', 'gwm', 'kyc', 'tank', 'poer', 'cannon', 'vehiculos', 'opciones'],
    // Preguntas sobre comparaciones
    comparacion: ['mejor', 'diferencia', 'comparar', 'vs', 'versus', 'cual es mejor', 'cual conviene', 'cual recomiendan'],
    // Preguntas sobre seguridad
    seguridad: ['seguridad', 'airbag', 'frenos', 'abs', 'estabilidad', 'seguro', 'proteccion', 'asistencia'],
    // Preguntas sobre tecnología
    tecnologia: ['tecnologia', 'pantalla', 'bluetooth', 'camara', 'sensores', 'conectividad', 'android auto', 'carplay', 'gps'],
    // Preguntas sobre garantía
    garantia: ['garantia', 'cobertura', 'respaldo'],
    // Preguntas sobre colores
    colores: ['color', 'colores', 'pintura', 'blanco', 'negro', 'rojo', 'azul', 'gris', 'plata'],
    // Preguntas sobre uso
    uso: ['para que sirve', 'cual me conviene', 'recomiendan', 'mejor para', 'necesito', 'busco', 'quiero'],
    // SUVs específicos
    suv: ['suv', 'camioneta', 'todo terreno', 'todoterreno', '4x4'],
    // Pickups específicos
    pickup: ['pickup', 'pick up', 'doble cabina', 'camion', 'carga'],
    // Sedanes específicos
    sedan: ['sedan', 'auto', 'carro', 'ejecutivo'],
  };

  // Detectar intención principal (buscar coincidencias parciales)
  let mainIntention = 'general';
  let maxMatches = 0;

  for (const [intention, keywords] of Object.entries(intentions)) {
    const matches = keywords.filter(keyword => input.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      mainIntention = intention;
    }
  }

  console.log('🎯 Intención detectada:', mainIntention, '(coincidencias:', maxMatches, ')');

  // Si no hubo coincidencias, intentar con palabras clave adicionales
  if (mainIntention === 'general') {
    if (input.includes('vehiculo') || input.includes('auto') || input.includes('carro')) {
      mainIntention = 'modelos';
      console.log('🔄 Reasignado a: modelos');
    } else if (input.includes('mensual') || input.includes('inicial')) {
      mainIntention = 'financiamiento';
      console.log('🔄 Reasignado a: financiamiento');
    } else if (input.includes('contacto') || input.includes('telefono') || input.includes('llamar')) {
      mainIntention = 'contacto';
      console.log('🔄 Reasignado a: contacto');
    }
  }

  // Generar respuesta según intención
  switch (mainIntention) {
    case 'ubicacion':
      return {
        text: "📍 Estamos ubicados en **Av. 8 de diciembre S/N y Av. Isidro Ayora, Loja - Ecuador**. Tenemos amplio parqueadero gratuito para nuestros clientes. Es muy fácil llegar, estamos en una zona céntrica. ¿Te gustaría que te envíe la ubicación exacta por WhatsApp o prefieres agendar una visita?",
        quickReplies: ["Ver en Google Maps", "Enviar ubicación por WhatsApp", "Agendar visita", "¿Cuáles son los horarios?"],
        context: "ubicacion"
      };

    case 'horarios':
      return {
        text: "⏰ Nuestros horarios de atención son:\n\n**Lunes a Viernes:** 8:00 AM - 6:00 PM\n**Sábados:** 8:00 AM - 4:00 PM\n**Domingos:** Cerrado\n\nTambién puedes contactarnos por WhatsApp fuera de horario y te responderemos a primera hora del día siguiente. ¿Te gustaría agendar una cita?",
        quickReplies: ["Agendar cita", "Contactar por WhatsApp", "¿Dónde están ubicados?", "Ver vehículos disponibles"],
        context: "horarios"
      };

    case 'saludo':
      const hour = new Date().getHours();
      let greeting = '¡Hola!';
      if (hour < 12) greeting = '¡Buenos días!';
      else if (hour < 18) greeting = '¡Buenas tardes!';
      else greeting = '¡Buenas noches!';

      return {
        text: `${greeting} 👋 Soy el asistente virtual de GoMotors. Estoy aquí para ayudarte con información sobre nuestros vehículos, financiamiento, servicios y más. ¿En qué puedo ayudarte hoy?`,
        quickReplies: ["Ver marcas disponibles", "Información de vehículos", "Opciones de financiamiento", "Hablar con asesor"],
        context: "saludo"
      };

    case 'marcas':
      return {
        text: "¡Excelente pregunta! 🚗 En GoMotors manejamos marcas chinas de gran calidad: **Great Wall, Haval, SWM, Soueast, DFSK, GWM y KYC**. Cada marca tiene sus especialidades: Great Wall y Haval son líderes en SUVs y pickups, con tecnología increíble. Tenemos desde opciones económicas hasta vehículos premium. ¿Te interesa alguna categoría en particular?",
        quickReplies: ["SUVs disponibles", "Pickups de trabajo", "Sedanes económicos", "Ver todo el catálogo"],
        context: "marcas"
      };

    case 'suv':
      return {
        text: "¡Los SUVs son nuestra especialidad! 🚙 Tenemos Great Wall Tank (todo terreno extremo), Haval (lujo y confort urbano) y más opciones. Cada uno tiene capacidades increíbles. Tenemos modelos desde opciones accesibles hasta premium con tecnología de punta. ¿Qué estilo de manejo te gusta más?",
        quickReplies: ["Todo terreno extremo", "Lujo urbano", "Ver precios SUV", "Agendar prueba de manejo"],
        context: "suv"
      };

    case 'pickup':
      return {
        text: "¡Excelente elección! 🛻 Nuestras pickups Poer y Cannon tienen tecnología que no encontrarás en otras marcas: potencia, capacidad de carga increíble y confort. Perfectas para trabajo duro y viajes familiares. Hay opciones en varias versiones. ¿Para qué la vas a usar principalmente?",
        quickReplies: ["Trabajo pesado", "Uso familiar", "Doble cabina", "Ver modelos disponibles"],
        context: "pickup"
      };

    case 'sedan':
      return {
        text: "Nuestros sedanes combinan elegancia, economía y tecnología. 🚗 Perfectos para ciudad y ejecutivos. Tenemos opciones con excelente rendimiento de combustible y equipamiento completo. ¿Buscas algo específico en un sedán?",
        quickReplies: ["Modelos económicos", "Sedanes premium", "Características", "Ver opciones"],
        context: "sedan"
      };

    case 'precio':
      return {
        text: getResponseVariant('precio', "Los precios varían según el modelo, versión y las promociones vigentes. Tenemos opciones desde vehículos accesibles hasta premium, y lo mejor es que hay promociones especiales que cambian cada semana. Un asesor puede mostrarte opciones que se ajusten a tu presupuesto y las mejores formas de pago. ¿Te gustaría conocer las opciones disponibles?"),
        quickReplies: ["Ver rango de precios", "Opciones de financiamiento", "Hablar con asesor", "Promociones actuales"],
        context: "precio"
      };

    case 'caracteristicas':
      return {
        text: "Cada modelo tiene características técnicas impresionantes. Dependiendo del vehículo que te interese, podemos hablarte sobre motor, transmisión, tecnología de seguridad, sistemas de asistencia y más. Para darte información precisa y actualizada sobre las especificaciones exactas, ¿qué modelo te interesa específicamente?",
        quickReplies: ["SUVs", "Pickups", "Sedanes", "Hablar con especialista"],
        context: "caracteristicas"
      };

    case 'disponibilidad':
      return {
        text: "Nuestro inventario se actualiza constantemente. Algunos modelos están disponibles de inmediato mientras otros pueden requerir un tiempo de espera. Lo genial es que tenemos opciones para reserva anticipada con beneficios especiales. ¿Qué modelo te interesa para verificar disponibilidad exacta?",
        quickReplies: ["Verificar disponibilidad", "Modelos disponibles inmediatos", "Reservar modelo", "Hablar con asesor"],
        context: "disponibilidad"
      };

    case 'financiamiento':
      return {
        text: getResponseVariant('financiamiento', "💳 Tenemos planes de financiamiento muy flexibles desde **12 hasta 84 meses**, con tasas competitivas. Lo interesante es que cada perfil puede acceder a condiciones especiales:\n\n✅ Profesionales independientes\n✅ Empleados públicos y privados\n✅ Empresarios\n\nCada caso tiene su mejor plan personalizado. ¿Te gustaría que un especialista revise tu caso específico y te muestre las mejores opciones?"),
        quickReplies: ["Requisitos para financiamiento", "Simular cuota mensual", "Hablar con especialista", "Ver vehículos disponibles"],
        context: "financiamiento"
      };

    case 'modelos':
      return {
        text: "Tenemos una excelente variedad de modelos en Great Wall, Haval, SWM, Soueast y más. Cada marca tiene sus puntos fuertes: lujo, todo terreno, tecnología, economía... Para recomendarte el modelo perfecto, necesito saber un poco más sobre tus necesidades. ¿Qué tipo de vehículo estás buscando?",
        quickReplies: ["SUVs familiares", "Pickups de trabajo", "Sedanes ejecutivos", "Ver todos"],
        context: "modelos"
      };

    case 'comparacion':
      return {
        text: "¡Excelente que quieras comparar! Cada modelo tiene sus ventajas únicas. Para hacer una comparación justa y darte la mejor recomendación, necesitamos entender tus prioridades: ¿economía de combustible, espacio, tecnología, potencia? Un asesor puede mostrarte una comparación detallada lado a lado. ¿Qué modelos quieres comparar?",
        quickReplies: ["SUVs vs Sedanes", "Modelos dentro misma categoría", "Mejores opciones calidad-precio", "Asesoría personalizada"],
        context: "comparacion"
      };

    case 'seguridad':
      return {
        text: "La seguridad es prioridad en todos nuestros vehículos. Contamos con tecnología como múltiples airbags, ABS, control de estabilidad, asistentes de frenado y más, dependiendo del modelo. Algunos incluso tienen sistemas avanzados de asistencia al conductor. ¿Te interesa conocer las características de seguridad de algún modelo en particular?",
        quickReplies: ["Modelos más seguros", "Tecnología de seguridad", "Certificaciones", "Hablar con especialista"],
        context: "seguridad"
      };

    case 'tecnologia':
      return {
        text: "Nuestros vehículos vienen equipados con tecnología de última generación: pantallas táctiles, conectividad smartphone, cámaras de reversa, sensores de estacionamiento, control de crucero y más. Los modelos premium tienen características aún más avanzadas. ¿Qué tecnologías son más importantes para ti?",
        quickReplies: ["Conectividad", "Asistencias de conducción", "Entretenimiento", "Ver todo"],
        context: "tecnologia"
      };

    case 'garantia':
      return {
        text: "Todos nuestros vehículos vienen con garantía de fábrica, y además ofrecemos opciones de garantía extendida con coberturas muy completas. Los detalles específicos varían según el modelo, pero siempre te protegemos. ¿Te gustaría conocer las opciones de garantía disponibles?",
        quickReplies: ["Garantía incluida", "Garantía extendida", "Cobertura", "Más información"],
        context: "garantia"
      };

    case 'colores':
      return {
        text: "Tenemos una excelente variedad de colores según el modelo: clásicos como blanco, negro, plata, y también opciones más llamativas como rojo, azul, verde... La disponibilidad de colores específicos puede variar. ¿Qué modelo te interesa para verificar colores disponibles?",
        quickReplies: ["Colores disponibles", "Ver catálogo", "Reservar color específico", "Hablar con asesor"],
        context: "colores"
      };

    case 'uso':
      return {
        text: "¡Perfecto! Para recomendarte el vehículo ideal necesito conocer tus necesidades: ¿lo usarás principalmente en ciudad o carretera? ¿Para trabajo, familia, o ambos? ¿Priorizas economía, espacio, o tecnología? Con esa info puedo sugerirte las mejores opciones. ¿Me cuentas un poco más?",
        quickReplies: ["Uso familiar", "Uso trabajo", "Uso mixto", "Asesoría personalizada"],
        context: "uso"
      };

    case 'contacto':
      return {
        text: "📞 Puedes contactarnos de varias formas:\n\n**Teléfono:** 07-2731143\n**WhatsApp:** +593 99 945 4243\n**Correo:** sistemas@gomotors.com.ec\n\n¿Prefieres que te contactemos por WhatsApp ahora o agendamos una llamada?",
        quickReplies: ["Contactar por WhatsApp", "Agendar llamada", "Ver ubicación", "Volver al menú"],
        context: "contacto"
      };

    default:
      // Respuesta genérica inteligente
      return {
        text: `Entiendo tu consulta. ${userInput.length > 50 ? 'Es un tema interesante que tiene varios aspectos a considerar.' : 'Es una buena pregunta.'} Para darte la información más precisa y actualizada, lo mejor sería que hablemos con un asesor especializado que puede resolver todas tus dudas en detalle. ¿Te parece si te conectamos?`,
        quickReplies: ["Información general", "Hablar con asesor", "Agendar visita", "WhatsApp"],
        context: "general"
      };
  }
};

export const getStrategicResponse = (userInput: string): ChatResponse => {
  const input = userInput.toLowerCase();

  // Respuestas sobre vehículos
  if (input.includes("vehículos") || input.includes("disponibles") || input.includes("carros") || input.includes("autos") || input.includes("catálogo")) {
    if (input.includes("básico") || input.includes("catálogo")) {
      return {
        text: "Tenemos estas categorías principales: SUVs (Great Wall Tank, Haval), Pickups (Poer, Cannon) y Sedanes. Cada una tiene características especiales que no aparecen en el catálogo web. ¿Te interesa alguna categoría en particular?",
        quickReplies: ["SUVs y sus ventajas", "Pickups especializadas", "Sedanes premium", "Ver todos presencialmente"],
        context: "vehiculos"
      };
    }
    return {
      text: "Tenemos increíbles opciones en SUVs, pickups y sedanes de marcas como Great Wall, Haval y más. Cada modelo tiene características únicas que te van a sorprender. ¿Te gustaría conocer cuál se adapta mejor a tu estilo de vida? Nuestros asesores tienen información exclusiva que no está en la web. ¿Agendamos una cita?",
      quickReplies: ["Ver catálogo básico", "Agendar cita presencial", "Hablar con asesor especializado"],
      context: "vehiculos"
    };
  }

  // Respuestas sobre financiamiento
  if (input.includes("financiamiento") || input.includes("crédito") || input.includes("pago") || input.includes("cuotas") || input.includes("simular")) {
    if (input.includes("básica") || input.includes("planes")) {
      return {
        text: "Ofrecemos desde 12 hasta 84 meses de financiamiento con tasas competitivas. Pero tenemos planes especiales para diferentes perfiles que pueden reducir significativamente tu cuota. ¿Qué tipo de plan te conviene más?",
        quickReplies: ["Plans para empleados", "Financiamiento express", "Planes familiares", "Hablar con especialista"],
        context: "financiamiento"
      };
    }
    return {
      text: "¡Excelente pregunta! Tenemos planes de financiamiento súper flexibles y algunas promociones especiales que cambian semanalmente. El proceso es más fácil de lo que imaginas, pero cada caso es único. ¿Hablamos con un especialista para revijar las mejores opciones para ti?",
      quickReplies: ["Información básica de planes", "Simular financiamiento", "Hablar con especialista"],
      context: "financiamiento"
    };
  }

  // Respuestas sobre postventa
  if (input.includes("postventa") || input.includes("servicio") || input.includes("mantenimiento") || input.includes("repuestos")) {
    if (input.includes("básicos")) {
      return {
        text: "Ofrecemos mantenimiento preventivo, correctivo, repuestos originales y garantía extendida. Pero tenemos un programa VIP con beneficios que te van a encantar: lavado gratuito, revisiones express y descuentos especiales. ¿Te interesa conocer más?",
        quickReplies: ["Programa VIP", "Garantía extendida", "Repuestos originales", "Agendar servicio"],
        context: "postventa"
      };
    }
    return {
      text: "Nuestro servicio postventa es lo que más nos diferencia de la competencia 😊 Tenemos servicios que seguramente no conoces y que te van a encantar. ¿Vienes para que te expliquemos todos los beneficios exclusivos?",
      quickReplies: ["Servicios básicos", "Beneficios exclusivos", "Agendar servicio"],
      context: "postventa"
    };
  }

  // Respuestas sobre promociones
  if (input.includes("promociones") || input.includes("descuentos") || input.includes("ofertas") || input.includes("precio") || input.includes("web")) {
    if (input.includes("web")) {
      return {
        text: "En la web tenemos algunas promociones, pero las mejores ofertas están reservadas para visitas presenciales. Tenemos descuentos por pronto pago, intercambio de vehículo y financiamiento que pueden ahorrarte miles de dólares. ¿Coordinamos para que las conozcas?",
        quickReplies: ["Descuentos por pronto pago", "Valor de intercambio", "Ofertas presenciales", "Agendar cita"],
        context: "promociones"
      };
    }
    return {
      text: "¡Perfecto timing! Justo tenemos unas promociones increíbles que terminan pronto. Algunas son tan especiales que solo las compartimos en persona 🎁 ¿Te parece si coordinamos para que las conozcas todas?",
      quickReplies: ["Ver promociones web", "Promociones exclusivas presenciales", "Contactar para detalles"],
      context: "promociones"
    };
  }

  // Respuestas sobre ubicación
  if (input.includes("ubicación") || input.includes("dirección") || input.includes("horarios") || input.includes("dónde")) {
    return {
      text: "Estamos en Av. 8 de diciembre S/N y Av. Isidro Ayora, Loja. Horarios: Lunes a Viernes 8:00-18:00, Sábados 8:00-16:00. Tenemos parqueadero gratuito y facilidades especiales para clientes. ¿Te esperamos hoy o prefieres agendar?",
      quickReplies: ["Ver en Google Maps", "Agendar visita", "Llamar ahora", "Más información"],
      context: "ubicacion"
    };
  }

  // Respuestas sobre asesores
  if (input.includes("asesor") || input.includes("vendedor") || input.includes("hablar") || input.includes("contacto")) {
    if (input.includes("inmediato") || input.includes("whatsapp")) {
      return {
        text: "¡Perfecto! Te voy a conectar inmediatamente con uno de nuestros asesores por WhatsApp. Ellos tienen toda la información actualizada sobre inventario, promociones y pueden resolver todas tus dudas.",
        quickReplies: ["Conectar ahora", "Agendar llamada", "Visita presencial"],
        context: "asesor_inmediato"
      };
    }
    return {
      text: "¡Perfecto! Nuestros asesores son expertos y van a poder resolver todas tus dudas de manera personalizada. ¿Prefieres que te contacten por WhatsApp ahora o agendamos una cita presencial?",
      quickReplies: ["WhatsApp inmediato", "Agendar cita presencial", "Llamada telefónica"],
      context: "asesor"
    };
  }

  // Respuestas por categorías específicas
  if (input.includes("suv")) {
    return {
      text: "¡Los SUVs son nuestra especialidad! Tenemos Great Wall Tank (todo terreno extremo), Haval (lujo urbano) y modelos híbridos. Cada uno tiene capacidades que te van a sorprender. ¿Cuál es tu estilo de manejo?",
      quickReplies: ["Todo terreno extremo", "Lujo urbano", "Híbridos", "Probar manejo"],
      context: "suv"
    };
  }

  if (input.includes("pickup")) {
    return {
      text: "¡Excelente elección! Nuestras pickups Poer y Cannon tienen tecnología que no encontrarás en otras marcas. Son perfectas para trabajo y familia. ¿Para qué la vas a usar principalmente?",
      quickReplies: ["Trabajo pesado", "Familiar", "Tecnología avanzada", "Test drive"],
      context: "pickup"
    };
  }

  // Respuestas sobre horarios de atención
  if (input.includes("horario") && !isBusinessHours()) {
    return {
      text: "Estamos cerrados en este momento, pero déjame tus datos y mañana temprano un asesor te contacta con información super actualizada. También puedes agendar una cita para cuando te convenga. ¿Qué prefieres?",
      quickReplies: ["Dejar mis datos", "Agendar cita", "WhatsApp mañana", "Llamar mañana"],
      context: "fuera_horario"
    };
  }

  // Respuesta genérica para preguntas no identificadas
  const topic = extractTopic(input);
  return {
    text: `Esa es una excelente pregunta sobre ${topic}. Hay varios aspectos importantes que considerar y algunos detalles especiales que prefiero explicarte en persona para darte la mejor asesoría. ¿Te parece si agendamos 15 minutos?`,
    quickReplies: ["Agendar reunión", "Más información por WhatsApp", "Llamar ahora"],
    context: "general"
  };
};

const extractTopic = (input: string): string => {
  const topics: Record<string, string> = {
    'precio': 'precios',
    'costo': 'costos',
    'modelo': 'modelos disponibles',
    'seguro': 'seguros',
    'garantía': 'garantías',
    'garantia': 'garantías',
    'repuesto': 'repuestos',
    'color': 'colores disponibles',
    'motor': 'especificaciones técnicas',
    'combustible': 'consumo de combustible',
    'manual': 'transmisión',
    'automatico': 'transmisión automática',
    'hibrido': 'tecnología híbrida',
    'electrico': 'vehículos eléctricos'
  };

  for (const [key, value] of Object.entries(topics)) {
    if (input.includes(key)) return value;
  }
  return 'tu consulta';
};

const isBusinessHours = (): boolean => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  return day >= 1 && day <= 6 && hour >= 8 && hour < 18; // Lunes a Sábado, 8 AM - 6 PM
};

export const getWhatsAppMessage = (context: string): string => {
  const baseMessage = "Hola, vengo del chat de la página web de GoMotors";

  const contextMessages: Record<string, string> = {
    'vehiculos': ' y me interesa conocer más sobre los vehículos disponibles',
    'financiamiento': ' y me gustaría información sobre planes de financiamiento',
    'postventa': ' y necesito información sobre servicios postventa',
    'promociones': ' y me interesan las promociones actuales',
    'ubicacion': ' y me gustaría agendar una visita',
    'asesor': ' y me gustaría hablar con un asesor especializado',
    'suv': ' y me interesan los SUVs disponibles',
    'pickup': ' y me interesan las pickups',
    'asesor_inmediato': ' y necesito hablar con un asesor ahora mismo'
  };

  return baseMessage + (contextMessages[context] || ' y tengo algunas consultas') + '. ¿Podrían ayudarme?';
};