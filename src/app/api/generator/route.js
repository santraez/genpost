import { NextResponse } from "next/server"
import translate from "translate-google-api"
import { createApi } from "unsplash-js"
import { Configuration, OpenAIApi } from "openai"

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY
})

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY_1
})

const openai = new OpenAIApi(configuration)

export async function POST(request) {
  if (!configuration.apiKey) {
    return NextResponse.error({
      status: 500,
      message: "OpenAI API key not configured"
    })
  }
  try {
    const { prompt, lang, origin } = await request.json()
    if (prompt.trim().length < 3) {
      return NextResponse.error({
        status: 400,
        message: "Please enter a valid prompt"
      })
    }
    const isDouble = prompt.trim().length <= 5
    const translateResult = await translate((isDouble) ? prompt + " " + prompt : prompt, {
      tld: "com",
      to: "en"
    })
    const translatedPrompt = ((isDouble) ? translateResult[0].split(" ").slice(0, -1).join(" ") : translateResult[0]) || prompt
    const getPhotos = await searchPhotos(translatedPrompt)
    if (getPhotos.status !== "success") {
      return NextResponse.error({
        status: 500,
        message: "An error occurred during your image request."
      })
    }
    const randomPhotos = [];
    while (randomPhotos.length < ((getPhotos.total > 7) ? 7 : getPhotos.total)) {
      const index = Math.floor(Math.random() * getPhotos.urls.length)
      const element = getPhotos.urls[index]
      if (!randomPhotos.includes(element)) {
        randomPhotos.push(element)
      }
    }
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(translatedPrompt, lang),
      temperature: 1, // 0 = deterministic, 1 = random
      max_tokens: 2000,
      top_p: 1 // 0 = no randomness, 1 = complete randomness
    })
    const phrasesArray = JSON.parse(completion.data.choices[0].text)
    if (completion.status !== 200 || typeof phrasesArray !== "object" || phrasesArray.length !== 7) {
      return NextResponse.error({
        status: 500,
        message: "An error occurred during your request."
      })
    }
    const randomTmps = []
    while (randomTmps.length < 7) {
      const tmp = Math.floor(Math.random() * 14) + 1
      if (!randomTmps.includes(tmp)) {
        randomTmps.push(tmp)
      }
    }
    console.log("🚀 ~ file: route.js:67 ~ POST ~ randomTmps:", randomTmps)
    const urlsCanvas = new Array(randomPhotos.length).fill("/api/images?").map((path, index) => `${path}url=${randomPhotos[index].slice(34)}&phs=${phrasesArray[index]}&org=${origin}`)
    const urlsColors = new Array(7 - randomPhotos.length).fill("/api/colors?").map((path, index) => `${path}phs=${phrasesArray[index + randomPhotos.length]}&org=${origin}`)
    const preUrls = (urlsCanvas.length < 7) ? urlsCanvas.concat(urlsColors) : urlsCanvas
    const finalUrls = preUrls.map((path, index) => `${path}&tmp=${randomTmps[index]}`)
    return NextResponse.json({
      status: "success",
      urls: finalUrls
    })
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
      return NextResponse.error({
        status: error.response.status,
        message: error.response.data.error.message
      })
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      return NextResponse.error({
        status: 500,
        message: "An error occurred during your request."
      })
    }
  }
}

function generatePrompt (prompt, lang) {
  return (`
    P: I want 7 phrases translated into Spanish language that are creative, original and useful tips, curiosities or ideas related to the study, profession, work or business of Programming. These phrases should be brief, concise, funny, positive, sarcastic and entertaining. The length of the phrases should not exceed 70 characters. It is important that your response is within [] and that the 7 phrases are translated into the Spanish language.
    R:
      [
        "El código bien escrito es como un unicornio, todos hablan de él pero nadie lo ha visto realmente",
        "Un buen programador es alguien que odia tanto los errores como los lunes",
        "El mejor consejo que puedo darte es que siempre hagas una copia de seguridad",
        "La programación es como un lenguaje extraterrestre, pero con menos gramática",
        "El código no miente, pero a veces esconde la verdad",
        "La mejor forma de encontrar un error es enviar el código a producción",
        "No te preocupes por el código feo, siempre puedes justificarlo como 'carácter personal'"
      ]
    P: I want 7 phrases translated into ${lang} language that are creative, original and useful tips, curiosities or ideas related to the study, profession, work or business of ${prompt}. These phrases should be brief, concise, funny, positive, sarcastic and entertaining. The length of the phrases should not exceed 70 characters. It is important that your response is within [] and that the 7 phrases are translated into the ${lang} language.
    R:
    
  `)
  // return (`
  //   P: I want 12 phrases translated into Spanish language that are creative, original and useful tips, curiosities or ideas related to the study, profession, work or business of Programming. These phrases should be brief, concise, funny, positive, sarcastic and entertaining. The length of the phrases should not exceed 70 characters. It is important that your response is within [] and that the 12 phrases are translated into the Spanish language.
  //   R:
  //     [
  //       "Programar es como hacer magia, pero sin saber cómo funciona el sombrero.",
  //       "Un buen programador es alguien que odia tanto los errores como los lunes.",
  //       "El mejor consejo que puedo darte es que siempre hagas una copia de seguridad.",
  //       "La programación es como un lenguaje extraterrestre, pero con menos gramática.",
  //       "El código no miente, pero a veces esconde la verdad.",
  //       "La mejor forma de encontrar un error es enviar el código a producción.",
  //       "No te preocupes por el código feo, siempre puedes justificarlo como 'carácter personal'.",
  //       "El código bien escrito es como un unicornio, todos hablan de él pero nadie lo ha visto realmente.",
  //       "Programar es como construir un castillo de arena, nunca sabes cuándo llegará la próxima ola.",
  //       "Un buen programador es aquel que puede hacer que la tecnología funcione para los demás.",
  //       "La programación es como jugar al Tetris; siempre hay una mejor solución.",
  //       "La rutina siempre hace que un programador se vuelva obsoleto. ¡Asegúrate de mantenerte actualizado!"
  //     ]
  //   P: I want 12 phrases translated into ${lang} language that are creative, original and useful tips, curiosities or ideas related to the study, profession, work or business of ${prompt}. These phrases should be brief, concise, funny, positive, sarcastic and entertaining. The length of the phrases should not exceed 70 characters. It is important that your response is within [] and that the 12 phrases are translated into the ${lang} language.
  //   R:
    
  // `)
}

async function searchPhotos (keywords) {
  try {
    const getPhotos = await unsplash.search.getPhotos({
      query: keywords,
      page: 1,
      perPage: 18,
      orderBy: "relevant",
      contentFilter: "high",
      orientation: "squarish"
    })
    if (getPhotos.type !== "success") {
      return {
        status: getPhotos.type,
        message: getPhotos.errors[0]
      }
    }
    return {
      status: getPhotos.type,
      total: getPhotos.response.total,
      urls: getPhotos.response.results.map((photo) => photo.urls.regular),
    }
  } catch (error) {
    return {
      status: "error",
      message: error.message
    }
  }
}
