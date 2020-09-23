import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';

export class UiService {

  constructor() {
    let uVar;
    this.bee = uVar;
    this.toTabIndexSub = new Subject();
     this.handledMessages = [];
  }

  async start(config){

    this.version = config['version'];
    this.jsonSwarm = config['ipfs']['swarm'];
    this.electron = config['dependencies']['electronService'];
    this.bee = config['dependencies']['bee'];

    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      this.isElectron = true;
      this.fs = this.electron.remote.require('fs');
      this.configPath = this.electron.remote.app.getPath('userData');
      this.configFilePath = this.configPath + "/user.qcprofile";
    }

    return true;
  }

  setSideBarFixed(sideBarFixed){
      this.bee.config.setSideBarFixed(sideBarFixed);
  }
  getSideBarFixed(){
      return this.bee.config.getSideBarFixed();
  }

  setSideBarVisible(conf){
    this.bee.config.setSideBarVisible(conf);
  }
  getSideBarVisible(){
    return this.bee.config.getSideBarVisible();
  }
  hideSideBar(side){
    let sb = this.getSideBarVisible();
    sb[side] = false;
    this.setSideBarVisible(sb);
  }

  toTabIndex(value){
    this.toTabIndexSub.next(value);
  }
  onTabChange(){
    return this.toTabIndexSub;
  }

  getHandledMessages(){
    return this.handledMessages;
  }
  addHandledMessage(id){
      this.handledMessages.push(id);
  }


}
