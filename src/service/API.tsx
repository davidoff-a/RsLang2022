import { Difficulty } from "../common/enums/difficulty";
import { IAggregateResult } from "../common/interfaces/aggregateResult";
import { IStatisticsResult } from "../common/interfaces/statisticsResult";
import { IWord } from "../common/interfaces/word";
import StorageWrapper from "../components/storageWrapper";
import { LoginData, signInResponse } from "../common/interfaces/loginData";
import {IAggregateWord} from "../common/interfaces/aggregateWord";

export interface RequestInitAuth extends RequestInit {
  headers: { Authorization?: string };
}
class Query {
  private tokenLifeTime: number;
  constructor(
    private readonly basicURL: string,
    private readonly storage = StorageWrapper.getInstance()
  ) {
    this.tokenLifeTime = 4 * 60 * 60;
  }

  async getWords() {
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    return await fetch(`${this.basicURL}words`, opts);
  }

  async getWordsPage(group: number, page: number): Promise<IAggregateWord[]> {
    try {
      console.log("getWordPage");
      const opts = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ''
        },
      }

      const reqOptions = await this.addAuthOptions(opts);

      const data = await fetch(
        `${this.basicURL}words?group=${group}&page=${page}`,
        reqOptions
      );
      const res = (await data.json()) as IAggregateWord[];
      console.log("res =>", res)
      return res;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getWord (wordId: number) {
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    return await fetch(`${this.basicURL}words/${wordId}`, opts);
  }

  async createUser(body: { name: string; email: string; password: string }) {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
    return await fetch(`${this.basicURL}users`, opts);
  }

  async getUser(id: string) {
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ``,
      },
    }
    const reqOptions = await this.addAuthOptions(opts);
    return await fetch(`${this.basicURL}users/${id}`, reqOptions);
  }

  async updateUser (id: number, body: { email: string; password: string }) {
    const opts = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
    return await fetch(`${this.basicURL}users/${id}`, opts);
  }

  async deleteUser (id: number) {
    return await fetch(`${this.basicURL}users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getUserTokens(userId: string) {
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("Getting tokens ...")
    return await fetch(`${this.basicURL}users/${userId}/tokens`, opts);
  }

  async getUserWords (id: number) {
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ''
      },
    }
    return await fetch(`${this.basicURL}users/${id}/words`, opts);
  }

  async addUserWords(
    id: string,
    wordId: string,
    body: {
      difficulty: string;
      optional: { [key: string]: number | string | boolean };
    }
  ) {
    const token: string = this.storage.getSavedToken() as string;
    return await fetch(`${this.basicURL}users/${id}/words/${wordId}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUserSpecialWords (id: number, wordId: number) {
    return await fetch(`${this.basicURL}users/${id}/words/${wordId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async updateUserWords(
    id: string,
    wordId: string,
    body: {
      difficulty: string;
      optional: { [key: string]: number | string | boolean };
    }
  ) {
    const token: string = this.storage.getSavedToken() as string;
    const opts = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const reqOptions = await this.addAuthOptions(opts);
    return await fetch(
      `${this.basicURL}users/${id}/words/${wordId}`,
      reqOptions
    );
  }

  async deleteUserWords(id: number, wordId: number) {
    const token: string = this.storage.getSavedToken() as string;
    const opts = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const reqOptions = await this.addAuthOptions(opts);
    return await fetch(
      `${this.basicURL}users/${id}/words/${wordId}`,
      reqOptions
    );
  }

  async getAllUserWords (id: number, wordId: number) {
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await fetch(`${this.basicURL}users/${id}/words/${wordId}`, opts);
  }

  async signIn(body: LoginData) {
    const opts = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
    };
    const reqOptions = await this.addAuthOptions(opts);
    return await fetch(`${this.basicURL}signin`, reqOptions);
  }

  async getAggregatedWordById(userId: number, wordId: number) {
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await fetch(
      `${this.basicURL}users/${userId}/aggregatedWords/${wordId}`,
      opts
    );
  }

  async getAggregatedWords(userId: number) {
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await fetch(`${this.basicURL}users/${userId}/aggregatedWords`, opts);
  }

  async getAggregatedWordsByFilter(

    userId: string,
    difficulty: Difficulty[]
  ) {
    try {
      console.log("getAggregatedWords");
      const urlPart = difficulty
        .map((dif) => `{userWord.difficulty:${dif}}`)
        .join(",");

      const opts = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
      };

      const reqOptions = await this.addAuthOptions(opts);
      const filter = '{$or:[{userWord:Difficulty.HARD},{userWord:Difficulty.EASY},{userWord:Difficulty.STUDIED}]}'
      const data = await fetch(
        `${this.basicURL}users/${userId}/aggregatedWords?wordsPerPage=100&filter=${JSON.stringify(filter)}`,
        reqOptions
      );
      const res = await data.json() as IAggregateResult[];
      console.log("####  res =>", res)
      return (res);
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getUserStats(userId: string): Promise<IStatisticsResult> {
    try {
      const token: string = this.storage.getSavedToken() as string;
      const data = await fetch(`${this.basicURL}users/${userId}/statistics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return (await data.json()) as IStatisticsResult;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async updateUserStats(userId: string, body: IStatisticsResult) {
    const token: string = this.storage.getSavedToken() as string;
    const opts = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
    return await fetch(`${this.basicURL}users/${userId}/statistics`, opts);
  }

  async getUserSettings (userId: number) {
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await fetch(`${this.basicURL}users/${userId}/settings`, opts);
  }

  async updateUserSettings (
    userId: number,
    body: { wordsPerDay: number; optional: { [key: string]: string } }
  ) {
    const opts = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await fetch(`${this.basicURL}users/${userId}/statistics`, opts);
  }

  async addAuthOptions(options: RequestInitAuth) {

    const tokenData = this.storage.getSavedToken() || "" ;
console.log("#### tokenData =>", tokenData)
    if (tokenData) {
      console.log("i have got tokenData")
      console.log("expires on", new Date(Number(this.storage.getSavedTokenExpires())))
      console.log("date", new Date(Date.now()))
      const userId = this.storage.getSavedUser() as string || "";
      const expires = +this.storage.getSavedTokenExpires()!;

      if (new Date(Date.now()) <= new Date(expires)) {
        try {
          console.log("#### UserId =>", userId)
          const response = await this.getUserTokens(userId);
          const newToken = (await response.json()) as signInResponse;
          console.log("#### newToken =>", newToken);
          this.storage.updateUserData(newToken);
          options.headers.Authorization = `Bearer ${ tokenData }`
        } catch (e) {
          if (e instanceof Error) {
            throw new Error(e.message);
          }
        }
      }
    }
    options.headers.Authorization = `Bearer ${ tokenData }`
    console.log(options);
    return options; // возвращаем initOptions
  }
}

export const query = new Query("https://ts-learn-words.herokuapp.com/");
