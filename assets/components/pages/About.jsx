import React, { Component } from 'react';
import {Link} from 'react-router';

// App component - represents the whole app
export default class About extends Component{
    render(){
        return(
            <div className="About-container">
                <Link to="/"><div className="back"></div></Link>
                <p className="title">ABOUT</p>
                <p className="text">Lorem Elsass Ipsum mitt picon bière munster du ftomi! Ponchour bisame. Bibbeleskaas jetz rossbolla sech choucroute un schwanz geburtstàg, Chinette dû, ìch bier deppfele schiesser. Flammekueche de knèkes Seppele gal! a hopla geburtstàg, alles fraü Chulia Roberts oder knäckes dûû blottkopf. Noch bredele schissabibala, yetz Chorchette de Scharrarbergheim. Kouglopf ech ìch wurscht gueut mitt schneck jetz a schiss mannele, knèkes saucisse de Niederhausbergen of fill mauls schéni fleischwurcht schnaps de eme gal nüdle blottkopf, de Chulien Roger hop pfourtz! Kouglopf ech ìch wurscht gueut mitt schneck jetz a schiss mannele, knèkes saucisse de Niederhausbergen of fill mauls schéni fleischwurcht schnaps de eme gal nüdle blottkopf, de Chulien Roger hop pfourtz! bett mer ech schpeck un salami schmutz. Gal!</p>
                <br />
                <div className="names">
                    <a href="http://www.matthieubessol.com"><p className="text name">Matthieu Bessol</p></a>
                    <a href="http://www.aleqsandr.fr"><p className="text name">Alexandre Reho</p></a>
                    <a href="http://www.noisiv.fr"><p className="text name">Lucas Dussouchaud</p></a>
                </div>
            </div>
        );
    }
}
