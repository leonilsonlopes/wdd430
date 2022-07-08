// class Hola{ 

// }



// addDocument(document: Documents) {
//     //check if document is defined
//     if (!document) {
//       //if so, exit function
//       return;
//     }
  
//     //create header
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });
  
//     //convert object to string to send on request
//     document.id = '';
//     const strDocument = JSON.stringify(document);
  
//     //send post request with document and header
//     this.http.post('http://localhost:3000/documents', strDocument, { headers: headers })
//       //subscribe to response
//       .subscribe(
//         (documents: Documents[]) => {
//           //assign document list
//           this.documents = documents;
//           //emit the change
//           this.documentListChangedEvent.next(this.documents.slice());
//         });
//   }