import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private msg: NzMessageService) { }

  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token : string = localStorage.getItem('tk');
    let request = req;
    let contentType = 'application/json';
    let headers = {
      'Authorization':`Bearer ${token}`,
    };

    if(request.headers.has('Content-Type')){
      headers['Content-Type'] = request.headers.get('Content-Type');
    }

    if(token){
      request = req.clone({
        setHeaders: headers
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          if(err.error)
            this.msg.error(`Error: ${err.error.message}`);
          else
            this.msg.error(`Error Usuario no Autorizado`);

        }
        else if(err.status === 400){
          if(err.error){
            this.msg.error(err.error.message)
          }
        }
        return throwError( ()=> err );
      })
    );
  }
}
