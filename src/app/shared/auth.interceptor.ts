import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {AuthService} from "../Auth/auth.service";

@Injectable()
export class Auth implements HttpInterceptor{

  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token = this.authService.getTokecn();
    const copiedReq = req.clone({
      params: req.params.append('auth'
        ,token)
    });
    console.log('interceptor' , copiedReq);
    return next.handle(copiedReq);
  }
}
