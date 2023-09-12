import { ImageResponse } from "next/server"
import templates from "./templates.json"

export async function GET(request) {
  const phrase = request.nextUrl.searchParams.get("phs")
  const origin = request.nextUrl.searchParams.get("org")
  const tmp = request.nextUrl.searchParams.get("tmp")
  const { width, height, rotate, color, top, left } = templates[`t${tmp}`]
  const variance = ((width / height) >= 1) ? 1 : (width / height)
  const length = phrase.length
  const fontSize = Math.sqrt((width * height * variance) / length)
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
          alignItems: "center",
        }}
      >
        <img
          src={`${origin}/assets/color-temp-${tmp}.png`}
          style={{
            width: "300px",
            height: "300px",
            position: "absolute",
            top: "0px",
            left: "0px",
            zIndex: "0",
          }}
        />
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            position: "absolute",
            top: `${top}px`,
            left: `${left}px`,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `rotate(${rotate}deg)`,
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
              color: color,
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
      height: 300,
      // fonts: {
      //   name: string,
      //   data: ArrayBuffer,
      //   weight: number,
      //   style: 'normal' | 'italic'
      // }
    }
  )
}
