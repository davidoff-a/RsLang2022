import { IAggregateResult } from "../common/interfaces/aggregateResult";
import { IWord } from "../common/interfaces/word";
import StorageWrapper from "../components/storageWrapper";

class Query {
  constructor(
    private readonly basicURL: string,
    private readonly storage = StorageWrapper.getInstance()
  ) {}

  async getWords() {
    await fetch(`${this.basicURL}words`, {
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
    await fetch(`${this.basicURL}words/${wordId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async createUser(body: { name: string; email: string; password: string }) {
    await fetch(`${this.basicURL}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  async getUser(id: number) {
    await fetch(`${this.basicURL}users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async updateUser(id: number, body: { email: string; password: string }) {
    await fetch(`${this.basicURL}users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async deleteUser(id: number) {
    await fetch(`${this.basicURL}users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getUserTokens(id: number) {
    await fetch(`${this.basicURL}users/${id}/tokens`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getUserWords(id: number) {
    await fetch(`${this.basicURL}users/${id}/words`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async addUserWords(
    id: number,
    wordId: number,
    body: { difficulty: string; optional: { [key: string]: string } }
  ) {
    await fetch(`${this.basicURL}${id}/words/${wordId}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getUserSpecialWords(id: number, wordId: number) {
    await fetch(`${this.basicURL}users/${id}/words/${wordId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async updateUserWords(
    id: number,
    wordId: number,
    body: { difficulty: string; optional: { [key: string]: string } }
  ) {
    await fetch(`${this.basicURL}users/${id}/words/${wordId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async deleteUserWords(id: number, wordId: number) {
    await fetch(`${this.basicURL}users/${id}/words/${wordId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAllUserWords(id: number, wordId: number) {
    await fetch(`${this.basicURL}users/${id}/words/${wordId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async signIn(userId: number, body: { email: string; password: string }) {
    await fetch(`${this.basicURL}users/${userId}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAgregatedWordById(userId: number, wordId: number) {
    await fetch(`${this.basicURL}users/${userId}/aggregatedWords/${wordId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAgregatedWords(userId: number) {
    await fetch(`${this.basicURL}users/${userId}/aggregatedWords`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAggregatedWordsByFilter(
    userId: string,
    // TODO (преобразование фигурных скобок в URL)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filter: string
  ): Promise<IAggregateResult[]> {
    try {
      const refreshToken: string =
        this.storage.getSavedRefreshToken() as string;

      const data = await fetch(
        `${this.basicURL}users/${userId}/aggregatedWords?filter={"userWord.difficulty":"hard"}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      return (await data.json()) as IAggregateResult[];
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getUserStats(userId: number) {
    await fetch(`${this.basicURL}users/${userId}/statistics`, {
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
    await fetch(`${this.basicURL}users/${userId}/statistics`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getUserSettings(userId: number) {
    await fetch(`${this.basicURL}users/${userId}/settings`, {
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
    await fetch(`${this.basicURL}users/${userId}/statistics`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const query = new Query("https://ts-learn-words.herokuapp.com/");
