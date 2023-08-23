import Image from "next/image"

export interface ImageProps {
  id: number
  height: string
  width: string
  public_id: string
  format: string
  blurDataUrl?: string
  url: string
}

export default Image