import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

export interface JWTPayload {
  exp: number;
  iat?: number;
  sub?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenExpiryService {

  getTokenExpiration(token: string): number | null {
    try {
      const decoded= jwtDecode<JWTPayload>(token);
      return decoded.exp ? decoded.exp * 1000 : null;
    }
    catch (err) {
      console.log("error while token expiry", err);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const exp=this.getTokenExpiration(token);
    if(!exp){
      return true;
    }
    return Date.now() > exp;
  }

}
