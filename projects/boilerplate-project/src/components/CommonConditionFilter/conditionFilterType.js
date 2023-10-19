export function generatorTypeArr(type, len) {
  let tempArr = []
  len += 2
  for (let i = 0; i < len; i++) {
    if (i !== 0 && i % 2 === 0) {
      tempArr.push(type + i)
    }
  }
  return tempArr
}

export function conditionFilterTypeList() {
  let list = {}
  let regInt = new RegExp("int", "i")
  let regNum = new RegExp("num", "i")
  let regFloat = new RegExp("float", "i")
  let regDouble = new RegExp("double", "i")
  let regDecimal = new RegExp("decimal", "i")
  let regDate = new RegExp("date", "i")
  let regTime = new RegExp("time", "i")
  let regChar = new RegExp("char", "i")
  let regText = new RegExp("text", "i")
  let regString = new RegExp("string", "i")
  let regBoolean = new RegExp("boolean", "i")
  let typeIntList = []
  typeIntList = generatorTypeArr("int", 64)
  let typeBigIntList = []
  typeBigIntList = generatorTypeArr("bigint", 64)
  let typeDecimalList = []
  typeDecimalList = generatorTypeArr("decimal", 64)
  let typeNumberList = []
  typeNumberList = generatorTypeArr("number", 64)
  let typeNumericList = []
  typeNumericList = generatorTypeArr("numeric", 64)
  let typeDoubleList = []
  typeDoubleList = generatorTypeArr("double", 64)
  let typeFloatList = []
  typeFloatList = generatorTypeArr("float", 64)

  let typeList = [
    "int",
    "bigint",
    "decimal",
    "number",
    "numeric",
    "double",
    "float",
    "Int",
    "Int64",
    "Float",
    "Float32",
    "Float64",
    "Double",
    "date",
    "time",
    "datetime",
    "timestamp",
    "Date",
    "Time",
    "DateTime",
    "TimeStamp",
    "char",
    "nvarchar2",
    "varchar",
    "string",
    "text",
    "String",
    "boolean"
  ]
  let resultList = []
  resultList = [
    ...typeList,
    ...typeIntList,
    ...typeBigIntList,
    ...typeDecimalList,
    ...typeNumberList,
    ...typeNumericList,
    ...typeDoubleList,
    ...typeFloatList
  ]
  let NumberArr = [
    { label: "等于", value: "=" },
    { label: "不等于", value: "<>" },
    { label: "大于", value: ">" },
    { label: "大于等于", value: ">=" },
    { label: "小于", value: "<" },
    { label: "小于等于", value: "<=" },
    { label: "介于", value: ">=,<=" },
    { label: "有值", value: "is not null" },
    { label: "没有值", value: "is null" }
  ]
  let dateArr = [
    { label: "等于", value: "=" },
    { label: "不等于", value: "<>" },
    { label: "大于", value: ">" },
    { label: "大于等于", value: ">=" },
    { label: "小于", value: "<" },
    { label: "小于等于", value: "<=" },
    { label: "介于", value: ">=,<=" }
  ]
  let stringArr = [
    { label: "等于", value: "=" },
    { label: "不等于", value: "<>" },
    { label: "包含", value: "like" },
    { label: "不包含", value: "not like" },
    { label: "在列表中", value: "in" },
    { label: "不在列表中", value: "not in" },
    { label: "有值", value: "is not null" },
    { label: "没有值", value: "is null" },
    { label: "开头是", value: "start" },
    { label: "开头不是", value: "not start" },
    { label: "结尾是", value: "end" },
    { label: "结尾不是", value: "not end" }
  ]
  let booleanArr = [
    { label: "等于", value: "=" },
    { label: "不等于", value: "<>" },
    { label: "有值", value: "is not null" },
    { label: "没有值", value: "is null" }
  ]
  resultList.forEach((item) => {
    if (
      item.match(regInt) ||
      item.match(regNum) ||
      item.match(regFloat) ||
      item.match(regDouble) ||
      item.match(regDecimal)
    ) {
      list[item] = NumberArr
    } else if (item.match(regDate) || item.match(regTime)) {
      list[item] = dateArr
    } else if (
      item.match(regChar) ||
      item.match(regText) ||
      item.match(regString)
    ) {
      list[item] = stringArr
    } else if (item.match(regBoolean)) {
      list[item] = booleanArr
    }
  })
  return list
}
