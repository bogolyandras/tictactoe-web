
export enum Field {

  /**
   * X
   */
  Cross,

  /**
   * O
   */
  Naught,

  /**
   * _
   */
  Empty

}

export class FieldMeta {

  recentlyChecked = false;
  relatedToWinningCross = false;

}
