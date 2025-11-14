"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaTimes, FaRobot, FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import { getStrategicResponse, getWhatsAppMessage, getAILikeResponse } from "@/utils/chatResponses";
import useChatPersonalization from "@/hooks/useChatPersonalization";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
  role?: 'user' | 'assistant';
}

interface ChatAnalytics {
  buttonsClicked: Record<string, number>;
  questionsAsked: string[];
  whatsappDerivations: number;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentContext, setCurrentContext] = useState<string>("");
  const [userInput, setUserInput] = useState("");
  const [isAIResponding, setIsAIResponding] = useState(false);
  const [lastBotResponses, setLastBotResponses] = useState<string[]>([]); // Anti-bucle
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { visitorData, addPreferredTopic } = useChatPersonalization();

  // Horarios de atención (8 AM - 6 PM)
  const isBusinessHours = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    return day >= 1 && day <= 6 && hour >= 8 && hour < 18; // Lunes a Sábado, 8 AM - 6 PM
  };

  // Scroll automático al fondo
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cargar historial del localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('gomotors-chat-history');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Migrar IDs antiguos a nuevos IDs únicos
        const migratedMessages = parsed.map((msg: any, index: number) => {
          // Si el ID ya tiene el formato nuevo (contiene guiones), mantenerlo
          // Si no, generar un nuevo ID único
          const hasNewFormat = msg.id && (msg.id.includes('bot-') || msg.id.includes('user-'));

          return {
            ...msg,
            id: hasNewFormat
              ? msg.id
              : `${msg.isBot ? 'bot' : 'user'}-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(msg.timestamp)
          };
        });
        setMessages(migratedMessages);
      } catch (error) {
        console.error('Error al cargar historial:', error);
        // Si hay error, limpiar localStorage y empezar de nuevo
        localStorage.removeItem('gomotors-chat-history');
        initializeWelcomeMessage();
      }
    } else {
      initializeWelcomeMessage();
    }
  }, []); // Solo ejecutar una vez al montar

  const initializeWelcomeMessage = () => {
    const welcomeMessage = createBotMessage(
      "¡Hola! 👋 Soy el asistente virtual de GoMotors. Pregúntame lo que necesites sobre nuestros vehículos, financiamiento, servicios y más. También puedes usar estas preguntas frecuentes:",
      [
        "¿Qué marcas tienen disponibles?",
        "¿Dónde están ubicados?",
        "¿Cuáles son los horarios de atención?",
        "¿Qué opciones de financiamiento hay?",
        "¿Tienen SUVs disponibles?",
        "Hablar con un asesor"
      ]
    );
    setMessages([welcomeMessage]);
  };

  // Guardar historial en localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('gomotors-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Trackear analytics
  const trackAnalytics = (action: string, data?: any) => {
    const analytics: ChatAnalytics = JSON.parse(
      localStorage.getItem('gomotors-chat-analytics') ||
      '{"buttonsClicked": {}, "questionsAsked": [], "whatsappDerivations": 0}'
    );

    switch (action) {
      case 'button_click':
        analytics.buttonsClicked[data] = (analytics.buttonsClicked[data] || 0) + 1;
        break;
      case 'question_asked':
        analytics.questionsAsked.push(data);
        break;
      case 'whatsapp_derivation':
        analytics.whatsappDerivations++;
        break;
    }

    localStorage.setItem('gomotors-chat-analytics', JSON.stringify(analytics));
  };

  const createBotMessage = (text: string, quickReplies?: string[]): Message => ({
    id: `bot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    text,
    isBot: true,
    timestamp: new Date(),
    quickReplies,
    role: 'assistant'
  });

  const createUserMessage = (text: string): Message => ({
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    text,
    isBot: false,
    timestamp: new Date(),
    role: 'user'
  });

  // Funciones de personalización
  const getPersonalizedWelcome = (): string => {
    const hour = new Date().getHours();
    let greeting = '';

    if (hour < 12) greeting = '¡Buenos días!';
    else if (hour < 18) greeting = '¡Buenas tardes!';
    else greeting = '¡Buenas noches!';

    if (visitorData.isReturning) {
      if (visitorData.visitCount === 2) {
        return `${greeting} ¡Qué bueno verte de nuevo! 😊 Soy el asistente de GoMotors. ¿En qué puedo ayudarte hoy?`;
      } else {
        return `${greeting} ¡Bienvenido otra vez a GoMotors! 🚗 ¿Seguimos donde lo dejamos o hay algo nuevo en lo que pueda ayudarte?`;
      }
    }

    return `${greeting} ¡Bienvenido a GoMotors! 🚗 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?`;
  };

  const getPersonalizedSuggestions = (): string[] => {
    const baseSuggestions = [
      "Información sobre vehículos disponibles",
      "Proceso de financiamiento",
      "Servicios de postventa",
      "Ubicación y horarios",
      "Promociones actuales",
      "Hablar con un asesor"
    ];

    if (visitorData.preferredTopics && visitorData.preferredTopics.length > 0) {
      // Reordenar basado en preferencias
      const preferred = baseSuggestions.filter(s =>
        visitorData.preferredTopics.some(topic =>
          s.toLowerCase().includes(topic.toLowerCase())
        )
      );
      const others = baseSuggestions.filter(s => !preferred.includes(s));
      return [...preferred, ...others];
    }

    return baseSuggestions;
  };

  // Manejar respuestas del bot usando utilidades externas
  const handleBotResponse = (userInput: string): Message => {
    const response = getStrategicResponse(userInput);
    setCurrentContext(response.context);

    // Trackear topic preferences
    addPreferredTopic(response.context);

    return createBotMessage(response.text, response.quickReplies);
  };

  // Simular escritura del bot
  const simulateTyping = async (delay = 1500) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
  };

  // Función para detectar bucles y generar respuesta alternativa
  const detectLoopAndRespond = (response: string, userInput: string): { text: string; isLoop: boolean } => {
    // Verificar si las últimas 2 respuestas del bot son iguales o muy similares
    const last2Responses = lastBotResponses.slice(-2);

    if (last2Responses.length >= 2 && last2Responses.every(r => r === response)) {
      console.log('🔄 Bucle detectado! Generando respuesta alternativa...');

      // Respuesta de escape del bucle
      return {
        text: `Veo que estamos dando vueltas sobre lo mismo 😅 Déjame ayudarte mejor. Te puedo conectar con un asesor especializado que puede resolver todas tus dudas de forma personalizada y mostrarte opciones específicas para tu caso. ¿Te parece?`,
        isLoop: true
      };
    }

    // Verificar si el usuario está haciendo la misma pregunta repetidamente
    const userMessages = messages.filter(m => !m.isBot).slice(-3).map(m => m.text.toLowerCase());
    const currentInput = userInput.toLowerCase();
    const repeatedQuestions = userMessages.filter(m =>
      m.includes(currentInput.split(' ')[0]) || currentInput.includes(m.split(' ')[0])
    ).length;

    if (repeatedQuestions >= 2) {
      console.log('🔄 Usuario repitiendo pregunta. Ofreciendo ayuda directa...');

      return {
        text: `Entiendo que necesitas información más específica. Para darte los detalles exactos que buscas, lo mejor es que hablemos con un asesor que tiene toda la información actualizada al minuto. ¿Te conecto por WhatsApp o prefieres agendar una llamada?`,
        isLoop: true
      };
    }

    return { text: response, isLoop: false };
  };

  const handleQuickReply = async (reply: string) => {
    trackAnalytics('button_click', reply);

    // Agregar mensaje del usuario
    const userMessage = createUserMessage(reply);
    setMessages(prev => [...prev, userMessage]);

    // Verificar si es "Volver al inicio"
    if (reply.toLowerCase().includes('volver al inicio') || reply.toLowerCase().includes('volver al menu')) {
      // Limpiar historial anti-bucle
      setLastBotResponses([]);

      // Simular typing
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsTyping(false);

      // Mensaje de reinicio
      const restartMessage = createBotMessage(
        "¡Perfecto! 👋 Empecemos de nuevo. ¿En qué puedo ayudarte?",
        [
          "¿Qué marcas tienen disponibles?",
          "¿Dónde están ubicados?",
          "¿Cuáles son los horarios de atención?",
          "¿Qué opciones de financiamiento hay?",
          "¿Tienen SUVs disponibles?",
          "Hablar con un asesor"
        ]
      );
      setMessages(prev => [...prev, restartMessage]);
      return;
    }

    // Verificar si es "Hablar con un asesor"
    if (reply.toLowerCase().includes('hablar con') || reply.toLowerCase().includes('asesor')) {
      handleWhatsAppDerivation();
      return;
    }

    // Simular typing y responder con IA
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));

    // Usar IA para responder
    const aiResponse = getAILikeResponse(reply);

    // Detectar bucles
    const { text: finalText, isLoop } = detectLoopAndRespond(aiResponse.text, reply);

    setCurrentContext(aiResponse.context);
    addPreferredTopic(aiResponse.context);

    // Actualizar historial de respuestas del bot
    setLastBotResponses(prev => [...prev.slice(-4), finalText]); // Mantener últimas 5

    const botResponse = createBotMessage(
      finalText,
      isLoop ? ["Hablar con asesor ahora", "Agendar llamada", "Volver al inicio"] : aiResponse.quickReplies
    );
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);

    if (!isOpen) {
      setUnreadCount(prev => prev + 1);
    }
  };

  // Enviar mensaje libre a IA
  const handleSendMessage = async () => {
    if (!userInput.trim() || isAIResponding) return;

    const trimmedInput = userInput.trim();

    // Validar longitud
    if (trimmedInput.length > 500) {
      alert('El mensaje es muy largo. Máximo 500 caracteres.');
      return;
    }

    trackAnalytics('question_asked', trimmedInput);

    // Agregar mensaje del usuario
    const userMessage = createUserMessage(trimmedInput);
    setMessages(prev => [...prev, userMessage]);
    setUserInput("");

    // Mostrar indicador de "escribiendo..."
    setIsAIResponding(true);
    setIsTyping(true);

    try {
      // Usar sistema de respuestas inteligentes (fallback integrado)
      const aiResponse = getAILikeResponse(trimmedInput);

      // Detectar bucles
      const { text: finalText, isLoop } = detectLoopAndRespond(aiResponse.text, trimmedInput);

      // Actualizar contexto
      setCurrentContext(aiResponse.context);
      addPreferredTopic(aiResponse.context);

      // Simular delay de "pensamiento" para parecer más natural
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));

      // Actualizar historial de respuestas del bot
      setLastBotResponses(prev => [...prev.slice(-4), finalText]); // Mantener últimas 5

      const botResponse = createBotMessage(
        finalText,
        isLoop ? ["Hablar con asesor ahora", "Agendar llamada", "Volver al inicio"] : aiResponse.quickReplies
      );
      setMessages(prev => [...prev, botResponse]);

      /* NOTA: Si en el futuro se recarga crédito de Anthropic, descomentar este código
         y comentar el código anterior para usar la API real de Claude:

      // Preparar historial para la API
      const history = messages
        .filter(msg => msg.role)
        .map(msg => ({
          role: msg.role!,
          content: msg.text
        }));

      // Llamar a la API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedInput,
          history: history
        })
      });

      const data = await response.json();

      if (data.success) {
        const botResponse = createBotMessage(
          data.message,
          data.fallback ? ["Hablar con un asesor"] : undefined
        );
        setMessages(prev => [...prev, botResponse]);
      } else {
        // Fallback si falla
        const aiResponse = getAILikeResponse(trimmedInput);
        const fallbackResponse = createBotMessage(
          aiResponse.text,
          aiResponse.quickReplies
        );
        setMessages(prev => [...prev, fallbackResponse]);
      }
      */
    } catch (error) {
      console.error('Error al enviar mensaje:', error);

      // Fallback robusto usando respuestas inteligentes
      const aiResponse = getAILikeResponse(trimmedInput);
      const errorResponse = createBotMessage(
        aiResponse.text,
        aiResponse.quickReplies
      );
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsAIResponding(false);
      setIsTyping(false);

      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }
  };

  const handleWhatsAppDerivation = () => {
    trackAnalytics('whatsapp_derivation');

    // Generar resumen de la conversación
    const conversationSummary = messages
      .filter(msg => !msg.isBot)
      .slice(-3) // Últimos 3 mensajes del usuario
      .map(msg => msg.text)
      .join(', ');

    const message = conversationSummary
      ? `Hola, vengo del chat web. He estado preguntando sobre: ${conversationSummary}. Me gustaría hablar con un asesor.`
      : getWhatsAppMessage(currentContext);

    const phoneNumber = "593999454243"; // Número de WhatsApp de GoMotors
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const getBusinessHoursMessage = () => {
    if (isBusinessHours()) {
      return "Estamos en línea y listos para ayudarte";
    }
    return "Fuera de horario - Te contactamos mañana";
  };

  return (
    <>
      {/* Botón flotante */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.button
          onClick={toggleChat}
          className="relative bg-black hover:bg-neutral-800 text-white rounded-full p-4 shadow-lg transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaComments className="w-6 h-6" />

          {/* Badge de ayuda */}
          {!isOpen && (
            <motion.div
              className="absolute -top-2 -left-44 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3 }}
            >
              ¿Necesitas ayuda? 💬
            </motion.div>
          )}

          {/* Contador de mensajes no leídos */}
          {unreadCount > 0 && (
            <motion.div
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {unreadCount}
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Ventana de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[700px] bg-white rounded-lg shadow-2xl border border-neutral-200 z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-black text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <FaRobot className="text-black w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Asistente Virtual</h3>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${isBusinessHours() ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                    <span className="text-xs opacity-80">{getBusinessHoursMessage()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-neutral-300 transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.isBot
                        ? 'bg-white text-neutral-800 border border-neutral-200'
                        : 'bg-black text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>

                    {/* Botones de respuesta rápida */}
                    {message.isBot && message.quickReplies && (
                      <div className="mt-3 space-y-2">
                        {message.quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(reply)}
                            className="block w-full text-left px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm transition-colors border border-neutral-300"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Indicador de escritura */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-neutral-200 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer con input y botones */}
            <div className="p-4 bg-white border-t border-neutral-200 space-y-2">
              {/* Input de texto libre */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu pregunta..."
                  disabled={isAIResponding}
                  maxLength={500}
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm text-neutral-900 placeholder-neutral-400 bg-white disabled:bg-neutral-100 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isAIResponding || !userInput.trim()}
                  className="bg-black hover:bg-neutral-800 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>

              {/* Contador de caracteres */}
              {userInput.length > 0 && (
                <div className="text-xs text-neutral-500 text-right">
                  {userInput.length}/500
                </div>
              )}

              {/* Botón de WhatsApp */}
              <button
                onClick={handleWhatsAppDerivation}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span className="text-sm font-medium">Hablar con asesor</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Versión móvil - Pantalla completa */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex flex-col md:hidden"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3 }}
          >
            {/* Header móvil */}
            <div className="bg-black text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <FaRobot className="text-black w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Asistente GoMotors</h3>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${isBusinessHours() ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                    <span className="text-xs opacity-80">{getBusinessHoursMessage()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-neutral-300 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Mensajes móvil */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      message.isBot
                        ? 'bg-white text-neutral-800 border border-neutral-200'
                        : 'bg-black text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>

                    {/* Botones de respuesta rápida móvil */}
                    {message.isBot && message.quickReplies && (
                      <div className="mt-3 space-y-2">
                        {message.quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(reply)}
                            className="block w-full text-left px-4 py-3 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm transition-colors border border-neutral-300"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Indicador de escritura móvil */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-neutral-200 px-4 py-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer móvil */}
            <div className="p-4 bg-white border-t border-neutral-200 space-y-3">
              {/* Input de texto libre móvil */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu pregunta..."
                  disabled={isAIResponding}
                  maxLength={500}
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-neutral-900 placeholder-neutral-400 bg-white disabled:bg-neutral-100 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isAIResponding || !userInput.trim()}
                  className="bg-black hover:bg-neutral-800 text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="w-5 h-5" />
                </button>
              </div>

              {/* Contador de caracteres móvil */}
              {userInput.length > 0 && (
                <div className="text-xs text-neutral-500 text-right">
                  {userInput.length}/500
                </div>
              )}

              {/* Botón de WhatsApp móvil */}
              <button
                onClick={handleWhatsAppDerivation}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="font-medium">Hablar con asesor</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;