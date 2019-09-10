import React from 'react';
import Featured from '../Featured/Featured'
import carad from './carad.jpg'
import './Home.scss'

export default function Home(props){
    return(
        <div>
            <div className="Banner-div">
                <img className="banner" src={carad} alt="banner"></img>
                <div className="Landing-text">
                    <h1>Find your new ride.</h1>
                    <h2>Your search ends here.</h2>
                </div>
            </div>
            <Featured />
        </div>
    )
}