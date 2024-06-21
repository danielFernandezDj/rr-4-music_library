import GalleryItem from './GalleryItem';

const Gallery = (props) => {
    try {
        // Access the read method from the passed data
        const data = props.data.result.read();

        // Map the data to GalleryItem components
        const display = data.map((item, index) => (
            <GalleryItem item={item} key={index} />
        ));

        return <div>{display}</div>;
    } catch (error) {
        console.error("Error while reading data:", error);
        return <div>Error loading gallery data.</div>;
    }
};

export default Gallery;
