export class Document {

  public _id: string;
  public _name: string;
  public _description: string;
  public _url: string;
  //public _children: Array<Document>;

  constructor(id: string, name: string, description: string, url: string, children?: Array<Document>) {
    this._id = id;
    this._name = name;
    this._description = description
    this._url = url
    //this._children = children
  }


}