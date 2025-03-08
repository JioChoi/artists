import { useCallback, useRef, useState } from 'react'
import artistsFile from './assets/artists.txt'
import scoredFile from './assets/scored.txt'
import scoredFile2 from './assets/scored2.txt'
import { useEffect } from 'react'
import Image from './components/image'
import { md5 } from 'js-md5'

function App() {
    const [artistsList, setArtistsList] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [preview, setPreview] = useState(false);
    const [currentList, setCurrentList] = useState([]);
    const index = useRef(0);

    function add(clear=false) {
        let temp = currentList;
        if (clear) {
            index.current = 0;
            temp = [];
        }
        setCurrentList([...temp, ...artistsList.slice(index.current, index.current + 40)]);
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
            add(true);
        }
    }, [artistsList]);

    async function setArtistList(type) {

        if (type == 0) {
            const response = await fetch(artistsFile);
            const data = await response.text();
            const artists = data.split('\n');
            setArtistsList(artists);
        }
        else if (type == 1) {
            const response = await fetch(scoredFile);
            const data = await response.text();
            const artists = data.split('\n');
            setArtistsList(artists);
        }
        else if (type == 2) {
            const response = await fetch(scoredFile2);
            const data = await response.text();
            const artists = data.split('\n');
            setArtistsList(artists);
        }
    }

    // on load
    useEffect(() => {
        setArtistList(0);

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

                <select onChange={(e) => setArtistList(e.target.value)} className="w-48 mt-8 p-2 rounded-lg outline-1 outline-zinc-300 lg:hover:cursor-pointer lg:hover:outline-zinc-600">
                    <option value="0">Sort by image count</option>
                    <option value="1">Sort by quality (SCORA)</option>
                    <option value="2">Sort by quality (SCORB)</option>
                </select>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    {
                        currentList &&
                        currentList.map((artist, index) => {
                            let filename = md5(artist.trim());

                            return <Image key={index} index={index} artist={artist} filename={filename} onMouseDown={() => {
                                setSelectedArtist(`images/${filename}.webp`);
                                setPreview(true);
                            }} />
                        })
                    }
                </div>
            </div>

            <div className={`w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black/50 z-50 transition-opacity duration-150 backdrop-blur-xs pointer-events-none
                    ${preview ? 'opacity-100' : 'opacity-0'}
                `}>
                <div className="max-w-[90%] max-h-[90%] aspect-square select-none shadow-2xl">
                    <img src={selectedArtist} alt="selected artist" className="w-full rounded-xl aspect-square object-cover" draggable={false}/>
                </div>
            </div>
        </>
    )
}

export default App
