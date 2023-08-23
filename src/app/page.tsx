import { ImageCloudinary } from "@/components/ImageCloudinary"
import cloudinary from "@/utils/cloudinary"
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder"
import { ImageProps } from "@/utils/image"

export default async function Gallery() {

  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()

  const images: ImageProps[] = results.resources.map(function mapResultToImageProps(resource: any, index: number) {
    return {
      id: index,
      height: resource.height,
      width: resource.width,
      public_id: resource.public_id,
      format: resource.format,
      url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1000/${resource.public_id}.${resource.format}`
    }
  })

  const blurImagePromises = images.map((img: ImageProps) => getBase64ImageUrl(img))
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < images.length; i++) {
    images[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  return (
    <main className="w-full min-h-screen flex flex-col items-center h-full">
      <section className="grid grid-flow-dense p-0 m-0 w-[90%] top-5 gap-4  grid-cols-4 h-full">
        {images.map((img) => {
          return (
            <div key={img.id} className="relative w-full h-full container-image" >
              <ImageCloudinary
                width={500}
                height={500}
                alt="bicycle image"
                className="object-cover rounded-2xl w-full h-full"
                placeholder="blur"
                blurDataURL={img.blurDataUrl}
                src={img.url}
              />
            </div>

          )
        })}
      </section>

    </main>
  )
}
