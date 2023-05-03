import { Observable, catchError, of , map} from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LoadingService } from './loading.services';
@Injectable()
export class MyInterceptor  implements HttpInterceptor{

    constructor(private loaderService: LoadingService
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.method === "DELETE" || request.method === "UPDATE") {
            this.loaderService.setLoading(true, request.url);
            return next.handle(request)
                .pipe((result) => {
                    this.loaderService.setLoading(false, request.url);
                    return result;
                });
        } else {
            return next.handle(request);
        }   
           
    }
    
}
