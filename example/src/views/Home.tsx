import React from 'react';
import {useSelector} from 'react-redux';
import {IntentState} from "../redux/store";
import {ImageAsset, ShareAsset, ShareTargetEventData, TextAsset} from "@marwonline/capacitor-share-target/src/definitions";

function isTextAsset(data: ShareAsset): data is TextAsset {
  return data.assetType === 'text';
}

function isImageAsset(data: ShareAsset): data is ImageAsset {
  return data.assetType === 'image';
}

function getTextPayload(data: ShareAsset): string {
  if (isTextAsset(data)) {
    return data.text;
  }
  if (isImageAsset(data)) {
    return data.uri;
  }
  return '';
}

export const Home = () => {
  const events = useSelector((state: IntentState) => state.events);

  return (<>
    <h1>Home</h1>
    <p>This is a test app which will consume all given data!</p>
    <p><b>Attention:</b> Only the Android version "works" right now</p>
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>Item</td>
          <td>MimeType</td>
          <td>Data</td>
        </tr>
      </thead>
      <tbody>
      {events.map((event:ShareTargetEventData, eventIndex: number) => {
        return event.items.map((eventItem, itemIndex) => {
          return <tr key={`${eventIndex}-${itemIndex}`}>
            <td>{eventIndex}</td>
            <td>{itemIndex+1}/{event.items.length}</td>
            <td>{eventItem.mimeType}</td>
            <td>{getTextPayload(eventItem)}</td>
          </tr>
        });
      })}
      </tbody>
    </table>
  </>)
};