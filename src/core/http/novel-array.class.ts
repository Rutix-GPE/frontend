/**
 * Created by julien on 07/07/15.
 */

import { JsonLdGet } from "./json-ld-get.interface";
import { NoDataRender } from "./no-data-render.class";




export class NovelArray {

  public nArray: Array<any>;
  public noDataRender: NoDataRender;


  public queryFilter: string;
  public extraFilter: Array<any>;


  //important
  public currentPageNumber: number;



  public numItemsPerPage: number;
  public totalCount: number;
  public bIsLoading: Boolean;
  public pages: Array<any>;

  constructor(message?: string) {
    this.totalCount = 0
    this.noDataRender = new NoDataRender(message);
    this.nArray = new Array();
    this.extraFilter = [];
    this.bIsLoading = false;
    this.currentPageNumber = 1;
    this.numItemsPerPage = 25;
    this.queryFilter = '';
    this.pages = new Array();
  }

  public persist(jsonLdGet: JsonLdGet) {

    this.nArray = jsonLdGet['hydra:member'];
    this.totalCount = 0;
    this.pages = new Array();

    this.totalCount = jsonLdGet['hydra:totalItems'];


    var count: number = this.totalCount;
    var iPage: number = 0;
    while (this.numItemsPerPage > 0 && count > 0) {
      count -= this.numItemsPerPage;
      iPage++;
      this.pages.push(iPage);
    }


  }

  public remove(novelElement: any) {
    var index = this.nArray.indexOf(novelElement);
    this.nArray.splice(index, 1);
  }

  public push(novelElement: any) {
    this.nArray.push(novelElement);
  }

  public unshift(novelElement: any) {
    this.nArray.unshift(novelElement);
  }

  public query() {
   // this.extraFilter['page'] = this.currentPageNumber; 
    //this.extraFilter['max_per_page'] = this.numItemsPerPage;
    return this.extraFilter;
  }

  public nextPage() {
    if (this.currentPageNumber !== this.pages.length) {
      this.currentPageNumber = this.currentPageNumber + 1;
      return true;
    }
    return false;
  }

  public previousPage() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber = this.currentPageNumber - 1;
      return true;
    }
    return false;
  }

  public firstPage() {
    if (this.currentPageNumber !== 1) {
      this.currentPageNumber = 1;
      return true;
    }
    return false;
  }

  public lastPage() {
    if (this.currentPageNumber !== this.pages.length) {
      this.currentPageNumber = this.pages.length;
      return true;
    }
    return false;
  }


  public goPage(pageNumber: number) {
    if (this.currentPageNumber !== pageNumber) {
      this.currentPageNumber = pageNumber;
      return true;
    }
    return false;
  }

}
