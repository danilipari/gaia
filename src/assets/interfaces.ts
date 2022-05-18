export enum TypesInt {
  String = "string",
  Number = "number",
  Object = "object",
  Array = "array",
  Boolean = "boolean",
  Any = "any",
}

export enum Types {
  string = TypesInt.String,
  number = TypesInt.Number,
  object = TypesInt.Object,
  array = TypesInt.Array,
  boolean = TypesInt.Boolean,
  any = TypesInt.Any
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

export interface Rule {
  name: string;
  timestamp: number | string;
  attributes: Array<Attribute>;
  decisions: Array<Condition>;

  uid?: string;
  description?: string;
  permission?: Array<any>;
}

export interface Attribute {
  name: string;
  type: string;

  uid?: string;
  global?: boolean;
}

export interface Condition {
  all?: Array<Fact | Condition>;
  any?: Array<Fact | Condition>;
  event: Event;
}

export interface Event {
  type: string;
  params: object;
}

export interface Fact {
  fact: string;
  operator: string;
  value: string;

  uid?: string;
  global?: boolean;
}