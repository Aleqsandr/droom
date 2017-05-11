import React, { Component } from 'react';
import {Layer, Rect, Stage, Group, Text} from 'react-konva';

import Charleston from './notes/Charleston.jsx';
import Kick from './notes/Kick.jsx';
import Snare from './notes/Snare.jsx';
import Symbal from './notes/Symbal.jsx';
import Tom from './notes/Tom.jsx';

// App component - represents the whole app
export default class BaseReceiver extends Component {

  render() {

    // return (
    //   <Group width={this.props.size} height={this.props.size} x={this.props.x + 25} note={this.props.note} keyCode={this.props.keyCode}>
    //          <Rect
    //              ref="rect"
    //              width={this.props.size}
    //              height={this.props.size}
    //              x={0}
    //              offset= {{
    //                   x: 25,
    //                   y: 25}}
    //              fill={this.props.color}
    //          />

    //          <Text
    //            text={this.props.letter}
    //            fontSize={30}
    //            x={this.props.size/2 - 5}
    //            y={this.props.size/2 - 30/2}
    //            offset= {{
    //                          x: 25,
    //                          y: 25}}
    //            fontFamily="Calibri"
    //            fill="white" />
    //        </Group>

    // )

    var node = null;
    switch(this.props.note) {
      case 46 :
        node = ( <Charleston y={this.props.size} hasToAnim={false} x={0} size={this.props.size} /> );
        break;

      case 38 :
        node = ( <Snare y={this.props.size} hasToAnim={false} x={0} size={this.props.size} />);
        break;

      case 49 :
        node = ( <Symbal y={this.props.size} hasToAnim={false} x={0} size={this.props.size} />);
        break;

      case 48 :
        node = ( <Tom y={this.props.size} hasToAnim={false} x={0} size={this.props.size} />);
        break;

      case 36 :
        node = ( <Kick y={this.props.size} hasToAnim={false} isKeyboard={true} realKey={this.props.isKeyboard} x={0} size={this.props.size} invisible/>);
        break;

      case 45 :
        node = ( <Tom y={this.props.size} hasToAnim={false} isKeyboard={true} x={0} size={this.props.size} />);
        break;

      case 43 :
        node = ( <Tom y={this.props.size} hasToAnim={false} x={0} size={this.props.size} />);
        break;

      case 51 :
        node = ( <Symbal y={this.props.size} hasToAnim={false} x={0} size={this.props.size} />);
        break;

      default :
        node = ( <Tom y={this.props.size} hasToAnim={false} x={0} size={this.props.size} />);
        break;
    }

    let letter = "";
    if(this.props.isKeyboard)
      letter = this.props.letter;

    return (
      <Group width={this.props.size} height={this.props.size} x={this.props.x + 25} y={this.props.size*0.5} note={this.props.note} keyCode={this.props.keyCode}>

        {node}

        <Text
          text={letter}
          fontSize={30}
          x={this.props.size/2 - 8}
          y={-this.props.size + 10}
          offset= {{
            x: this.props.size*0.5,
            y: this.props.size*0.5
          }}
          fontFamily="Calibri"
          fill="#FFC733" />
      </Group>
    );
  }
}
