import React from 'react';
import { Linking, Text } from 'react-native';

export default function renderHyperlinkedText(string, baseStyles = {}, linkStyles = {}, openLink) {
  if (typeof string !== 'string') return null;
  const httpRegex = /(((https?:\/\/)|(www\.))(\S+))/gi;
  const httpType = httpRegex.test(string);
  if (httpType) {
    // Reset these regex indices because sometimes it starts off at a weird sequence.. 
    httpRegex.lastIndex = 0;
    const httpIndices = getMatchedIndices(httpRegex, string);
    const comIndices = getComIndices(string, httpIndices);
    if (httpIndices.length === comIndices.length) {
      const result = [];
      let noLinkString = string.substring(0, httpIndices[0] || string.length);
      result.push(<Text key={noLinkString} style={baseStyles}>{ noLinkString }</Text>);
      for (let i = 0; i < httpIndices.length; i += 1) {
        const linkString = string.substring(httpIndices[i], comIndices[i]);
        result.push(
          <Text
            key={linkString}
            style={[baseStyles, linkStyles]}
            onPress={openLink ? () => openLink(linkString) : () => Linking.openURL(linkString)}
          >
            { linkString }
          </Text>
        );
        noLinkString = string.substring(comIndices[i], httpIndices[i + 1] || string.length);
        if (noLinkString) {
          result.push(
            <Text key={noLinkString} style={baseStyles}>
              { noLinkString }
            </Text>
          );
        }
      }
      // Make sure the parent `<View>` container has a style of `flexWrap: 'wrap'`
      return result;
    }
  }
  return <Text style={baseStyles}>{ string }</Text>;
}

function getMatchedIndices(regex, text) {
  const result = [];
  let match;
  do {
    match = regex.exec(text);
    if (match) result.push(match.index);
  } while (match);
  return result;
}

function getComIndices(text, httpIndices) {
  const comIndices = [];
  for (let i = 0; i < httpIndices.length; i += 1) {
    let j = httpIndices[i];
    while (text[j] !== ' ' && text[j] !== undefined) {
      j += 1;
    }
    comIndices.push(j);
  }
  return comIndices;
}
