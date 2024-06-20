import GalleryItem from './GalleryItem'

export default function Gallery({ data }) {
    const result = data.result.read()

    const display = result.map((item, index) => {
        return (
            <GalleryItem item={item} key={index} />
        )
    })

    return (
        <div>
            {display}
        </div>
    )
}
