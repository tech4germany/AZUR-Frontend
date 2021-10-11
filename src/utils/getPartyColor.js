import * as d3 from "d3";
import constants from '../utils/constants.json'


export function getPartyColor(partyName, index, partyArrayLength){
    const colorScale = d3.scaleLinear().domain([1, partyArrayLength]).range(["#333", "#EEE"])
    const partyColors = constants.partyColors
    if(partyName in constants.partyAltNamesMapping){
        partyName = constants.partyAltNamesMapping[partyName]
    }

    if(partyName in partyColors){
        return partyColors[partyName]
    }else{
      return colorScale(index)
    }
}