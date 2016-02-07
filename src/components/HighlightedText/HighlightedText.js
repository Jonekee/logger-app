import React, { Component, PropTypes } from 'react';
import styles from './HighlightedText.scss';

function getIndicesOf(matchText, text) {
  let startIndex = 0;
  let newIndex;
  const indices = [];

  newIndex = text.toLowerCase().indexOf(matchText.toLowerCase(), startIndex);
  while (newIndex > -1) {
    indices.push(newIndex);
    startIndex = newIndex + matchText.length;
    newIndex = text.toLowerCase().indexOf(matchText.toLowerCase(), startIndex);
  }
  return indices;
}

export default class HighlightedText extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    matchText: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    /*  Component should only update if text or matchText changes
     */
    return this.props.text !== nextProps.text
      || this.props.matchText !== nextProps.matchText;
  }

  componentDidUpdate() {
    console.log('HighlightedText:cDU');
  }

  render() {
    const { text, matchText } = this.props;

    // Get indices of occurences
    let splits;
    if (!!matchText) {
      const indices = getIndicesOf(matchText, text);
      if (!!indices.length) {
        splits = [];
        splits.push(text.substring(0, indices[0]));
        indices.forEach((startOfMatch, index) => {
          splits.push(text.substring(startOfMatch, startOfMatch + matchText.length));
          if (index === (indices.length - 1)) {
            // Is last matchedPosition
            splits.push(text.substring(startOfMatch + matchText.length, text.length));
          } else {
            // Isn't last so get up to the next one
            splits.push(text.substring(startOfMatch + matchText.length, indices[index + 1]));
          }
        });
      }
    }

    let output;
    if (!splits) {
      output = <span>{text}</span>;
    } else {
      output = (
        <span>
          {splits.map((str, index) => {
            return <span className={index % 2 ? styles.matchedText : null}>{str}</span>;
          })}
        </span>
      );
    }

    return output;
  }
}
