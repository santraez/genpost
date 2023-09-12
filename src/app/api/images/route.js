import { ImageResponse } from "next/server"
import templates from "./templates.json"

export async function GET(request) {
  const url = request.nextUrl.searchParams.get("url")
  const phrase = request.nextUrl.searchParams.get("phs")
  const origin = request.nextUrl.searchParams.get("org")
  const tmp = request.nextUrl.searchParams.get("tmp")
  const { text, image } = templates[`t${tmp}`]
  const length = phrase.length
  const variance = ((text.width / text.height) >= 1) ? 1 : (text.width / text.height)
  const fontSize = Math.sqrt((text.width * text.height * variance) / length)
  return new ImageResponse(
    (
      <div
        style={{
          width: "300px",
          height: "300px",
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img
          src={`${origin}/assets/image-temp-${tmp}.png`}
          style={{
            width: "300px",
            height: "300px",
            position: "absolute",
            top: "0px",
            left: "0px",
            zIndex: "0",
          }}
        />
        <img
          src={`https://images.unsplash.com/photo-${url}`}
          style={{
            width: `${image.width}px`,
            height: `${image.height}px`,
            position: "absolute",
            top: `${image.top}px`,
            left: `${image.left}px`,
            borderRadius: `${image.borderRadius}px`,
            transform: `rotate(${image.rotate}deg)`,
            zIndex: "5",
          }}
        />
        <div
          style={{
            width: `${text.width}px`,
            height: `${text.height}px`,
            position: "absolute",
            top: `${text.top}px`,
            left: `${text.left}px`,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `rotate(${text.rotate}deg)`,
            overflow: "hidden",
            zIndex: "3"
          }}
        >
          <p
            style={{
              width: "100%",
              maxHeight: "100%",
              fontSize: `${fontSize}px`,
              fontWeight: "700",
              lineHeight: `${fontSize + 3}px`,
              color: text.color,
              margin: "0px",
              padding: "0px",
              textAlign: "center",
              wordWrap: "break-word"
            }}
          >
            {phrase}
          </p>
        </div>
      </div>
    ),
    {
      debug: false,
      width: 300,
      height: 300
    }
  )
}
