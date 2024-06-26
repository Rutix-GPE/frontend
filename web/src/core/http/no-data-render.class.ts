/**
 * Created by julien on 07/07/15.
 */

export class NoDataRender {

  public message : any;

  public isFormatTable: boolean;

  constructor(message?: string) {

    this.message = "Il n'y a aucune information à afficher";
    if (message) {
      this.message = message;
    }
    this.isFormatTable = true;
  }


}
