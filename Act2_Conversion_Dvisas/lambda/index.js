/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'.
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
  en: {
    translation: {
      WELCOME_MESSAGE: 'Welcome user! What conversion do you want to perform?',
      HELLO_MESSAGE: 'Hello User!',
      HELP_MESSAGE: 'How can I help you, user? I will be at your disposal to explain in detail how currency conversion works.',
      GOODBYE_MESSAGE: 'Have a great day user! Come back soon!',
      REFLECTOR_MESSAGE: 'You just triggered %s',
      FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
      ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
      VALIDATE_MESSAGE:'Please user, only positive numbers and values greater than 0 are accepted, such as converting 5 euros to dollars',
      //msg de respuesta a las conversiones de divisas
      EURODOLAR_MESSAGE:'The result of your conversion is %s euros equals %s in dollars',
      DOLAREURO_MESSAGE:'The result of your conversion is %s dollars equals %s in euros',
      PESODOLARE_MESSAGE:'The result of your conversion is %s Mexican pesos equivalent to %s in dollars',
      DOLAREPESO_MESSAGE:'The result of your conversion is %s dollars equivalent to %s in Mexican pesos',
      PESOEURO_MESSAGE:'The result of your conversion is %s Mexican pesos equivalent to %s in euros',
      EUROPESO_MESSAGE:'The result of your conversion is %s euros equivalent to %s in Mexican pesos'
      
    }
  },
  es:{
    translation: {
      WELCOME_MESSAGE: '¡Bienvenido usuario!. ¿Qué conversión desea realizar?',
      HELLO_MESSAGE: '¡Hola usuario!',
      HELP_MESSAGE: '¿En que puedo ayudarte usuario?, estare a tu disposición para explicarte en detalle como funciona la conversión de divisas',
      GOODBYE_MESSAGE: '¡Que tengas un excelente dia usuario!, ¡vuelva pronto!',
      REFLECTOR_MESSAGE: 'Acabas de activar %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MESSAGE: 'Lo siento, hay un problema intentelo de nuevo',
      VALIDATE_MESSAGE:'Por favor usuario solo se aceptan numeros positivos y mayores a 0, como por ejemplo convertir 5 euros a dolares',
      //msg de respuesta a las conversiones de divisas
      EURODOLAR_MESSAGE:'El resultado de su conversion es de %s euros equivale a %s en dolares',
      DOLAREURO_MESSAGE:'El resultado de su conversion es de %s dolares equivale a %s en euros',
      PESODOLARE_MESSAGE:'El resultado de su conversion es de %s pesos mexicanos equivale a %s en dolares',
      DOLAREPESO_MESSAGE:'El resultado de su conversion es de %s euros equivale a %s en pesos mexicanos',
      PESOEURO_MESSAGE:'El resultado de su conversion es de %s pesos mexicanos equivale a %s en euros',
      EUROPESO_MESSAGE:'El resultado de su conversion es de %s euros equivale a %s en pesos mexicanos'
      
    }
  }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const convertir_euro_dolar_Handler ={
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) ==='IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'convertir_euro_dolar'
    },
    handle(handlerInput){
    const {attributesManager} =handlerInput;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const intent = handlerInput.requestEnvelope.request.intent;
        
    const cantidad = handlerInput.requestEnvelope.request.intent.slots.cantidad.value;
    if (cantidad>0.1)
    {
        const valor =1.09;
        const resultado = (cantidad*valor).toFixed(2);
        const speechText = requestAttributes.t('EURODOLAR_MESSAGE',cantidad,resultado);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }else{
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('VALIDATE_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }
    }
}


const Convertir_dolar_euro_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'conversor_dolar_euros';
    },
    handle(handlerInput) {
    const {attributesManager} =handlerInput;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const intent = handlerInput.requestEnvelope.request.intent;
    
    const cantidad = handlerInput.requestEnvelope.request.intent.slots.cantidad.value;
    if (cantidad >= 0.1){
        const valor = 1.09;
        const resultado = (cantidad / valor).toFixed(2);
        const speechText = requestAttributes.t('DOLAREURO_MESSAGE',cantidad,resultado);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }else{
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('VALIDATE_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }
    }
}

const Convertir_peso_dolar_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'conversor_mx_dolares';
    },
    handle(handlerInput) {
    const {attributesManager} =handlerInput;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const intent = handlerInput.requestEnvelope.request.intent;
    
    const cantidad = handlerInput.requestEnvelope.request.intent.slots.cantidad.value;
    if (cantidad >= 0.1){
        const valor = 17.56;
        const resultado = (cantidad / valor).toFixed(2);
        const speechText = requestAttributes.t('PESODOLARE_MESSAGE',cantidad,resultado);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }else{
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('VALIDATE_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }
    }
}


const Convertir_dolar_peso_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'conversor_dolares_mx';
        
    },
    handle(handlerInput) {
    const {attributesManager} =handlerInput;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const intent = handlerInput.requestEnvelope.request.intent;
    
    const cantidad = handlerInput.requestEnvelope.request.intent.slots.cantidad.value;
    if (cantidad >= 0.1){
        const valor = 17.56;
        const resultado = (cantidad * valor).toFixed(2);
        const speechText = requestAttributes.t('DOLAREPESO_MESSAGE',cantidad,resultado);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }else{
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('VALIDATE_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }
    }
}


const Convertir_peso_euro_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'conversor_mx_euros';
    },
    handle(handlerInput) {
    const {attributesManager} =handlerInput;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const intent = handlerInput.requestEnvelope.request.intent;
    
    const cantidad = handlerInput.requestEnvelope.request.intent.slots.cantidad.value;
    if (cantidad >= 0.1){
        const valor = 19.03;
        const resultado = (cantidad / valor).toFixed(2);
        const speechText = requestAttributes.t('PESOEURO_MESSAGE',cantidad,resultado);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }else{
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('VALIDATE_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }
    }
}

const Convertir_euro_peso_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'conversor_euros_mx';
    },
    handle(handlerInput) {
    const {attributesManager} =handlerInput;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const intent = handlerInput.requestEnvelope.request.intent;
    
    const cantidad = handlerInput.requestEnvelope.request.intent.slots.cantidad.value;
    if (cantidad >= 0.1){
        const valor = 19.03;
        const resultado = (cantidad * valor).toFixed(2);
        const speechText = requestAttributes.t('EUROPESO_MESSAGE',cantidad,resultado);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }else{
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('VALIDATE_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }
    }
}



const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};


// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        convertir_euro_dolar_Handler,
        Convertir_dolar_euro_Handler,
        Convertir_peso_dolar_Handler,
        Convertir_dolar_peso_Handler,
        Convertir_peso_euro_Handler,
        Convertir_euro_peso_Handler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .addRequestInterceptors(LocalizationInterceptor,LoggingRequestInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .lambda();