import React from 'react';
import Featured from '../Featured/Featured'
import carad from './carad.jpg'
import './Home.scss'

export default function Home(props){
    return(
        <div>
            <div ><img className="banner" src={carad} alt="banner"></img></div>
            <Featured />
        </div>
    )
}