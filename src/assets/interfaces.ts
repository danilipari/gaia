
export interface OperatorsInterface {
  name: string;
  value?: string;
}

export enum OperatorsInt {
  Equal = "equal",
  NotEqual = "notEqual",
  In = "in",
  NotIn = "notIn",
  Contains = "contains",
  DoesNotContain = "doesNotContain",
  LessThan = "lessThan",
  LessThanInclusive = "lessThanInclusive",
  GreaterThan = "greaterThan",
  GreaterThanInclusive = "greaterThanInclusive"
}

export enum Operators {
  equal = OperatorsInt.Equal,
  notEqual = OperatorsInt.NotEqual,
  in = OperatorsInt.In,
  notIn = OperatorsInt.NotIn,
  contains = OperatorsInt.Contains,
  doesNotContain = OperatorsInt.DoesNotContain,
  lessThan = OperatorsInt.LessThan,
  lessThanInclusive = OperatorsInt.LessThanInclusive,
  greaterThan = OperatorsInt.GreaterThan,
  greaterThanInclusive = OperatorsInt.GreaterThanInclusive
}