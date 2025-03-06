import { useCallback, useRef, useState } from 'react'
import artistsFile from './assets/artists.txt'
import { useEffect } from 'react'
import Image from './components/image'

function App() {
    const [artistsList, setArtistsList] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [preview, setPreview] = useState(false);
    const [currentList, setCurrentList] = useState([]);
    const index = useRef(0);

    function add() {
        setCurrentList([...currentList, ...artistsList.slice(index.current, index.current + 40)]);
        index.current += 40;
    }

    useEffect(() => {
        function onScroll() {
            if (window.innerHeight + window.scrollY + 200 >= document.body.offsetHeight) {
                add();
            }
        }
        addEventListener('scroll', onScroll);

        return () => {
            removeEventListener('scroll', onScroll);
        }
    }, [currentList, artistsList]);

    useEffect(() => {
        if (artistsList) {
            add();
        }
    }, [artistsList]);

    // on load
    useEffect(() => {
        (async () => {
            const response = await fetch(artistsFile);
            const data = await response.text();
            const artists = data.split('\n');
            setArtistsList(artists);
        })();

        addEventListener('mouseup', () => {
            setPreview(false);
        });
        addEventListener('touchend', () => {
            setPreview(false);
        });
    }, []);

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-5xl font-regular text-center p-5">Artists</h1>

                <div className="w-full bg-gray-100 mt-4 text-md p-4 rounded-lg shadow-md">
                    <p>Welcome to the Artists Viewer! This list showcases artists tagged in Danbooru.</p>
                    <p>Click and hold an image to enlarge it.</p>
                    <p>Click the copy icon to copy the artist's name to your clipboard.</p>
                    <p>Scroll down to load more artists.</p>
                    <br/>
                    <p>All images are generated using NovelAI Diffusion v4 (full version).</p>
                    <p>Artist tags were weakened using double brackets ( [[  ]] ) to balance v4's strong artist tag influence.</p>
                    <br/>
                    <p>Generation Settings:</p>
                    <p>Model: nai-diffusion-4-full</p>
                    <p>Prompt: 1girl, solo, komeiji koishi, touhou, [[artist:<bold>ARTIST_NAME</bold>]], blonde hair, wings, red eyes, rating:general, sky, falling petals, upper body, hand on own chest, hand up, happy, looking at viewer, straight-on, outdoors, petals, sky, no text, volumetric lighting, best quality, very aesthetic, absurdres</p>
                    <p>Undesired Content: blurry, lowres, error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, multiple views, logo, too many watermarks, sagging breasts</p>
                    <p>Resolution: 1024x1024</p>
                    <p>Steps: 20</p>
                    <p>Sampler: Euler Ancestral (karras)</p>
                    <p>Prompt Guidance: 6</p>
                    <p>Prompt Guidance Rescale: 0</p>
                    <p>Undesired Content Strength: 0</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {
                        currentList &&
                        currentList.map((artist, index) => (
                            <Image key={index} index={index} artist={artist} onMouseDown={() => {
                                setSelectedArtist(`/${artist}_1.webp`);
                                setPreview(true);
                            }} />
                        ))
                    }
                </div>
            </div>

            <div className={`w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black/50 z-50 transition-opacity duration-150 backdrop-blur-xs pointer-events-none
                    ${preview ? 'opacity-100' : 'opacity-0'}
                `}>
                <div className="max-w-[90%] max-h-[90%] aspect-square select-none shadow-2xl">
                    <img src={selectedArtist} alt="selected artist" className="rounded-xl" draggable={false}/>
                </div>
            </div>
        </>
    )
}

export default App
