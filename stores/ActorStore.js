import {EventEmitter} from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import {ActionTypes} from "../actions/Constants";

let _actors = [];

class ActorStore extends EventEmitter {
  constructor(props) {
      super(props);

      AppDispatcher.register(action => {
        switch (action.actionType) {
        case ActionTypes.RECEIVE_ACTORS:
          //clear _actors or it will accumalate after each click
          _actors = []
          action.actors.cast.slice(0,4).forEach(actor => {
            _actors.push({profile_path: actor.profile_path, id: actor.id});
          });
          this.emit("CHANGE");
          break;
        default:
          break;
        }
      });
    }
    // getters
    getActors() {
      return _actors;
    }
    // listeners
    startListening(callback) {
      this.on("CHANGE", callback);
    }

    stopListening(callback) {
      this.removeListener("CHANGE", callback);
    }
}

export default new ActorStore();