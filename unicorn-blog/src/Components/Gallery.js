import React from 'react';

const Gallery = (props) => {
    return (
        //Affichage de la gallerie photos récupérée grace au props.photos
        <div className="Signup-main-content">
            <h1>Gallery</h1>
            <ul className='gallery-photos'>
            {props.photos.slice(0,10).map((photo) => 
            <li key={photo.id}>
                <img src={photo.url} alt={photo.title}></img>
            </li>
            )}
            </ul>
        </div>
    );
}

export default Gallery;