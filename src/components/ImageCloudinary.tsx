import Image, { ImageProps } from "next/image"


export function ImageCloudinary(props: ImageProps) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image {...props} />
  )

}