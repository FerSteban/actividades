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
  es: {
    translation: {
      WELCOME_MESSAGE: '¡Bienvenido navegante!, ¿Que operacion desea realizar?, por ejemplo puede decir realiza resta de 4 y 3',
      HELLO_MESSAGE: 'Hola usuario, como va su dia!',
      HELP_MESSAGE: '¿En que puedo ayudarte usuario?, cualquier cosa relacionada con la calculadora estare a su disposición para explicarle a paso paso',
      GOODBYE_MESSAGE: '¡Que tengas un excelente dia usuario!, ¡vuelva pronto!',
      REFLECTOR_MESSAGE: 'Acabas de activar %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MESSAGE: 'Lo sentimos, ha habido un error. Inténtalo de nuevo.',
      VALIDATE_MESSAGE:'Solo se permiten numeros mayores a 0, intentelo de nuevo',
      SUMA_MESSAGE:'La suma de %s y %s es igual a %s',
      RESTA_MESSAGE:'La resta de %s y %s es igual a %s',
      MULTIPLI_MESSAGE:'La multiplicacion de %s y %s es igual a %s',
      DIVISION_MESSAGE:'La division de %s y %s es igual a %s'
      
    }
  },
  en:{
    translation: {
      WELCOME_MESSAGE: 'Welcome navigator! What operation do you want to perform? For example, you can say subtract 4 and 3',
      HELLO_MESSAGE: 'Hello user, how is your day going!',
      HELP_MESSAGE: 'How can I help you user? Anything related to the calculator I will be at your disposal to explain step by step',
      GOODBYE_MESSAGE: 'Have a great day user! Come back soon!',
      REFLECTOR_MESSAGE: 'Just of activate triggers %s',
      FALLBACK_MESSAGE: 'Sorry, I dont know anything about that. Please try again.',
      ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
      VALIDATE_MESSAGE:'Only numbers greater than 0 are allowed, try again',
      SUMA_MESSAGE:'The sum of %s and %s is equal to %s',
      RESTA_MESSAGE:'The subtraction of %s and %s is equal to %s',
      MULTIPLI_MESSAGE:'The multiplication of %s and %s is equal to %s',
      DIVISION_MESSAGE:'The division of %s and %s is equal to %s'
      
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

const SumaIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SumaIntent';
  },
  handle(handlerInput) {
    const {attributesManager} =handlerInput;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const intent = handlerInput.requestEnvelope.request.intent;
    
    const primernumero = parseFloat(handlerInput.requestEnvelope.request.intent.slots.primernumero.value);
    const segundonumero = parseFloat(handlerInput.requestEnvelope.request.intent.slots.segundonumero.value);
    const resultado = primernumero + segundonumero;

    const speakOutput = requestAttributes.t('SUMA_MESSAGE',primernumero,segundonumero,resultado);
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const RestaIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'RestaIntent';
  },
  handle(handlerInput) {
    const {attributesManager} =handlerInput;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const intent = handlerInput.requestEnvelope.request.intent;
    
    const primernumero = parseFloat(handlerInput.requestEnvelope.request.intent.slots.primernumero.value);
    const segundonumero = parseFloat(handlerInput.requestEnvelope.request.intent.slots.segundonumero.value);
    const resultado = primernumero - segundonumero;

    const speakOutput = requestAttributes.t('RESTA_MESSAGE',primernumero,segundonumero,resultado);
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const MultiplicaIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'MultiplicacionIntent';
  },
  handle(handlerInput) {
    const {attributesManager} =handlerInput;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const intent = handlerInput.requestEnvelope.request.intent;
    
    const primernumero = parseInt(handlerInput.requestEnvelope.request.intent.slots.primernumero.value);
    const segundonumero = parseInt(handlerInput.requestEnvelope.request.intent.slots.segundonumero.value);
    const resultado = primernumero * segundonumero;

    if(primernumero > 0 && segundonumero > 0){
         const speakOutput = requestAttributes.t('MULTIPLI_MESSAGE',primernumero,segundonumero,resultado);
    
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
        
    } 
    else{
        
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('VALIDATE_MESSAGE');
        
    
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }
    
  },
};

const DivisionIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DivisionIntent';
  },
  handle(handlerInput) {
    const {attributesManager} =handlerInput;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const intent = handlerInput.requestEnvelope.request.intent;
    
    const primernumero = parseInt(handlerInput.requestEnvelope.request.intent.slots.primernumero.value);
    const segundonumero = parseInt(handlerInput.requestEnvelope.request.intent.slots.segundonumero.value);
    const resultado = primernumero / segundonumero;
    
    if(primernumero > 0 && segundonumero > 0){
        const speakOutput = requestAttributes.t('DIVISION_MESSAGE',primernumero,segundonumero,resultado);
    
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
        
    }else{
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('VALIDATE_MESSAGE');
    
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
        
    }

    
  },
};

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
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
      fallbackLng: 'es',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        SumaIntentHandler,
        RestaIntentHandler,
        MultiplicaIntentHandler,
        DivisionIntentHandler,
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