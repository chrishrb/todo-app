import { before, after, binding, given, then, when } from 'cucumber-tsflow';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createServer } from "../../../src/utils/server";
import { Server } from 'node:http';
import { expect } from 'chai';

@binding()
export class ApiSteps {
  private server: Server;
  private headers: { [key: string]: string; } = {};
  private response: AxiosResponse;

  // --------------------------------------------------------------------------
  // GIVEN
  // --------------------------------------------------------------------------
  @given(/the Content-Type is 'application\/json'/)
  public iTheTypeIsApplicationJson(): void {
    this.headers['Content-Type'] = 'application/json';
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
        throw Error(`StatusCode: ${error.response?.status} Body: ${error.response?.data}`)
      }
      throw error
    }
  }

  @when(/I send a GET request to "([^"]*)"/)
  public async iSendAGetRequestTo(path: string): Promise<void> {
    try {
      this.response = await axios.get(path, { headers: this.headers })
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(`StatusCode: ${error.response?.status} Body: ${error.response?.data}`)
      }
      throw error
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

    const expectedBody = JSON.parse(body);
    expect(this.response.data).to.be.an.instanceof(Object).and.to.deep.equals(expectedBody);
  }

  @then(/print response/)
  public printResponse() {
    console.log(this.response.data)
  }

  // --------------------------------------------------------------------------
  // BEFORE / AFTER
  // --------------------------------------------------------------------------
  @before()
  public startExpressHttpServer(): void {
    this.server = createServer(8000)
  }

  @after()
  public endExpressHttpServer(): void {
    if (this.server == null) {
      return;
    }

    this.server.close()
  }
}
