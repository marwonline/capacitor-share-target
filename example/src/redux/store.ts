import {Action, createStore, Reducer} from "redux";
import {ShareTargetEventData} from "@marwonline/capacitor-share-target/src/definitions";


interface IngestAction extends Action {
  type: 'ingest',
  data: ShareTargetEventData;
}

export function ingestIntent(data: ShareTargetEventData): IngestAction {
  return {
    type: 'ingest',
    data
  }
}

export interface IntentState {
  events: ShareTargetEventData[];
}

const intentReducer: Reducer<IntentState> = (state, action): IntentState => {
  if (!state) {
    state = {
      events: []
    }
  }
  if (action.type === 'ingest') {
    return {
      events: [
        ...state.events,
        action.data
      ]
    };
  }

  return state;
};

const store = createStore(intentReducer);
// For debugging purposes.
// @ts-ignore
window.store = store;
export default store;