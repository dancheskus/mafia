interface IPropsShooting {
  shooting: true;
  onNumberSelected: (num: number) => void;
  lastPlayer?: undefined;
  votesLeft?: undefined;
  selectedNumber?: undefined;
}
interface IPropsVoting {
  shooting?: undefined;
  lastPlayer?: boolean;
  votesLeft: number;
  onNumberSelected: (num: number) => void;
  selectedNumber?: number;
}

export type TProps = IPropsShooting | IPropsVoting;
