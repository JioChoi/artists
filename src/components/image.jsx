


export default function Image({index, onMouseDown, artist, filename}) {
    return (
        <div key={index} className="relative bg-gray-100 text-center text-base rounded-lg shadow-md select-none">
            <div
                id={index} className="flex justify-center items-center absolute top-0 left-0 z-50 bg-black/50 w-full aspect-square text-white text-base opacity-0 rounded-lg pointer-events-none"
            >Copied!</div>
            <div className="absolute right-1 top-1 z-50 bg-black/50 w-8 h-8 flex justify-center items-center rounded-full lg:hover:brightness-90 hover:cursor-pointer"
                onClick={() => {
                    navigator.clipboard.writeText("artist:" + artist);
                    document.getElementById(index).classList.add('copyAnimation');
                    setTimeout(() => {
                        document.getElementById(index).classList.remove('copyAnimation');
                    }, 1000);
                }}
            >
                <span className="mingcute--copy-line w-6 h-6 text-white"></span>
            </div>
            <div className="absolute flex justify-center items-top w-full aspect-square text-white text-base opacity-0 lg:hover:cursor-pointer lg:hover:opacity-100 drop-shadow-md"
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
            >
                hold to enlarge
            </div>
            <img loading="lazy" src={`https://huggingface.co/datasets/Jio7/artists/resolve/main/${filename}.webp`} alt={artist} className="w-full aspect-square object-cover overflow-hidden rounded-lg rounded-b-none select-none" />
            {artist}
        </div>
    )
}