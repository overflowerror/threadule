import Endpoint from "./Endpoint";
import {Client} from "../client";
import {LoginParams, LoginResponse} from "../entities/login";

const API_PREFIX = "/api/authentication/"

class AuthenticationEndpoint extends Endpoint {
    constructor(client: Client) {
        super(client);
    }

    public async login(params: LoginParams): Promise<LoginResponse> {
        return this.post<LoginParams, LoginResponse>(API_PREFIX, params)
    }
}

export default AuthenticationEndpoint