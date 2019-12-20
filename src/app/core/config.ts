import { environment } from 'src/environments/environment';


export class Config {
  static readonly APILIST = [
    { value: 'apis-0', viewValue: 'LIMELIGHT' },
    { value: 'apis-1', viewValue: 'KONNEKTIVE' },
    { value: 'apis-2', viewValue: 'RESPONSE' },
    { value: 'apis-3', viewValue: 'VELOX' },
    { value: 'apis-4', viewValue: 'EMANAGE' },
  ];

  static readonly TOKEN_NAME = 'access_token';
  static readonly PAGE_SIZE = 10;
  static readonly URLS = {
    userGetUrl: environment.apiUrl + "api/getsUserEdit",
    updateProductURL: environment.apiUrl + "api/updateProduct",
    updateProductnameURL: environment.apiUrl + "api/updateProductname",
    loginSession: environment.apiUrl + "api/loginSetSession",
    backendLiveURL: environment.apiUrl + "api/get",
    GetProducts: environment.apiUrl + "api/productGet",
    backendUserdetailURL: environment.apiUrl + "api/userGetdetails",

    crmapiAdd: environment.apiUrl + "api/apiaddCrmApis",
    crmapiActivate: environment.apiUrl + "api/apiaddCrmApis",
    crmapiDelete: environment.apiUrl + "api/apiaddCrmApis",
    apiListCrmApis: environment.apiUrl + "api/apiListCrmApis",
    apiauthenticate: environment.apiUrl + "api/authenticate"
  }

}
