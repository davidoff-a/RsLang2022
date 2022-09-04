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
        },
      }
      const data = await fetch(
        `${this.basicURL}words?group=${group}&page=${page}`,
          opts
      );
      return (await data.json()) as IAggregateWord[];
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
    const token: string = this.storage.getSavedToken() as string;
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ``,
      },
    }
    const reqOptions = await this.addAuthOptions(opts);
    return await fetch(`${this.basicURL}users/${id}`, opts);
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

  async getUserTokens(id: string) {
    const token: string = this.storage.getSavedToken() as string;
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetch(`${this.basicURL}users/${id}/tokens`, opts);
  }

  async getUserWords (id: number) {
    return await fetch(`${this.basicURL}users/${id}/words`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
  ): Promise<IAggregateResult[]> {
    try {
      console.log("getAggregatedWords");
      // const token: string = this.storage.getSavedToken() as string;
      const urlPart = difficulty
        .map((dif) => `{"userWord.difficulty":"${dif}"}`)
        .join(",");

      const opts = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
      };

      const reqOptions = await this.addAuthOptions(opts);

      const data = await fetch(
        `${this.basicURL}users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"$or":[${urlPart}]}`,
        reqOptions
      );
      return (await data.json()) as IAggregateResult[];
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
    let tokenData = null;

    if (this.storage.getSavedToken()) {
      tokenData = this.storage.getSavedToken();
    }

    if (tokenData) {
      if (Date.now() >= Number(this.storage.getSavedTokenExpires())) {
        try {
          const userId = this.storage.getSavedUser() as string;
          const response = await this.getUserTokens(userId);
          const newToken = (await response.json()) as signInResponse;
          console.log("#### newToken =>",newToken);
          this.storage.updateUserData(newToken);
        } catch (e) {
          if (e instanceof Error) {
            throw new Error(e.message);
          }
        }
      }

      options.headers.Authorization = `Bearer ${
        this.storage.getSavedToken() as string
      }`; // добавляем токен в headers запроса
    }

    return options; // возвращаем initOptions с валидным токеном в headers
  }
}

export const query = new Query("https://ts-learn-words.herokuapp.com/");
