import { ImageResponse } from "next/server"

export async function GET(request) {
  const phrase = request.nextUrl.searchParams.get("phrase")
  return new ImageResponse(
    (
      <div
        style={{
          width: "300px",
          height: "300px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "linear-gradient(to right, #f44336, #2196f3)"
        }}
      >
        <div
          style={{
            width: "250px",
            height: "250px",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: "25px",
            left: "25px",
            borderRadius: "20px",
            background: "#2196f3",
            background: "-webkit-linear-gradient(to left, #f44336, #2196f3)",
            background: "linear-gradient(to left, #f44336, #2196f3)",
            opacity: "0.7"
          }}
        >
          <p
            style={{
              width: "100%",
              height: "auto",
              color: "white",
              fontSize: "25px",
              fontWeight: "700",
              textAlign: "center",
              margin: "0px",
              padding: "0 20px",
              boxSizing: "border-box"
            }}
          >
            {phrase}
          </p>
        </div>
      </div>
    ),
    {
      width: 300,
      height: 300,
      debug: false
    }
  )
}
