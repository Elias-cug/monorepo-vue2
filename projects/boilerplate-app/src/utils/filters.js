// import * as CustomRegExp from "@/utils/regExpUtils"
import { cloneDeep } from "lodash"
// 条件筛选表达式转义
export function expressionFilters(value) {
  let logicType = [
    { label: "等于", value: "=" },
    { label: "不等于", value: "<>" },
    { label: "包含", value: "like" },
    { label: "不包含", value: "not like" },
    { label: "有值", value: "is not null" },
    { label: "没有值", value: "is null" },
    { label: "正则匹配", value: "~" },
    { label: "正则不匹配", value: "!~" },
    { label: "大于", value: ">" },
    { label: "大于或等于", value: ">=" },
    { label: "小于", value: "<" },
    { label: "小于等于", value: "<=" },
    { label: "区间", value: ">=,<=" },
    { label: "有值", value: "is not null" },
    { label: "没有值", value: "is null" },
    { label: "开头是", value: "start" },
    { label: "开头不是", value: "not start" },
    { label: "结尾是", value: "end" },
    { label: "结尾不是", value: "not end" },
    { label: "在列表中", value: "in" },
    { label: "不在列表中", value: "not in" }
  ]
  logicType.forEach((e) => {
    if (e.value == value) {
      value = e.label
    }
  })
  return value
}
/**
 * @description 条件筛选去除百分号
 * @param {*} fieldsItem
 * @returns
 */
export function replaceFilters(fieldsItem) {
  // 当前条件项为 “区间”
  if (fieldsItem.expression == ">=,<=") {
    if (
      fieldsItem.type.includes("num") ||
      fieldsItem.type.includes("int") ||
      fieldsItem.type.includes("decimal") ||
      fieldsItem.type.includes("float") ||
      fieldsItem.type.includes("Int64") ||
      fieldsItem.type.includes("Float64")
    ) {
      return fieldsItem.value + "-" + fieldsItem.value2
    } else {
      return fieldsItem.timeAry[0] + "-" + fieldsItem.timeAry[1]
    }
  } else {
    return (fieldsItem.value = fieldsItem.value.replace(
      /^(\s|%)+|(\s|%)+$/g,
      ""
    ))
  }
}

/**
 * @description 条件筛选项为"包含"及"不包含"类型数据，添加百分号符号（后台查询like类型的必须） 修改后台查询in  not in类型
 * @param {Array} paramLists
 * @author zzl81cn
 * */
export function arrangeConditionParams(paramLists) {
  // let likeStrRegExp = CustomRegExp.likeStrRegExp()
  let dataResult = []
  if (paramLists.length !== 0) {
    dataResult = cloneDeep(paramLists)
    dataResult.forEach((item) => {
      for (let i in item) {
        if (i === "fields") {
          item[i].forEach((citem) => {
            delete citem.errorfieldSymbolflag
            delete citem.errorfieldcontentflag
            delete citem.errorfieldenddateflag
            delete citem.errorfieldflag
            delete citem.errorfieldlogicflag
            delete citem.errorfieldstartdateflag
            delete citem.errorfieldtypeflag
            delete citem.focusin
            /**
             * @description 如果当前筛选条件匹配到 “like”- 判断输入条件是否带
             */
            // if (citem.expression.match(likeStrRegExp)) {
            //   let arr = citem.value.split("")
            //   if (arr[0] !== "%" || arr[arr.length - 1] !== "%") {
            //     // eslint-disable-next-line no-self-assign
            //     citem.value = citem.value
            //   }
            // }
            /* 不要删，处理后端数据时间戳带有毫秒的情况 */
            /* if (citem.type.includes('datetime') || citem.type.includes('timestamp')) {
              citem.value = citem.value.substring(0, 19);
            } */
            if (citem.expression == ">=,<=") {
              //时间的介于
              if (
                citem.type == "date" ||
                citem.type == "time" ||
                citem.type == "datetime" ||
                citem.type == "timestamp"
              ) {
                citem.value1 = citem.timeAry[0]
                citem.value2 = citem.timeAry[1]
                delete citem.value
                //数值的介于
              } else if (
                citem.type.includes("num") ||
                citem.type.includes("int") ||
                citem.type.includes("decimal") ||
                citem.type.includes("float") ||
                citem.type.includes("Int64") ||
                citem.type.includes("Float64")
              ) {
                citem.value1 = citem.value
                // citem.value2 = citem.value2
                delete citem.value
              }
            } else {
              delete citem.value2
            }
            delete citem.timeAry
          })
        }
      }
    })
  }
  return dataResult
}
/**
 * @param {Array} sourceData
 * @description
 *  1: 条件筛选参数的组间、组内逻辑关系，一条没有两条有的原则
 *  （一组不要传递relation和layerralation参，视图上也不显示组内逻辑；
 *    一组内多字段传递并显示逻辑，多组由第一组lr决定逻辑关系，清除最后一组lr参数；
 *    也不要传递value1和value2参数了
 *    ）
 * */
export function processConditionRelation(sourceData) {
  let len = sourceData.length
  /* 一条筛选，去除第一组的关系参数，多组的去除最后一组关系参数“layer_relation” */
  if (len === 1) {
    sourceData[0].layer_relation = ""
    /* 各组内只有一项条件的去除表示组内关系的参数“relation” */
    sourceData.forEach((item) => {
      if (item.length <= 1) {
        item.relation = ""
      }
    })
  } else if (len > 1) {
    sourceData[len - 1].layer_relation = ""
    sourceData.forEach((item) => {
      if (item.length <= 1) {
        item.relation = ""
      }
    })
  }
  return sourceData
}
