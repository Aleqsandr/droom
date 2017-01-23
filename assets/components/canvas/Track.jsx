import React, { Component } from 'react';

export default class Track extends Component
{
    render()
    {
        return (
            <div className="trackelement">
                <div className="live"><p>LIVE</p></div>
                <div className="repeat"><p>REPEAT</p></div>
            </div>
        );
    }
}
