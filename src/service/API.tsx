import { Difficulty } from "../common/enums/difficulty";
import { IAggregateResult } from "../common/interfaces/aggregateResult";
import { IWord } from "../common/interfaces/word";
import StorageWrapper from "../components/storageWrapper";

class Query {
  constructor(
    private readonly basicURL: string,
    private readonly storage = StorageWrapper.getInstance()
  ) {}

  async getWords() {
    return await fetch(`${this.basicURL}words`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getWordsPage(group: number, page: number): Promise<IWord[]> {
    try {
      const data = await fetch(
        `${this.basicURL}words?group=${group}&page=${page}`
      );
      return (await data.json()) as IWord[];
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getWord(wordId: number) {
    return await fetch(`${this.basicURL}words/${wordId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async createUser(body: { name: string; email: string; password: string }) {
    return await fetch(`${this.basicURL}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  async getUser(id: string) {
    const token: string = this.storage.getSavedToken() as string;
    return await fetch(`${this.basicURL}users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateUser(id: number, body: { email: string; password: string }) {
    return await fetch(`${this.basicURL}users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  async deleteUser(id: number) {
    return await fetch(`${this.basicURL}users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getUserTokens(id: string) {
    const token: string = this.storage.getSavedToken() as string;
    return await fetch(`${this.basicURL}users/${id}/tokens`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUserWords(id: number) {
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

  async getUserSpecialWords(id: number, wordId: number) {
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
    return await fetch(`${this.basicURL}users/${id}/words/${wordId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteUserWords(id: number, wordId: number) {
    const token: string = this.storage.getSavedToken() as string;
    return await fetch(`${this.basicURL}users/${id}/words/${wordId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAllUserWords(id: number, wordId: number) {
    return await fetch(`${this.basicURL}users/${id}/words/${wordId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async signIn(body: { email: string; password: string }) {
    return await fetch(`${this.basicURL}signin`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAggregatedWordById(userId: number, wordId: number) {
    return await fetch(
      `${this.basicURL}users/${userId}/aggregatedWords/${wordId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  async getAggregatedWords(userId: number) {
    return await fetch(`${this.basicURL}users/${userId}/aggregatedWords`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAggregatedWordsByFilter(
    userId: string,
    difficulty: Difficulty[]
  ): Promise<IAggregateResult[]> {
    try {
      const token: string = this.storage.getSavedToken() as string;
      const data = await fetch(
        // eslint-disable-next-line max-len
        `${this.basicURL}users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"$or":[{"userWord.difficulty":"${difficulty[0]}"},{"userWord.difficulty":"${difficulty[1]}"},{"userWord.difficulty":"${difficulty[2]}"}]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return (await data.json()) as IAggregateResult[];
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getUserStats(userId: number) {
    return await fetch(`${this.basicURL}users/${userId}/statistics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async updateUserStats(
    userId: number,
    body: { learnedWords: number; optional: { [key: string]: string } }
  ) {
    return await fetch(`${this.basicURL}users/${userId}/statistics`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  async getUserSettings(userId: number) {
    return await fetch(`${this.basicURL}users/${userId}/settings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async updateUserSettings(
    userId: number,
    body: { wordsPerDay: number; optional: { [key: string]: string } }
  ) {
    return await fetch(`${this.basicURL}users/${userId}/statistics`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}

export const query = new Query("https://ts-learn-words.herokuapp.com/");
