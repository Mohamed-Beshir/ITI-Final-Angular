import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  api : any = "https://retoolapi.dev/mrINvU/comment";

  constructor(private http : HttpClient) {}
  getAllComment () {
    return this.http.get(this.api);
  }
  getOneComment (id : number) {
    return this.http.get(`${this.api}/${id}`);
  }
  saveCommentData (data : any) {
    return this.http.post(this.api, data)
  }
  updateComment(id: number, updatedComment: any) {
    return this.http.put(`${this.api}/${id}`, updatedComment);
  }
  deleteCommentFromApi (id :number) {
    return this.http.delete(`${this.api}/${id}`)
  }
}
