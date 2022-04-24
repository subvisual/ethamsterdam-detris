import { NFTStorage, File } from 'nft.storage'
import { getFilesFromPath } from 'files-from-path'

const token = process.env.TOKEN

async function main() {
  const path = process.argv.slice(2)
  let assetId = 0;
  let metadataList = [];

  async function uploadFiles(type, color, quantity) {
    const innerPath = `${path}/${type}/${color}`;

    for (let i=0; i<quantity; i += 1) {
      var f = new File([`/${type}/${color}; asset id: ${assetId}; v2`], "detris/game-type.txt", {type: "text/plain"})
      console.log(innerPath, i)

      const files = await getFilesFromPath(innerPath)

      const storage = new NFTStorage({ token })

      console.log(`storing ${files.length} file(s) from ${innerPath}`)
      const cid = await storage.storeDirectory([...files, f], {
          pathPrefix: "detris/",
      })
      const metadata = {
        image: `https://ipfs.io/ipfs/${cid}/detris/preview.png`,
        name: `Detris #${assetId}`,
        description: "Detris! A playable nft. Play anywhere, everywhere.",
        animation_url: `https://ipfs.io/ipfs/${cid}/detris`,
        attributes: [
          {
            trait_type: "Detris Type",
            value: type,
          },
          {
            trait_type: "Color Scheme",
            value: color,
          },
        ]
      }


      metadataList.push(new File([JSON.stringify(metadata)], `${assetId}`, {type: "application/json"}));
      const status = await storage.status(cid)
      console.log(status, "Code status")
      assetId += 1;
    }
  }

  // DEMO ASSETS DEPLOYED
  await uploadFiles("solid", "detris", 4)
  await uploadFiles("border", "detris", 3)
  await uploadFiles("border pieces", "detris", 2)
  await uploadFiles("neon", "detris", 2)
  await uploadFiles("single", "detris", 1)
  await uploadFiles("inverted", "detris", 1)


  // ASSETS TO DEPLOY FOR A 99 COLLECTION
  // await uploadFiles("solid", "detris", 42)
  // await uploadFiles("solid", "palette76", 9)
  // await uploadFiles("solid", "palette7998", 2)

  // await uploadFiles("border", "detris", 19)
  // await uploadFiles("border", "palette76", 4)
  // await uploadFiles("border", "palette7998", 1)

  // await uploadFiles("border pieces", "detris", 9)
  // await uploadFiles("border pieces", "palette76", 2)
  // await uploadFiles("border pieces", "palette7998", 1)

  // await uploadFiles("neon", "detris", 3)
  // await uploadFiles("neon", "palette76", 2)
  // await uploadFiles("neon", "palette7998", 1)

  // await uploadFiles("single", "white", 3)

  // await uploadFiles("inverted", "black", 1)

  const storage = new NFTStorage({ token })
  const cid = await storage.storeDirectory(metadataList, {})
}

main()
