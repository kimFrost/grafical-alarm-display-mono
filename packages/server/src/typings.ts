// tslint:disable

import * as request from "superagent";
import {
    SuperAgentStatic,
    SuperAgentRequest,
    Response
} from "superagent";

export type RequestHeaders = {
    [header: string]: string;
}
export type RequestHeadersHandler = (headers: RequestHeaders) => RequestHeaders;

export type ConfigureAgentHandler = (agent: SuperAgentStatic) => SuperAgentStatic;

export type ConfigureRequestHandler = (agent: SuperAgentRequest) => SuperAgentRequest;

export type CallbackHandler = (err: any, res ? : request.Response) => void;

export type AlarmLog = {
    'id' ? : string;
    'positionId' ? : string;
    'aL_NUM' ? : number;
    'alarmNumber' ? : number;
    'alarmInitiatorId' ? : string;
    'alarmZone' ? : number;
    'zoneText' ? : string;
    'alarmDatetime' ? : string;
    'alarmEquipmentId' ? : string;
    'isActive' ? : boolean;
    'equipment' ? : Equipment;
    'actionLog' ? : Array < ActionLog >
    ;
    'alarmInitiator' ? : Customer;
} & {
    [key: string]: any;
};

export type Equipment = {
    'physicalId' ? : string;
    'name' ? : string;
    'typeId' ? : string;
    'type' ? : number;
    'text' ? : string;
    'isForRepairs' ? : boolean;
    'edited' ? : string;
    'zoneInfoId' ? : string;
    'equipmentTypeName' ? : string;
    'customerId' ? : string;
    'pendantCustomerId' ? : string;
    'staffId' ? : string;
    'objectType' ? : 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    'isActive' ? : boolean;
    'canTriggerAlarm' ? : boolean;
    'canReceiveAlarm' ? : boolean;
    'isAvailable' ? : boolean;
    'id' ? : string;
    'parentId' ? : string;
    'objectTypeId' ? : number;
    'controllerId' ? : string;
} & {
    [key: string]: any;
};

export type ActionLog = {
    'id' ? : string;
    'alarmId' ? : string;
    'parentId' ? : string;
    'alarmNumber' ? : number;
    'actionDatetime' ? : string;
    'actionType' ? : 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 176 | 177 | 178 | 179 | 181 | 184 | 190 | 191 | 198 | 199 | 200 | 201 | 202 | 203 | 206 | 207 | 208 | 209 | 210 | 211 | 212 | 213 | 214 | 215 | 216 | 217 | 218 | 219 | 220 | 221 | 226 | 227 | 228 | 229 | 231 | 235 | 236 | 237 | 238 | 239 | 240 | 241 | 244 | 245 | 246 | 247 | 248 | 249 | 250 | 251 | 252 | 253 | 254 | 255 | 258 | 259 | 260 | 268 | 268 | 269 | 269 | 270 | 271 | 275 | 276 | 277 | 278 | 279 | 280 | 281 | 282 | 283 | 290 | 291 | 292 | 300 | 430 | 431 | 432 | 433 | 434 | 435 | 450 | 451 | 451 | 454 | 454 | 457 | 457 | 458 | 458 | 460 | 460 | 461 | 461 | 462 | 463 | 463 | 463 | 463 | 463 | 464 | 464 | 465 | 465 | 465 | 466 | 466 | 466 | 467 | 467 | 467 | 467 | 500 | 501 | 501 | 501 | 501 | 501 | 501 | 501 | 501 | 501 | 502 | 502 | 502 | 502 | 502 | 503 | 503 | 503 | 503 | 503 | 503 | 503 | 504 | 504 | 504 | 504 | 505 | 505 | 505 | 505 | 506 | 506 | 507 | 507 | 520 | 520 | 520 | 521 | 521 | 522 | 522 | 523 | 523 | 523 | 555 | 555 | 555 | 556 | 556;
    'personId' ? : string;
    'equipmentId' ? : string;
    'callGroupId' ? : string;
    'actionText' ? : string;
    'equipment' ? : Equipment;
    'staff' ? : Staff;
    'callgroup' ? : CallGroup;
} & {
    [key: string]: any;
};

export type Customer = {
    'notes' ? : string;
    'callPlanId' ? : string;
    'objectType' ? : 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    'callbackNumber' ? : string;
    'circumstanceText' ? : string;
    'address' ? : string;
    'zipCode' ? : string;
    'city' ? : string;
    'phone' ? : string;
    'inUse' ? : boolean;
    'edited' ? : string;
    'id' ? : string;
    'parentId' ? : string;
    'objectTypeId' ? : number;
    'controllerId' ? : string;
    'name' ? : string;
} & {
    [key: string]: any;
};

export type Staff = {
    'username': string;
    'created' ? : string;
    'password' ? : string;
    'email' ? : string;
    'canJoinGroups' ? : boolean;
    'objectType' ? : 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    'culture' ? : string;
    'externalKey' ? : string;
    'address' ? : string;
    'zipCode' ? : string;
    'city' ? : string;
    'phone' ? : string;
    'inUse' ? : boolean;
    'edited' ? : string;
    'id' ? : string;
    'parentId' ? : string;
    'objectTypeId' ? : number;
    'controllerId' ? : string;
    'name' ? : string;
} & {
    [key: string]: any;
};

export type CallGroup = {
    'changedOn' ? : string;
    'groupTypeNumber' ? : number;
    'callGroupType' ? : 91 | 92 | 93 | 94 | 95;
    'groupTypeName' ? : string;
    'objectType' ? : 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    'isPrivate' ? : boolean;
    'id' ? : string;
    'parentId' ? : string;
    'objectTypeId' ? : number;
    'controllerId' ? : string;
    'name' ? : string;
} & {
    [key: string]: any;
};

export type Unit = {
    'baseUrl' ? : string;
    'status' ? : 0 | 1 | 2 | 3;
    'objectType' ? : 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    'positionText' ? : string;
    'positionPhysicalId' ? : number;
    'positionTypeId' ? : string;
    'accountingNote' ? : string;
    'callPlanId' ? : string;
    'statusColor' ? : string;
    'clients' ? : Array < SyncClient >
    ;
    'id' ? : string;
    'parentId' ? : string;
    'objectTypeId' ? : number;
    'controllerId' ? : string;
    'name' ? : string;
} & {
    [key: string]: any;
};

export type SyncClient = {
    'id' ? : string;
    'locationId' ? : string;
    'baseUrl' ? : string;
} & {
    [key: string]: any;
};

export type DTOCustomerEquipment = {
    'customerName' ? : string;
    'customerId' ? : string;
    'equipmentName' ? : string;
    'equipmentTypeName' ? : string;
    'equipmentId' ? : string;
} & {
    [key: string]: any;
};

export type DTOGraphicalDisplayConfiguration = {
    'id' ? : string;
    'unitId' ? : string;
    'customerId' ? : string;
    'zoneNumber' ? : number;
    'xValue' ? : number;
    'yValue' ? : number;
} & {
    [key: string]: any;
};

export type DTOGraphicalDisplayImage = {
    'id' ? : string;
    'unitId' ? : string;
    'imageBase64' ? : string;
} & {
    [key: string]: any;
};

export type Response_ApiAccount_Login_200 = {} & {
    [key: string]: any;
};

export type Response_ApiAccount_IsAuthenticated_200 = {} & {
    [key: string]: any;
};

export type Response_ApiCrossOrigin_GetAlarmsForGraphicalDisplay_200 = Array < AlarmLog >
;

export type Response_ApiCrossOrigin_GetAllowedUnits_200 = Array < Unit >
;

export type Response_ApiCrossOrigin_GetCustomerEquipment_200 = Array < DTOCustomerEquipment >
;

export type Response_ApiCrossOrigin_GetConfiguration_200 = Array < DTOGraphicalDisplayConfiguration >
;

export type Response_ApiCrossOrigin_SaveConfiguration_200 = {} & {
    [key: string]: any;
};

export type Response_ApiCrossOrigin_DeleteConfiguration_200 = {} & {
    [key: string]: any;
};

export type Response_ApiCrossOrigin_SaveGraphicalDisplayImage_200 = {} & {
    [key: string]: any;
};

export type Response_ApiCrossOrigin_DeleteGraphicalDisplayImage_200 = {} & {
    [key: string]: any;
};

export type Response_ApiCrossOrigin_AcknowledgeAlarm_200 = {} & {
    [key: string]: any;
};

export type Logger = {
    log: (line: string) => any
};

export interface ResponseWithBody < S extends number, T > extends Response {
    status: S;
    body: T;
}

export type QueryParameters = {
    [param: string]: any
};

export interface CommonRequestOptions {
    $queryParameters ? : QueryParameters;
    $domain ? : string;
    $path ? : string | ((path: string) => string);
    $retries ? : number; // number of retries; see: https://github.com/visionmedia/superagent/blob/master/docs/index.md#retrying-requests
    $timeout ? : number; // request timeout in milliseconds; see: https://github.com/visionmedia/superagent/blob/master/docs/index.md#timeouts
    $deadline ? : number; // request deadline in milliseconds; see: https://github.com/visionmedia/superagent/blob/master/docs/index.md#timeouts
}

/**
 * 
 * @class Test
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export class Test {

    private domain: string = "";
    private errorHandlers: CallbackHandler[] = [];
    private requestHeadersHandler ? : RequestHeadersHandler;
    private configureAgentHandler ? : ConfigureAgentHandler;
    private configureRequestHandler ? : ConfigureRequestHandler;

    constructor(domain ? : string, private logger ? : Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    setRequestHeadersHandler(handler: RequestHeadersHandler) {
        this.requestHeadersHandler = handler;
    }

    setConfigureAgentHandler(handler: ConfigureAgentHandler) {
        this.configureAgentHandler = handler;
    }

    setConfigureRequestHandler(handler: ConfigureRequestHandler) {
        this.configureRequestHandler = handler;
    }

    private request(method: string, url: string, body: any, headers: RequestHeaders, queryParameters: QueryParameters, form: any, reject: CallbackHandler, resolve: CallbackHandler, opts: CommonRequestOptions) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        const agent = this.configureAgentHandler ?
            this.configureAgentHandler(request.default) :
            request.default;

        let req = agent(method, url);
        if (this.configureRequestHandler) {
            req = this.configureRequestHandler(req);
        }

        req = req.query(queryParameters);

        if (this.requestHeadersHandler) {
            headers = this.requestHeadersHandler({
                ...headers
            });
        }

        req.set(headers);

        if (body) {
            req.send(body);

            if (typeof(body) === 'object' && !(body.constructor.name === 'Buffer')) {
                headers['content-type'] = 'application/json';
            }
        }

        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }

        if (opts.$retries && opts.$retries > 0) {
            req.retry(opts.$retries);
        }

        if (opts.$timeout && opts.$timeout > 0 || opts.$deadline && opts.$deadline > 0) {
            req.timeout({
                deadline: opts.$deadline,
                response: opts.$timeout
            });
        }

        req.end((error, response) => {
            // an error will also be emitted for a 4xx and 5xx status code
            // the error object will then have error.status and error.response fields
            // see superagent error handling: https://github.com/visionmedia/superagent/blob/master/docs/index.md#error-handling
            if (error) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    private convertParameterCollectionFormat < T > (param: T, collectionFormat: string | undefined): T | string {
        if (Array.isArray(param) && param.length >= 2) {
            switch (collectionFormat) {
                case "csv":
                    return param.join(",");
                case "ssv":
                    return param.join(" ");
                case "tsv":
                    return param.join("\t");
                case "pipes":
                    return param.join("|");
                default:
                    return param;
            }
        }

        return param;
    }

    ApiAccount_LoginURL(parameters: {
        'username': string,
        'password': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/account/Login';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters['username'] !== undefined) {
            queryParameters['username'] = this.convertParameterCollectionFormat(
                parameters['username'],
                ''
            );
        }

        if (parameters['password'] !== undefined) {
            queryParameters['password'] = this.convertParameterCollectionFormat(
                parameters['password'],
                ''
            );
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiAccount_Login
     * @param {string} username - 
     * @param {string} password - 
     */
    ApiAccount_Login(parameters: {
        'username': string,
        'password': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_ApiAccount_Login_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/account/Login';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = '';

            if (parameters['username'] !== undefined) {
                queryParameters['username'] = this.convertParameterCollectionFormat(
                    parameters['username'],
                    ''
                );
            }

            if (parameters['username'] === undefined) {
                reject(new Error('Missing required  parameter: username'));
                return;
            }

            if (parameters['password'] !== undefined) {
                queryParameters['password'] = this.convertParameterCollectionFormat(
                    parameters['password'],
                    ''
                );
            }

            if (parameters['password'] === undefined) {
                reject(new Error('Missing required  parameter: password'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    ApiAccount_IsAuthenticatedURL(parameters: {} & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/account/IsAuthenticated';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiAccount_IsAuthenticated
     */
    ApiAccount_IsAuthenticated(parameters: {} & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_ApiAccount_IsAuthenticated_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/account/IsAuthenticated';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = '';

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    ApiCrossOrigin_GetAlarmsForGraphicalDisplayURL(parameters: {} & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/GetAlarmsForGraphicalDisplay';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiCrossOrigin_GetAlarmsForGraphicalDisplay
     */
    ApiCrossOrigin_GetAlarmsForGraphicalDisplay(parameters: {} & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_ApiCrossOrigin_GetAlarmsForGraphicalDisplay_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/GetAlarmsForGraphicalDisplay';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = '';

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    ApiCrossOrigin_GetAllowedUnitsURL(parameters: {} & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/GetAllowedUnits';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiCrossOrigin_GetAllowedUnits
     */
    ApiCrossOrigin_GetAllowedUnits(parameters: {} & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_ApiCrossOrigin_GetAllowedUnits_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/GetAllowedUnits';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = '';

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    ApiCrossOrigin_GetCustomerEquipmentURL(parameters: {
        'unitId': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/GetCustomerEquipment';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters['unitId'] !== undefined) {
            queryParameters['unitId'] = this.convertParameterCollectionFormat(
                parameters['unitId'],
                ''
            );
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiCrossOrigin_GetCustomerEquipment
     * @param {string} unitId - 
     */
    ApiCrossOrigin_GetCustomerEquipment(parameters: {
        'unitId': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_ApiCrossOrigin_GetCustomerEquipment_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/GetCustomerEquipment';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = '';

            if (parameters['unitId'] !== undefined) {
                queryParameters['unitId'] = this.convertParameterCollectionFormat(
                    parameters['unitId'],
                    ''
                );
            }

            if (parameters['unitId'] === undefined) {
                reject(new Error('Missing required  parameter: unitId'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    ApiCrossOrigin_GetConfigurationURL(parameters: {
        'unitId': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/GetConfiguration';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters['unitId'] !== undefined) {
            queryParameters['unitId'] = this.convertParameterCollectionFormat(
                parameters['unitId'],
                ''
            );
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiCrossOrigin_GetConfiguration
     * @param {string} unitId - 
     */
    ApiCrossOrigin_GetConfiguration(parameters: {
        'unitId': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_ApiCrossOrigin_GetConfiguration_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/GetConfiguration';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = '';

            if (parameters['unitId'] !== undefined) {
                queryParameters['unitId'] = this.convertParameterCollectionFormat(
                    parameters['unitId'],
                    ''
                );
            }

            if (parameters['unitId'] === undefined) {
                reject(new Error('Missing required  parameter: unitId'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    ApiCrossOrigin_SaveConfigurationURL(parameters: {
        'graphicalDisplayConfiguration': Array < DTOGraphicalDisplayConfiguration >
            ,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/SaveConfiguration';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiCrossOrigin_SaveConfiguration
     * @param {} graphicalDisplayConfiguration - 
     */
    ApiCrossOrigin_SaveConfiguration(parameters: {
        'graphicalDisplayConfiguration': Array < DTOGraphicalDisplayConfiguration >
            ,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_ApiCrossOrigin_SaveConfiguration_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/SaveConfiguration';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = 'application/json';

            if (parameters['graphicalDisplayConfiguration'] !== undefined) {
                body = parameters['graphicalDisplayConfiguration'];
            }

            if (parameters['graphicalDisplayConfiguration'] === undefined) {
                reject(new Error('Missing required  parameter: graphicalDisplayConfiguration'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    ApiCrossOrigin_DeleteConfigurationURL(parameters: {
        'unitId': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/DeleteConfiguration';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters['unitId'] !== undefined) {
            queryParameters['unitId'] = this.convertParameterCollectionFormat(
                parameters['unitId'],
                ''
            );
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiCrossOrigin_DeleteConfiguration
     * @param {string} unitId - 
     */
    ApiCrossOrigin_DeleteConfiguration(parameters: {
        'unitId': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_ApiCrossOrigin_DeleteConfiguration_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/DeleteConfiguration';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = '';

            if (parameters['unitId'] !== undefined) {
                queryParameters['unitId'] = this.convertParameterCollectionFormat(
                    parameters['unitId'],
                    ''
                );
            }

            if (parameters['unitId'] === undefined) {
                reject(new Error('Missing required  parameter: unitId'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    ApiCrossOrigin_GetGraphicalDisplayImageURL(parameters: {
        'unitId': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/GetGraphicalDisplayImage';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters['unitId'] !== undefined) {
            queryParameters['unitId'] = this.convertParameterCollectionFormat(
                parameters['unitId'],
                ''
            );
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiCrossOrigin_GetGraphicalDisplayImage
     * @param {string} unitId - 
     */
    ApiCrossOrigin_GetGraphicalDisplayImage(parameters: {
        'unitId': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, DTOGraphicalDisplayImage >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/GetGraphicalDisplayImage';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = '';

            if (parameters['unitId'] !== undefined) {
                queryParameters['unitId'] = this.convertParameterCollectionFormat(
                    parameters['unitId'],
                    ''
                );
            }

            if (parameters['unitId'] === undefined) {
                reject(new Error('Missing required  parameter: unitId'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    ApiCrossOrigin_SaveGraphicalDisplayImageURL(parameters: {
        'graphicalDisplayImage': DTOGraphicalDisplayImage,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/SaveGraphicalDisplayImage';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiCrossOrigin_SaveGraphicalDisplayImage
     * @param {} graphicalDisplayImage - 
     */
    ApiCrossOrigin_SaveGraphicalDisplayImage(parameters: {
        'graphicalDisplayImage': DTOGraphicalDisplayImage,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_ApiCrossOrigin_SaveGraphicalDisplayImage_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/SaveGraphicalDisplayImage';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = 'application/json';

            if (parameters['graphicalDisplayImage'] !== undefined) {
                body = parameters['graphicalDisplayImage'];
            }

            if (parameters['graphicalDisplayImage'] === undefined) {
                reject(new Error('Missing required  parameter: graphicalDisplayImage'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    ApiCrossOrigin_DeleteGraphicalDisplayImageURL(parameters: {
        'id': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/DeleteGraphicalDisplayImage/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        path = path.replace(
            '{id}',
            `${encodeURIComponent(this.convertParameterCollectionFormat(
                        parameters['id'],
                        ''
                    ).toString())}`
        );

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiCrossOrigin_DeleteGraphicalDisplayImage
     * @param {string} id - 
     */
    ApiCrossOrigin_DeleteGraphicalDisplayImage(parameters: {
        'id': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_ApiCrossOrigin_DeleteGraphicalDisplayImage_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/DeleteGraphicalDisplayImage/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = '';

            path = path.replace(
                '{id}',
                `${encodeURIComponent(this.convertParameterCollectionFormat(
                    parameters['id'],
                    ''
                ).toString())}`
            );

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    ApiCrossOrigin_AcknowledgeAlarmURL(parameters: {
        'alarmId': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/AcknowledgeAlarm';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters['alarmId'] !== undefined) {
            queryParameters['alarmId'] = this.convertParameterCollectionFormat(
                parameters['alarmId'],
                ''
            );
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 
     * @method
     * @name Test#ApiCrossOrigin_AcknowledgeAlarm
     * @param {string} alarmId - 
     */
    ApiCrossOrigin_AcknowledgeAlarm(parameters: {
        'alarmId': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_ApiCrossOrigin_AcknowledgeAlarm_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/api/crossorigin/AcknowledgeAlarm';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json, text/json';
            headers['content-type'] = '';

            if (parameters['alarmId'] !== undefined) {
                queryParameters['alarmId'] = this.convertParameterCollectionFormat(
                    parameters['alarmId'],
                    ''
                );
            }

            if (parameters['alarmId'] === undefined) {
                reject(new Error('Missing required  parameter: alarmId'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

}

export default Test;