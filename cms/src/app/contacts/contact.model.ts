export class Contact {

  public _id: string;
  public _name: string;
  public _email: string;
  public _phone: string;
  public _imageUrl: string;
  //public _group : Array<Contact>;

  constructor(id: string, name: string, email: string, phone: string, imageUrl: string, group?: Array<Contact>) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._phone = phone;
    this._imageUrl = imageUrl;
    //this._group = group;
  }


}