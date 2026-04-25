import { useState, useEffect, useEffectEvent } from "react";

function Carousel({ imagesList }) {
    const [currentImage, setCurrentImage] = useState(0)
    const onPush = (side) => {
        if (side === 'left'){
            if(currentImage==0) setCurrentImage(imagesList.length-1)
            else setCurrentImage(currentImage - 1)
        }
        if (side === 'right') setCurrentImage((currentImage + 1) % imagesList.length)
    }
    if (!imagesList || imagesList.length === 0) {
        return <div className="w-128 h-full bg-gray-200 rounded-xl flex items-center justify-center">
            <p className="text-gray-400 text-sm">No photos yet</p>
        </div>
    }
    return (
        <div className="flex flex-col items-center gap-2 w-128">

            <img src={imagesList[currentImage].image} className="w-full h-full object-cover rounded-xl" />
            <div className="flex gap-4">
                <button onClick={() => onPush('left')} >←</button>
                <span className="text-sm text-gray-400">{currentImage + 1} / {imagesList.length}</span>
                <button onClick={() => onPush('right')}>→</button>
            </div>
        </div>
    )
}

export default Carousel