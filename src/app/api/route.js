import { NextResponse } from "next/server"
import pkg from "/package.json"

export function GET() {
  return NextResponse.json({
    name: pkg.name,
    description: pkg.description,
    author: pkg.author,
    version: pkg.version
  })
}
