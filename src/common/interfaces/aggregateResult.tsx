import { IAggregateWord } from "./aggregateWord";

export interface IAggregateResult {
  paginatedResults: IAggregateWord[];
  totalCount: [{count: number}];
}
