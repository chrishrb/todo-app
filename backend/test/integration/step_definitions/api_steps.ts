import { beforeAll, before, binding, given, then, when, afterAll } from 'cucumber-tsflow';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createServer } from "../../../src/utils/server";
import { Server } from 'node:http';
import chai, { expect } from 'chai';
import chaiJsonPattern from 'chai-json-pattern';
import { LoginSchema } from '../../../src/schemas/auth.schema';
import { setTimeout } from 'node:timers/promises';

chai.use(chaiJsonPattern);

@binding()
export class ApiSteps {
  private server: Server;
  private headers: { [key: string]: string | string[]; } = {};
  private response: AxiosResponse | null;
  private user: LoginSchema | null;
  private parameters: { [key: string]: string | string[]; } = {};

  // --------------------------------------------------------------------------
  // GIVEN
  // --------------------------------------------------------------------------
  @given(/the Content-Type is 'application\/json'/)
  public iTheTypeIsApplicationJson(): void {
    this.headers['Content-Type'] = 'application/json';
  }

  @given(/I am a normal user/)
  public async imAnormalUser(): Promise<void> {
    this.user = new LoginSchema('john.doe@todo.com', 'johni');
  }

  @given(/I am a admin user/)
  public async imAadminUser(): Promise<void> {
    this.user = new LoginSchema('admin@todo.com', 'admin');
  }

  @given(/I am authenticated/)
  public async imAuthenticated(): Promise<void> {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/login", JSON.stringify(this.user), { headers: { 'Content-Type': 'application/json' } })
      this.headers['Authorization'] = `Bearer ${response.data.accessToken}`
      if (response.headers['set-cookie']) {
        this.headers['Cookie'] = response.headers['set-cookie']
      }
      // Workaround: tokens are the same if you create them too fast, so we wait a short period
      await setTimeout(500);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(`StatusCode: ${error.response?.status} Body: ${error.response?.data}`)
      }
      throw error
    }
  }

  // --------------------------------------------------------------------------
  // WHEN
  // --------------------------------------------------------------------------
  @when(/I send a POST request to "([^"]*)" with json:/)
  public async iSendAPostRequestTo(path: string, body: string): Promise<void> {
    try {
      this.response = await axios.post(path, body, { headers: this.headers })
    } catch (error) {
      if (error instanceof AxiosError) {
        this.response = error.response!
      } else {
        throw error;
      }
    }
  }

  @when(/I send a PUT request to "([^"]*)" with json:/)
  public async iSendAPuttRequestTo(path: string, body: string): Promise<void> {
    try {
      this.response = await axios.put(path, body, { headers: this.headers })
    } catch (error) {
      if (error instanceof AxiosError) {
        this.response = error.response!
      } else {
        throw error;
      }
    }
  }

  @when(/I send a GET request to "([^"]*)"/)
  public async iSendAGetRequestTo(path: string): Promise<void> {
    try {
      this.response = await axios.get(path, { headers: this.headers })
    } catch (error) {
      if (error instanceof AxiosError) {
        this.response = error.response!
      } else {
        throw error;
      }
    }
  }

  @when(/I send a PATCH request to "([^"]*)"/)
  public async iSendAPatchRequestTo(path: string): Promise<void> {
    try {
      this.response = await axios.patch(path, null, { headers: this.headers })
    } catch (error) {
      if (error instanceof AxiosError) {
        this.response = error.response!
      } else {
        throw error;
      }
    }
  }

  @when(/I send a DELETE request to "([^"]*)"/)
  public async iSendADeleteRequestTo(path: string): Promise<void> {
    try {
      this.response = await axios.delete(path, { headers: this.headers })
    } catch (error) {
      if (error instanceof AxiosError) {
        this.response = error.response!
      } else {
        throw error;
      }
    }
  }

  // --------------------------------------------------------------------------
  // THEN
  // --------------------------------------------------------------------------
  @then(/the response code should be (\d*)/)
  public theResponseCodeShouldBe(responseCode: string) {
    if (this.response == null) {
      throw Error("No response. Did you send a request?");
    }

    expect(this.response.status).to.be.equal(parseInt(responseCode));
  }

  @then(/the response body should be json:/)
  public theResponseBodyShouldBeJson(body: string) {
    if (this.response == null) {
      throw Error("No response. Did you send a request?");
    }
    expect(this.response.data).to.matchPattern(body)
  }

  @then(/the user is logged out/)
  public async theUserIsLoggedOut() {
    try {
      await axios.get("http://localhost:8000/api/v1/auth/verify", { headers: this.headers })
      throw Error("User still logged in")
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).to.be.equal(401);
      } else {
        throw error
      }
    }
  }

  @then(/save id of response/)
  public saveIdOfResponse() {
    this.parameters['id'] = this.response?.data.id
  }

  @then(/print response/)
  public printResponse() {
    console.log(this.response?.data)
  }

  // --------------------------------------------------------------------------
  // BEFORE / AFTER
  // --------------------------------------------------------------------------
  @beforeAll()
  public startExpressHttpServer(): void {
    this.server = createServer(8000)
  }

  @before()
  public reset(): void {
    this.headers = {};
    this.response = null;
    this.user = null;
  }

  @afterAll()
  public endExpressHttpServer(): void {
    if (this.server == null) {
      return;
    }

    this.server.close()
  }
}
