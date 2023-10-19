<template>
  <el-row class="commonConditionFilterBox">
    <!-- 条件筛选头部标题行：层级 关系 选择字段 字段类型 逻辑 内容 -->
    <div class="commonConditionFilterBox__header">
      <div class="level">层级</div>
      <div class="relation">关系</div>
      <div class="inset-title">
        <div class="select-filed-value">选择字段</div>
        <div class="select-filed-logic">逻辑</div>
        <div class="input-field-content">内容</div>
        <div class="operator"></div>
      </div>
    </div>
    <el-row class="commonConditionFilterBox__FilterContent">
      <el-row
        v-for="(item, index) in filterList"
        :key="index + 'layer_relation'"
        class="commonConditionFilterBox__FilterItem"
      >
        <div class="commonConditionFilterBox__FilterItem__Create">
          <div class="commonConditionFilterBox__FilterItem__Create-level">
            <span class="commonConditionFilterBox__FilterItem__Create-num"
              >({{ index + 1 }})</span
            >
            <span
              class="commonConditionFilterBox__FilterItem__Create-line"
            ></span>
            <!-- 层级关系图标，最后一层不需要展示 -->
            <img
              v-show="index < filterList.length - 1"
              :src="layer_relation[item.layer_relation]"
              class="commonConditionFilterBox__FilterItem__Create-img"
              @click.stop="setLayerRelation(index)"
              alt=""
            />
          </div>
          <div class="commonConditionFilterBox__FilterItem__body">
            <div class="commonConditionFilterBox__FilterItem__body__left">
              <span
                class="commonConditionFilterBox__FilterItem__body__left-line"
              ></span>
              <!-- 层内筛选项是否展开  图标 -->
              <img
                :src="
                  item.openstatus ? folderChild.expand : folderChild.collapse
                "
                class="commonConditionFilterBox__FilterItem__body__left-fileclose"
                @click="setlayeropenTypestatus(index)"
                :alt="item.openstatus"
              />
              <!-- 层内筛选项之间关系  图标 -->
              <img
                :src="
                  item.relation
                    ? layer_relation[item.relation]
                    : layer_relation['mid']
                "
                class="commonConditionFilterBox__FilterItem__body__left-andOr"
                @click="setchildrenRelation(index)"
                :alt="item.relation"
              />
            </div>
            <!-- 删除一行 -->
            <div
              v-show="filterList.length > 0"
              class="commonConditionFilterBox__FilterItem__body__right"
            >
              <el-tooltip content="删除一组">
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-remove"
                  class="icon-button icon-danger commonConditionFilterBox__FilterItem__body__right-del"
                  @click="deletesourceData(index)"
                ></el-button>
              </el-tooltip>
            </div>
            <!-- 组内（层内筛选条件） -->
            <ul class="commonConditionFilterBox__FilterItem__Detail">
              <li
                v-show="!childindex || (childindex && item.openstatus)"
                v-for="(childitem, childindex) in item.fields"
                :key="childindex"
                class="commonConditionFilterBox__FilterItem__DetailItem"
              >
                <el-row :gutter="20" style="width: 96%">
                  <!-- 字段选择下拉框 start -->
                  <el-col :span="7">
                    <span
                      class="ConditionFilterItem-one"
                      :class="{ 'error-tips': childitem.errorfieldflag }"
                    >
                      <span class="draw-circle-wrap">
                        <span class="drawLine"></span>
                        <span v-show="childindex" class="drawLine-left"></span>
                        <span class="draw-circle">{{ childindex + 1 }}</span>
                      </span>
                      <jat-select
                        v-model="childitem.field"
                        size="small"
                        clearable
                        filterable
                        placeholder="请选择"
                        @change="
                          changefieldValue($event, index, childitem, childindex)
                        "
                      >
                        <el-option
                          v-for="fieldsitem in columsData"
                          :key="fieldsitem.zddm"
                          :label="fieldsitem.zdmc"
                          :value="fieldsitem.zddm"
                        ></el-option>
                      </jat-select>
                      <span
                        class="error-tip-text"
                        v-show="childitem.errorfieldflag"
                        >请选择字段</span
                      >
                    </span>
                  </el-col>
                  <!-- 字段选择下拉框 end -->
                  <!-- 逻辑下拉框 start -->
                  <el-col :span="5">
                    <span
                      class="ConditionFilterItem-logic"
                      :class="{
                        'error-tips': childitem.errorfieldlogicflag
                      }"
                    >
                      <jat-select
                        v-model="childitem.expression"
                        size="small"
                        @change="
                          changelogicValue($event, index, childitem, childindex)
                        "
                      >
                        <el-option
                          v-show="logicType[childitem.type]"
                          v-for="logicitem in logicType[childitem.type]"
                          :key="logicitem.value"
                          :label="logicitem.label"
                          :value="logicitem.value"
                        ></el-option>
                        <el-option
                          v-if="!logicType[childitem.type]"
                        ></el-option>
                      </jat-select>
                      <span
                        v-show="childitem.errorfieldlogicflag"
                        class="error-tip-text"
                        >请选择逻辑</span
                      >
                    </span>
                  </el-col>
                  <!-- 逻辑下拉框 end -->
                  <!--内容；输入框/日期 start -->
                  <el-col
                    :span="9"
                    :style="
                      ['in', 'not in', 'like', 'not like'].indexOf(
                        childitem.expression
                      ) > -1
                        ? 'padding-right:0'
                        : ''
                    "
                  >
                    <div
                      style="padding: 0 5px; margin-bottom: 14px"
                      v-if="
                        ['in', 'not in', 'like', 'not like'].indexOf(
                          childitem.expression
                        ) > -1
                      "
                    >
                      <el-row ref="popoverRow">
                        <el-popover
                          :disabled="
                            childitem.value
                              .trim()
                              .split(/[,，]/)
                              .filter((item) => item !== '').length < 1
                          "
                          placement="bottom"
                          popper-class="dropDownPoper"
                          :width="popoverWidth"
                          trigger="hover"
                        >
                          <div class="dropDownPop">
                            <span
                              :key="item + index"
                              :title="item"
                              v-for="(item, index) in childitem.value
                                .trim()
                                .split(/[,，]/)
                                .filter((item) => item !== '')"
                            >
                              <i
                                @click="
                                  handelDeleteDropDownItem(
                                    childitem,
                                    item,
                                    index
                                  )
                                "
                                class="el-icon-close dropDownItem_delete"
                              ></i>
                              <span class="dropDownItem_name">{{ item }}</span>
                            </span>
                          </div>
                          <template slot="reference">
                            <div class="expressRow">
                              <span
                                v-if="
                                  childitem.value
                                    .trim()
                                    .split(/[,，]/)
                                    .filter((item) => item !== '').length
                                "
                                class="expressDropDown"
                              >
                                <el-tag
                                  :title="
                                    childitem.value
                                      .trim()
                                      .split(/[,，]/)
                                      .filter((item) => item !== '')[0]
                                  "
                                  size="mini"
                                  >{{
                                    childitem.value
                                      .trim()
                                      .split(/[,，]/)
                                      .filter((item) => item !== "")[0]
                                  }}</el-tag
                                >
                                <el-tag
                                  style="flex-shrink: 0"
                                  v-if="
                                    childitem.value
                                      .trim()
                                      .split(/[,，]/)
                                      .filter((item) => item !== '').length > 1
                                  "
                                  size="mini"
                                >
                                  +{{
                                    childitem.value
                                      .trim()
                                      .split(/[,，]/)
                                      .filter((item) => item !== "").length - 1
                                  }}
                                </el-tag>
                              </span>
                              <jat-input
                                class="noBorder"
                                size="small"
                                type="text"
                                @input="
                                  childitem.tempVal = childitem.tempVal.replace(
                                    /[，,]/g,
                                    ''
                                  )
                                "
                                v-model="childitem.tempVal"
                                @change="
                                  handelAppendExpressionChange(
                                    childitem,
                                    childitem.tempVal
                                  )
                                "
                                :placeholder="
                                  childitem.expression == 'in' ||
                                  childitem.expression == 'not in'
                                    ? '精确查询'
                                    : childitem.expression == 'like' ||
                                      childitem.expression == 'not like'
                                    ? '模糊查询'
                                    : ''
                                "
                              >
                              </jat-input>
                            </div>
                          </template>
                        </el-popover>
                      </el-row>
                    </div>
                    <span
                      style="display: flex"
                      v-else-if="
                        childitem.type.includes('string') ||
                        childitem.type.includes('char') ||
                        childitem.type.includes('text') ||
                        childitem.type.includes('String')
                      "
                      class="ConditionFilterItem-content children-item-input"
                      :class="{
                        'ConditionFilterItem-content-multiple':
                          childitem.focusin,
                        'error-tips': childitem.errorfieldcontentflag
                      }"
                    >
                      <jat-input
                        style="width: 100%"
                        :ref="'input' + index + '_' + childindex"
                        type="text"
                        v-model="childitem.value"
                        size="small"
                        :maxlength="64"
                        @focus="setChildFocus(index, childindex)"
                        @blur="setChildBlur($event, index, childindex)"
                        :disabled="
                          childitem.expression === 'is null' ||
                          childitem.expression === 'is not null'
                        "
                        :readonly="
                          ['in', 'not in', 'like', 'not like'].indexOf(
                            childitem.expression
                          ) > -1
                        "
                        :placeholder="
                          childitem.expression == 'in' ||
                          childitem.expression == 'not in'
                            ? '多个值以逗号或空格分隔(精确查询)'
                            : childitem.expression == 'like' ||
                              childitem.expression == 'not like'
                            ? '多个值以逗号或空格分隔(模糊查询)'
                            : ''
                        "
                      >
                      </jat-input>
                      <span class="condition-filter-error">
                        <span
                          v-show="childitem.errorfieldcontentflag"
                          class="error-tip-text standard"
                          >请填写正确内容</span
                        >
                        <span
                          v-show="childitem.errorfieldSymbolflag"
                          class="error-tip-text standard"
                          >请检查数据格式是否正确</span
                        >
                      </span>
                    </span>
                    <span
                      style="display: flex"
                      v-else-if="
                        childitem.type.includes('num') ||
                        childitem.type.includes('int') ||
                        childitem.type.includes('decimal') ||
                        childitem.type.includes('float') ||
                        childitem.type.includes('Int64') ||
                        childitem.type.includes('Float64')
                      "
                      class="ConditionFilterItem-content children-item-input"
                      :class="{
                        'ConditionFilterItem-content-multiple':
                          childitem.focusin,
                        'error-tips': childitem.errorfieldcontentflag
                      }"
                    >
                      <span
                        class="ConditionFilterItem-content-inputRange"
                        v-if="childitem.expression === '>=,<='"
                      >
                        <jat-input
                          :ref="'input' + index + '_' + childindex"
                          type="number"
                          class="ConditionFilterItem-content-input"
                          v-model="childitem.value"
                          size="small"
                          :maxlength="64"
                          @focus="setChildFocus(index, childindex)"
                          @blur="setChildBlur($event, index, childindex)"
                        />
                        <span class="ConditionFilterItem-content-to">至</span>
                        <jat-input
                          :ref="'input2' + index + '_' + childindex"
                          type="number"
                          class="ConditionFilterItem-content-input"
                          v-model="childitem.value2"
                          size="small"
                          :maxlength="64"
                          @focus="setChildFocus2(index, childindex)"
                          @blur="setChildBlur($event, index, childindex)"
                        />
                      </span>
                      <template v-else>
                        <jat-input
                          style="width: 100%"
                          :ref="'input' + index + '_' + childindex"
                          type="number"
                          v-model="childitem.value"
                          size="small"
                          :maxlength="64"
                          @focus="setChildFocus(index, childindex)"
                          @blur="setChildBlur($event, index, childindex)"
                          :disabled="
                            childitem.expression === 'is null' ||
                            childitem.expression === 'is not null'
                          "
                        />
                      </template>
                      <span class="condition-filter-error">
                        <span
                          v-show="childitem.errorfieldcontentflag"
                          class="error-tip standard"
                          >请填写正确内容</span
                        >
                        <span
                          v-show="childitem.errorfieldSymbolflag"
                          class="error-tip standard"
                          >要求最大值>最小值，且两个值都是必填</span
                        >
                      </span>
                    </span>
                    <!-- 日期 年月日 -->
                    <span
                      v-else-if="childitem.type === 'date'"
                      class="ConditionFilterItem-content children-item-input"
                    >
                      <span
                        style="margin-bottom: 14px"
                        class="ConditionFilterItem-content-date"
                        :class="{
                          'error-tips': childitem.errorfieldstartdateflag
                        }"
                      >
                        <jat-date-picker
                          width="100%"
                          v-model="childitem.value"
                          v-if="childitem.expression != '>=,<='"
                          type="date"
                          suffix
                          placeholder="请选择日期"
                          size="small"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          @change="changestartdateValue(index, childindex)"
                        />
                        <jat-date-picker
                          width="100%"
                          v-model="childitem.timeAry"
                          v-else
                          type="daterange"
                          suffix
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          format="HH:mm:ss"
                          value-format="HH:mm:ss"
                          size="small"
                          @change="changedateRangeValue(index, childindex)"
                        />
                        <span class="condition-filter-error">
                          <span
                            v-show="childitem.errorfieldstartdateflag"
                            class="error-tip standard"
                            >请选择日期</span
                          >
                        </span>
                      </span>
                    </span>
                    <!-- 时间 时分秒 -->
                    <span
                      v-else-if="childitem.type === 'time'"
                      class="ConditionFilterItem-content children-item-input"
                    >
                      <span
                        style="margin-bottom: 14px"
                        class="ConditionFilterItem-content-date"
                        :class="{
                          'error-tips': childitem.errorfieldstartdateflag
                        }"
                      >
                        <el-time-picker
                          v-model="childitem.value"
                          v-if="childitem.expression != '>=,<='"
                          suffix
                          placeholder="请选择时间"
                          size="small"
                          format="HH:mm:ss"
                          value-format="HH:mm:ss"
                          @change="changestartdateValue(index, childindex)"
                        />
                        <el-time-picker
                          v-model="childitem.timeAry"
                          v-else
                          range-separator="至"
                          is-range
                          suffix
                          format="HH:mm:ss"
                          value-format="HH:mm:ss"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          size="small"
                          @change="changedateRangeValue(index, childindex)"
                        />
                        <span class="condition-filter-error">
                          <span
                            v-show="childitem.errorfieldstartdateflag"
                            class="error-tip standard"
                            >请选择时间</span
                          >
                        </span>
                      </span>
                    </span>
                    <!-- 日期 年月日时分秒 -->
                    <span
                      v-else-if="
                        childitem.type === 'datetime' ||
                        childitem.type === 'timestamp'
                      "
                      class="ConditionFilterItem-content children-item-input"
                    >
                      <span
                        style="margin-bottom: 14px"
                        class="ConditionFilterItem-content-date"
                        :class="{
                          'error-tips': childitem.errorfieldstartdateflag
                        }"
                      >
                        <jat-date-picker
                          width="100%"
                          v-model="childitem.value"
                          type="datetime"
                          v-if="childitem.expression != '>=,<='"
                          :key="Date.now()"
                          suffix
                          placeholder="请选择日期 时间"
                          size="small"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          @change="changestartdateValue(index, childindex)"
                        />
                        <jat-date-picker
                          width="100%"
                          v-model="childitem.timeAry"
                          v-else
                          type="datetimerange"
                          suffix
                          :key="Date.now()"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          start-placeholder="开始日期时间"
                          end-placeholder="结束日期时间"
                          size="small"
                          @change="changedateRangeValue(index, childindex)"
                        />
                        <span class="condition-filter-error">
                          <span
                            v-show="childitem.errorfieldstartdateflag"
                            class="error-tip standard"
                            >请选择日期时间</span
                          >
                        </span>
                      </span>
                    </span>
                  </el-col>
                  <!--内容；输入框/日期 end -->
                  <!-- 操作区 -->
                  <el-col :span="3">
                    <span class="item-icon-btn">
                      <template
                        v-if="
                          ['in', 'not in', 'like', 'not like'].indexOf(
                            childitem.expression
                          ) > -1
                        "
                      >
                        <jat-button
                          @click="handelAppendExpressionValue(childitem)"
                          class="filterDialogExpandBtn"
                          type="primary"
                          size="mini"
                        >
                          批量录入
                        </jat-button>
                      </template>
                      <template v-else>
                        <el-tooltip content="编辑该项">
                          <el-button
                            type="text"
                            size="small"
                            icon="iconfont iconedit-o"
                            class="icon-button"
                            @click="setChildFocus(index, childindex)"
                            :disabled="
                              !childitem.type.includes('string') &&
                              !childitem.type.includes('char') &&
                              !childitem.type.includes('text') &&
                              !childitem.type.includes('num') &&
                              !childitem.type.includes('int') &&
                              !childitem.type.includes('decimal')
                            "
                          ></el-button>
                        </el-tooltip>
                      </template>
                      <el-tooltip content="删除一项">
                        <el-button
                          v-show="item.fields.length > 1"
                          type="text"
                          size="small"
                          icon="el-icon-remove"
                          class="icon-button icon-danger commonConditionFilterBox__FilterItem__body__right-del"
                          @click="deletesourceDataItem(index, childindex)"
                        ></el-button>
                      </el-tooltip>
                      <el-tooltip content="增加一项">
                        <el-button
                          v-show="item.fields.length === childindex + 1"
                          type="text"
                          size="small"
                          icon="el-icon-circle-plus"
                          class="icon-button"
                          @click="addSourceDataItem(index)"
                        ></el-button>
                      </el-tooltip>
                    </span>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </div>
      </el-row>

      <!------ 当前暂无筛选条件时增加占位空条件------start -->
      <el-row class="commonConditionFilterBox__FilterItem">
        <div
          v-show="!filterList || (filterList && filterList.length === 0)"
          class="h-40px"
        ></div>
        <div class="commonConditionFilterBox__FilterItem__Create">
          <div class="commonConditionFilterBox__FilterItem__Create-level">
            <el-tooltip content="增加一组">
              <el-button
                type="text"
                size="small"
                icon="el-icon-circle-plus"
                class="icon-button"
                @click="addFilterItem()"
              ></el-button>
            </el-tooltip>
          </div>
        </div>
      </el-row>
      <!------ 当前暂无筛选条件时增加占位空条件------start -->
      <div class="h-40px"></div>
    </el-row>
    <div class="text-right">
      <jat-button @click="CloseCommonFilter" class="mr-10px" type="text"
        >取消</jat-button
      >
      <jat-button
        class="mr-10px"
        type="info"
        plain
        @click="showClearConditionFilterConfirmDialog()"
        :disabled="filterList.length === 0"
        >重置</jat-button
      >
      <jat-button @click="confirmSubmitCondition()">确定</jat-button>
    </div>
    <!-- like notlike in notin弹窗 -->
    <el-dialog
      width="450px"
      :title="ExpressionDialogTile"
      class="CkDialog"
      :visible.sync="handelAppendExpressionDialog"
      append-to-body
    >
      <div>
        <jat-input
          class="w-100%"
          v-model="handelAppendExpressionDialogVal"
          type="textarea"
          resize="none"
          clearable
          :autosize="{ minRows: 10, maxRows: 10 }"
          placeholder="多个值请以回车分隔"
        >
        </jat-input>
      </div>
      <span class="warningTxt">注意：按换行符分隔，每行一个值</span>
      <div slot="footer" class="text-right btn-right">
        <jat-button
          type="primary"
          class="mr-10px"
          @click="handelAppendExpressionSuccess()"
          >确定</jat-button
        >
        <jat-button type="info" @click="handelAppendExpressionClose()"
          >取消</jat-button
        >
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { cloneDeep } from "lodash"
// 逻辑数据
import { conditionFilterTypeList } from "./conditionFilterType"
import { getDate } from "@/utils/tools"
// 重置条件筛选数据确认框
// import clearConditionFilterConfirmDialog from "@/components/ClearConditionFilterConfirmDialog"
import iconFilterAnd from "@/assets/img/filter/and.png"
import iconFilterOr from "@/assets/img/filter/or.png"
import iconFilterMid from "@/assets/img/filter/relation-mid.png"
import iconFilterDelFile from "@/assets/img/filter/delFile.png"
import iconFilterAddFile from "@/assets/img/filter/addFile.png"
export default {
  name: "CommonConditionFilter",
  components: {
    // clearConditionFilterConfirmDialog,
  },
  props: {
    /**
     * @description  筛选字段列表
     */
    columsData: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    /**
     * @description 父组件传入条件筛选参数
     */
    originFilterList: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      // 层级图片
      layer_relation: {
        and: iconFilterAnd,
        mid: iconFilterMid,
        or: iconFilterOr
      },
      // 层级图片
      folderChild: {
        expand: iconFilterDelFile,
        collapse: iconFilterAddFile
      },
      startDateValue: "", // 起始日期
      endDateValue: "", // 结束日期
      minNumberValue: "", // 最小取值
      maxNumberValue: "", // 最大取值
      // 条件筛选逻辑
      logicType: {},
      // 父组件传进的条件筛选参数    接口返回的数据
      filterList: cloneDeep(this.originFilterList || []),

      // --------- like notlike in notin弹窗 -----------
      handelAppendExpressionDialog: false,
      handelAppendExpressionDialogItem: {},
      handelAppendExpressionDialogVal: "",
      ExpressionDialogTile: "",
      // --------- like notlike in notin弹窗 -----------

      deletePopoverVisable: false, // 删除筛选条件
      popoverWidth: 0
    }
  },
  methods: {
    /**
     * @description 点击筛选条件增加一层（外层）
     */
    addFilterItem() {
      let layer = this.newLayer()
      let lastLayer = this.filterList[this.filterList.length - 1]
      if (lastLayer && !lastLayer.layer_relation) {
        lastLayer.layer_relation = "and"
      }
      this.filterList.push(layer)
    },
    /**
     * @description  删除一组(层)条件参数
     * @param {*} index
     */
    deletesourceData(index) {
      this.filterList.splice(index, 1)
    },
    /**
     * @description 一"层" 筛选参数
     */
    newLayer() {
      let layerItem = this.newLayerItem()
      return {
        fields: [layerItem], // 筛选项内部条件
        relation: "", // 内部关系
        layer_relation: "and", // 层级关系
        openstatus: true // 当前这层筛选是否展开
      }
    },
    /**
     * @description 生成fields数据对象
     */
    newLayerItem() {
      return {
        /* 是否可以关闭条件筛选tag */
        closable: true,
        expression: "",
        name: "",
        field: "",
        type: "string",
        tagType: "",
        value: "",
        timeAry: "",
        value2: "",
        focusin: false
      }
    },
    /**
     * @description 设置层级之前关系 layer_relation 且 and/或 or
     * @param {*} index
     */
    setLayerRelation(index) {
      let layer_relation = this.filterList[index].layer_relation
      this.filterList[index].layer_relation =
        layer_relation == "and" ? "or" : "and"
    },
    /**
     * @description 设置层内筛选条件是否展开
     * @param {*} index
     */
    setlayeropenTypestatus(index) {
      let status = this.filterList[index].openstatus
      this.filterList[index].openstatus = !status
    },
    /**
     * @description 层内筛选项之间关系
     * @param {*} index
     */
    setchildrenRelation(index) {
      let relation = this.filterList[index].relation
      // 层内筛选项只有一项时 不需要设置
      if (this.filterList[index].fields.length <= 1) {
        return
      } else {
        this.filterList[index].relation = relation === "and" ? "or" : "and"
      }
    },
    /**
     * @description 选择字段--下拉框改变
     * @param {*} evtSelVal
     * @param {*} index
     * @param {*} childitem
     * @param {*} childindex
     */
    changefieldValue(evtSelVal, index, childitem, childindex) {
      let filterItemFields = this.filterList[index].fields[childindex]
      /* 切换字段后清空之前数据 */
      filterItemFields.value = ""
      if (filterItemFields.value2) {
        filterItemFields.value2 = ""
      }
      this.columsData.forEach((item) => {
        if (filterItemFields.field === item.zddm) {
          /* 如果传进来的字段是日期类型，统计方式为最大值或最小值，特殊处理type */
          filterItemFields.type = item.zdlx
          filterItemFields.name = item.zdmc
          filterItemFields.business_type = item.field_business_type
            ? item.field_business_type
            : ""
          filterItemFields.expression = ""
        }
      })
      filterItemFields.errorfieldflag = !filterItemFields.field
      filterItemFields.errorfieldcontentflag = false
    },
    /**
     * @description 选择逻辑关系
     * @param {*} $event
     * @param {*} index
     * @param {*} childitem
     * @param {*} itemIndex
     */
    changelogicValue($event, index, childitem, itemIndex) {
      let obj = this.filterList[index].fields[itemIndex]
      obj.value = ""
      obj.value2 = ""
      obj.timeAry = ""
      obj.errorfieldcontentflag = false
      obj.errorfieldlogicflag = !obj.expression
    },

    /**
     * @description 筛选内容输入框获取焦点
     * @param {*} index
     * @param {*} itemIndex
     */
    setChildFocus(index, itemIndex) {
      let obj = this.filterList[index].fields[itemIndex]
      /* 复位特殊字符校验状态 */
      obj.errorfieldSymbolflag = false
      obj.focusin = true
      this.$refs["input" + index + "_" + itemIndex][0].focus()
    },
    /**
     * @description 条件筛选项输入框失焦，点击添加一组时也会调用
     * @param {*} evt
     * @param {*} index
     * @param {*} itemIndex
     */
    setChildBlur(evt, index, itemIndex) {
      let obj = this.filterList[index].fields[itemIndex]
      obj.focusin = false
      if (["in", "not in", "like", "not like"].indexOf(obj.expression) > -1) {
        return
      }
      if (obj.expression == ">=,<=") {
        obj.errorfieldcontentflag =
          obj.value.length === 0 ||
          obj.value2.length === 0 ||
          obj.value > obj.value2
      } else {
        obj.errorfieldcontentflag = obj.value.length === 0
      }
    },
    /**
     * @description 数值最大值获取焦点
     * @param {*} index
     * @param {*} itemIndex
     */
    setChildFocus2(index, itemIndex) {
      let obj = this.filterList[index].fields[itemIndex]
      /* 复位特殊字符校验状态 */
      obj.errorfieldSymbolflag = false
      obj.focusin = true
      this.$refs["input2" + index + "_" + itemIndex][0].focus()
    },

    /**
     * @description 批量录入输入框 change事件
     * @param {*} childitem
     * @param {*} val
     */
    handelAppendExpressionChange(childitem, val) {
      if (childitem.value) {
        childitem.value = childitem.value + "," + val
      } else {
        childitem.value = val
      }
      delete childitem.tempVal
    },
    /**
     * @description 批量输入popover删除事件
     * @param {*} childitem
     * @param {*} item
     * @param {*} index
     */
    handelDeleteDropDownItem(childitem, item, index) {
      let itemlist = childitem.value
        .trim()
        .split(/[,，]/)
        .filter((item) => item !== "")
      itemlist.splice(index, 1)
      childitem.value = itemlist.join(",")
    },
    // 点击批量录入按钮
    handelAppendExpressionValue(item) {
      switch (item.expression) {
        case "like":
          this.ExpressionDialogTile = "包含"
          break
        case "not like":
          this.ExpressionDialogTile = "不包含"
          break
        case "in":
          this.ExpressionDialogTile = "在列表中"
          break
        case "not in":
          this.ExpressionDialogTile = "不在列表中"
          break
      }
      this.handelAppendExpressionDialogItem = item
      this.handelAppendExpressionDialogVal = item.value
        .trim()
        .split(/[,，]/)
        .filter((item) => item !== "")
        .join("\n")
      this.handelAppendExpressionDialog = true
    },
    // 批量输入弹窗确定事件
    handelAppendExpressionSuccess() {
      let val = this.handelAppendExpressionDialogVal
        .split(/\n/g)
        .map((item) => item.trim())
      val = val.filter((item) => item !== "")
      if (val.length === 0) {
        this.$message("筛选条件内容不能为空")
        return
      }
      this.handelAppendExpressionDialogItem.value = val.join(",")
      this.handelAppendExpressionDialog = false
    },
    // 关闭批量录入弹窗
    handelAppendExpressionClose() {
      this.handelAppendExpressionDialog = false
    },
    /**
     * @description 组内增加一项
     * @param {*} index
     */
    addSourceDataItem(index) {
      let item = this.newLayerItem()
      if (this.filterList[index].fields.length <= 1) {
        this.filterList[index].relation = "and"
        this.filterList[index].fields.push(item)
        this.filterList[index].openstatus = true
      } else {
        this.filterList[index].fields.push(item)
        this.filterList[index].openstatus = true
      }
    },
    /**
     * @description 组内删除一项
     * @param {*} index
     * @param {*} itemIndex
     */
    deletesourceDataItem(index, itemIndex) {
      this.filterList[index].fields.splice(itemIndex, 1)
      if (this.filterList[index].fields.length <= 1) {
        this.filterList[index].relation = ""
      }
    },
    /**
     * @description 条件筛选：确定
     */
    confirmSubmitCondition() {
      if (!this.validateConditionData(this.filterList)) {
        return
      } else {
        this.$emit("confirmSubmitCondition", this.filterList)
      }
    },

    // 日期组件事件
    changestartdateValue(index, itemIndex) {
      let obj = this.filterList[index].fields[itemIndex]
      obj.errorfieldstartdateflag = !obj.value
    },
    //日期范围组件事件
    changedateRangeValue(index, itemIndex) {
      let obj = this.filterList[index].fields[itemIndex]
      if (obj.timeAry.length > 0) {
        obj.errorfieldstartdateflag = false
      } else {
        obj.errorfieldstartdateflag = true
      }
    },
    /**
     * @description 校验条件查询参数数据
     * @param {*} params
     */
    validateConditionData(params) {
      let flag = true
      params.forEach((item) => {
        item.fields.forEach((childitem) => {
          if (
            !(
              childitem.field &&
              childitem.expression &&
              this.isNotEmpty(childitem)
            )
          ) {
            childitem.value = getDate(childitem.value)
            flag = false
          }
        })
      })
      if (!flag) {
        this.$message("筛选条件内容不能为空")
        return
      }
      return flag
    },
    // 判断是否
    isNotEmpty(childitem) {
      var bool1 =
        childitem.expression === "is not null" ||
        childitem.expression === "is null" ||
        childitem.expression === ">=,<="
      if (!bool1) {
        return childitem.value
      } else {
        if (childitem.expression == ">=,<=") {
          //时间的介于
          if (
            childitem.type == "date" ||
            childitem.type == "time" ||
            childitem.type == "datetime" ||
            childitem.type == "timestamp"
          ) {
            return childitem.timeAry.length > 0
            //数值的介于
          } else if (
            childitem.type.includes("num") ||
            childitem.type.includes("int") ||
            childitem.type.includes("decimal") ||
            childitem.type.includes("float") ||
            childitem.type.includes("Int64") ||
            childitem.type.includes("Float64")
          ) {
            return childitem.value && childitem.value2
          }
        } else if (
          childitem.expression === "is not null" ||
          childitem.expression === "is null"
        ) {
          return true
        }
      }
    },
    /**
     * @description 重置条件筛选
     */
    async showClearConditionFilterConfirmDialog() {
      try {
        await this.$confirm("确定重置筛选条件吗？", "提示")
        this.filterList = []
        // this.$emit("confirmSubmitCondition", this.filterList)
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * @description 关闭筛选条件弹窗
     */
    CloseCommonFilter() {
      this.$emit("CloseCommonFilter")
    }
  },
  beforeMount() {
    /* 处理逻辑类型下拉列表 */
    this.logicType = conditionFilterTypeList()
  },
  updated() {
    this.$nextTick(() => {
      if (this.$refs.popoverRow && this.$refs.popoverRow[0]) {
        this.popoverWidth =
          this.$refs.popoverRow[0].$el.getBoundingClientRect().width
      }
    })
  }
}
</script>

<style lang="less" scoped>
.commonConditionFilterBox {
  margin: 10px 0 !important;
  margin-bottom: 0px !important;
  margin-top: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  font-size: 14px;
  color: #272727;
  margin: 10px 10px 0;
  padding: 10px;
  letter-spacing: 0.55px;

  .commonConditionFilterBox__header {
    display: flex;
    justify-content: flex-start;
    justify-items: center;
    font-weight: bold;
    .level {
      width: 65px;
      text-align: center;
    }
    .relation {
      width: 165px;
      text-align: center;
    }
    .inset-title {
      display: flex;
      width: 100%;

      .select-filed-value,
      .select-filed-type,
      .select-filed-logic,
      .input-field-content,
      .operator {
        margin-right: 20px;
        text-align: center;
        width: 20%;
      }
    }
  }
  .commonConditionFilterBox__FilterContent {
    height: 470px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .commonConditionFilterBox__FilterItem {
    margin-top: 10px;
  }
  // 删除一行按钮
  .commonConditionFilterBox__FilterItem__body__right {
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    .commonConditionFilterBox__FilterItem__body__right-del {
      color: #b40000 !important;
      position: absolute;
      top: 50%;
      right: -10px;
      margin-top: -12px;
      cursor: pointer;
      &:hover {
        color: #e70000 !important;
      }
    }
  }

  .commonConditionFilterBox__FilterItem__Detail {
    margin: 0 0 0 100px;
    padding: 0;
  }

  .ConditionFilterItem-content-inputRange {
    .ConditionFilterItem-content-to {
      width: 8%;
      text-align: center;
      display: inline-block;
      overflow: hidden;
      vertical-align: text-bottom;
    }
    .ConditionFilterItem-content-input {
      display: inline-block;
      width: 46%;
    }
  }
}
// 条件查询图标按钮
.commonConditionFilterBox {
  // 全局定义主体dialog无边距，此处单独添加边距
  .el-dialog__body {
    padding: 20px;
  }

  // 输入容器
  .error-tips {
    position: relative;
    .error-tip-text {
      top: 30px;
      left: 25px;
      position: absolute;
      font-size: 12px;
      color: #f56c6c;
      &.left0 {
        left: 0;
      }
    }
  }

  .el-button.icon-button {
    padding: 0 5px;
    height: 22px;
    font-size: 22px;
    color: #4b5766;
    &.is-disabled {
      .el-icon,
      .iconfont {
        color: #ccc;
        font-size: 22px;
      }
      &:hover,
      &:active {
        .el-icon,
        .iconfont {
          color: #ccc;
        }
      }
    }
    &:hover,
    &:active {
      color: #409eff;
    }
  }

  .error-tips {
    position: relative;
  }
  .error-tips .el-select .el-input.is-focus .el-input__inner,
  .error-tips .el-input__inner {
    border-color: #f56c6c;
  }
  // 控制下拉框宽度
  .commonConditionFilterBox__FilterItem__body {
    .el-select {
      width: 100%;
    }
  }
  .ConditionFilterItem-one,
  .ConditionFilterItem-type,
  .ConditionFilterItem-logic,
  .ConditionFilterItem-content {
    padding: 0 5px;
  }
  .ConditionFilterItem-one {
    position: relative;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 0;
    width: 100%;
  }
  .ConditionFilterItem-type {
    /*width: 200px;*/
    width: 20%;
    color: #2b6cb9;
    font-size: 14px;
    text-align: center;
  }
  .ConditionFilterItem-logic {
    /*padding-right: 60px;*/
    width: 20%;
  }
  .ConditionFilterItem-content {
    width: 100%;
    .ConditionFilterItem-content-date {
      // width: 46%;
      display: inline-block;
      width: 100%;
      height: 32px;
      cursor: pointer;
      .el-input {
        .el-input__suffix {
          border-left: 1px solid var(--font-metal);
          color: var(--primary-pure);
        }
        .el-input__inner {
          width: 100% !important;
        }
      }
    }
    .ConditionFilterItem-content-to {
      width: 8%;
      text-align: center;
      display: inline-block;
      overflow: hidden;
      vertical-align: text-bottom;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
    .el-input--prefix .el-input__inner {
      padding-left: 10px;
    }
    .el-input__prefix {
      left: initial;
      right: 5px;
      padding: 0;
      color: #000;
      font-size: 16px;
    }
    .el-date-editor .el-icon-circle-close {
      display: none;
    }
    .el-select-dropdown__item {
      height: 24px;
      line-height: 24px;
    }
  }
  .error-tips {
    position: relative;
  }
  .draw-circle-wrap {
    display: inline-block;
    position: relative;
    width: 22px;
    height: 32px;
    .draw-circle {
      position: absolute;
      top: 8px;
      left: -8px;
      padding: 0 4px;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      color: #272727;
      border-radius: 50%;
      background: #d4d6dd;
      z-index: 100;
    }
    .drawLine {
      position: absolute;
      top: 16px;
      right: 0;
      left: 0;
      height: 1px;
      background: #d4d6dd;
    }
    .drawLine-left {
      position: absolute;
      top: -34px;
      right: 0;
      left: 0;
      width: 1px;
      height: 50px;
      background: #d4d6dd;
    }
  }
  .commonConditionFilterBox__FilterItem__body__left-line {
    position: absolute;
    top: 16px;
    right: 0;
    left: 0;
    height: 1px;
    background-color: #d4d6dd;
    cursor: pointer;
  }
  // 文件夹图标
  .commonConditionFilterBox__FilterItem__body__left-fileclose {
    position: absolute;
    top: 6px;
    left: 0;
    width: 28px;
    height: 22px;
    cursor: pointer;
  }
  // 且 或 图片
  .commonConditionFilterBox__FilterItem__body__left-andOr {
    position: absolute;
    top: 2px;
    left: 42px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .commonConditionFilterBox__FilterItem__body {
    position: relative;
    margin-left: 54px;
    background: #f4f5fa;
    border: 2px dotted #d4d6dd;
    &:hover {
      background: #f4f5fa;
      border: 2px dotted #2b6cb9;
    }
  }
  .commonConditionFilterBox__FilterItem__body__left {
    position: absolute;
    top: 14px;
    left: 4px;
    width: 100px;
    height: 35px;
  }
  .commonConditionFilterBox__FilterItem__DetailItem {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 30px;
    padding-right: 50px;
    // padding-top: 17px;
    &:first-child {
      padding-top: 14px;
    }
    // 条件筛选参数校验文字
    .children-item-input {
      position: relative;
      margin-bottom: 14px;
      .condition-filter-error {
        position: absolute;
        top: 28px;
        left: 0;
        padding: 2px 0 0 5px;
        font-size: 12px;
        color: #f56c6c;
        white-space: nowrap;
      }
    }
    /* 编辑；问号；删除；添加；   */
    .item-icon-btn {
      display: flex;
      width: 120px;
      min-width: 12px;
      span {
        display: inline-block;
        width: 27%;
        height: 20px;
        cursor: pointer;
      }
    }
  }

  .commonConditionFilterBox__FilterItem__Create {
    position: relative;
    /* margin-right: 85px; */
    min-height: 20px;
    .commonConditionFilterBox__FilterItem__Create-level {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 41px;
      text-align: center;
      .commonConditionFilterBox__FilterItem__Create-num {
        font-weight: bold;
      }
      .commonConditionFilterBox__FilterItem__Create-line {
        position: absolute;
        top: 20px;
        bottom: 0;
        left: 20px;
        width: 2px;
        background-color: #d4d6dd;
      }
      .commonConditionFilterBox__FilterItem__Create-img {
        position: absolute;
        top: 50%;
        left: 5px;
        margin-top: -15px;
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="less">
.expressRow {
  border-radius: 4px;
  border: 1px solid #d5d5d5 !important;
  display: flex;
  padding: 0 5px;
  background-color: #fff;
  position: relative;
  height: 30px;
  line-height: 30px;
  &:hover {
    border-color: rgba(46, 126, 255, 0.36) !important;
  }
  &:focus {
    border-color: #409eff !important;
  }
}
.noBorder .el-input__inner {
  border: none !important;
  height: 28px !important;
  // border-radius: 4px 0 0 4px !important;
}
.noBorderCol + .noBorderCol {
  .noBorder .el-input__inner {
    border-radius: 0px 4px 4px 0 !important;
  }
}
.expressDropDown {
  max-width: 100%;
  background-color: #fff;
  line-height: 32px;
  display: flex;
  .el-tag {
    margin-top: 4px;
    margin-left: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }
}
.dropDownPop {
  width: 100%;
  background: #fff;
  border-radius: 3px;
  > span {
    white-space: nowrap;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 2px 5px;
    box-sizing: border-box;
    cursor: pointer;
    line-height: 22px;
    &:hover {
      background-color: #f1f8fd !important;
      color: #475669 !important;
    }
  }
}
.dropDownPoper {
  margin-top: 5px;
  max-height: 200px;
  overflow-y: auto;
  &.el-popper[x-placement^="bottom"] {
    margin-top: 5px;
    box-sizing: border-box;
    .popper__arrow {
      display: none;
    }
    .dropDownItem_name {
      display: block;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .dropDownItem_delete {
      min-width: 15px;
      margin-left: 11px;
      float: right;
      line-height: 25px;
    }
  }
}
</style>
