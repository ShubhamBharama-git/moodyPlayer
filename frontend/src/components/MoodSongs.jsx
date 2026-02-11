import React, { useState } from 'react'

const MoodSongs = () => {

    const [Songs, setSongs] = useState([
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url",
        },
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url",
        },
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url",
        },
    ])

    return (
        <div className='w-full pt-20'>
            {Songs.map((song) => (
                <div className='p-2 flex justify-between items-center'>
                    <div>
                        <h3>{song.title}</h3>
                        <h2>{song.artist}</h2>
                    </div>
                    <div>
                        <i class="ri-play-fill"></i>
                        <i class="ri-pause-mini-line"></i>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default MoodSongs