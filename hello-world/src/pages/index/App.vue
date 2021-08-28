<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import bireportJSON from './bireport.json'
import reportJSON from './report.json'
const bd = bireportJSON.responses[0].hits.hits
const rd = reportJSON.responses[0].hits.hits
const urls = {};
const pages = [];
const uurl = [];
export default {
  name: 'app',
  methods: {
   getUrlsAndPages(data) {
     data.forEach(d=>{
       const {page_id, url} = d._source;
       const url1 = new URL(page_id);
       if(pages[url1.hash] == undefined){
         pages[url1.hash] = 1
       }
       pages[url1.hash] += 1;
       const url2 = new URL(`https:${url}`);
      if(urls[url2.pathname] == undefined){
         urls[url2.pathname] = 1
       }
       urls[url2.pathname] += 1;
       if(!url2.pathname.includes('checkBindWeixinMp')){
         uurl.push(url2.pathname);
       }
      // console.log(url1, url2)
      //  console.log(url2)
     })
   },
  },
  mounted() {
    this.getUrlsAndPages(bd)
    this.getUrlsAndPages(rd)
    const dd = 
["/api/report/exportCenter/excel",
"/api/report/callLogsFromTinet/callRecordMonitoring",
"/api/report/exportCenter/page",
"/api/report/operationLog/queryOperationLogForEs",
"/api/report/operationLog/exportOperationLogForEs",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/bireport/courseCalendar/queryDeductStatistics",
"/api/bireport/biReport/getReportDataUpdateTimeByAlias",
"/api/bireport/courseCalendar/detailListNew",
"/api/bireport/courseCalendar/detailCount",
"/api/report/exportCenter/excel",
"/api/bireport/courseCalendar/statNew",
"/api/bireport/index-task/pageCrIntroduceIndex",
"/api/report/paymentRoll/queryDetailListParam4Bu",
"/api/bireport/sellerRankNew/getGradeRankCount",
"/api/bireport/sellerRankNew/queryCurrentSellerRank",
"/api/bireport/sellerRankNew/queryTeamRank",
"/api/bireport/sellerRankNew/queryPersonSellerRank",
"/api/bireport/sellerRankNew/querySellerGradeRank",
"/api/bireport/crReferralIndex/exportIndexDetails",
"/api/report/paymentRoll/getLastTime4Roll",
"/api/report/paymentRoll/queryDetailListParam4Bu",
"/api/bireport/crStuIntroReport/biCrstuCrIntroduced",
"/api/bireport/crStuIntroReport/exportBiCrstuCrIntroduced",
"/api/bireport/crStuIntroReport/biCrStuIntroduceReport",
"/api/bireport/crStuIntroReport/exportBiCrStuIntroduceReport",
"/api/bireport/crStuIntroReport/exportBiCrIntroduceDetail",
"/api/bireport/crStuIntroReport/biCrIntroduceDetail",
"/api/bireport/ccReport/intro/conversion/download",
"/api/bireport/ccReport/intro/conversion",
"/api/report/paymentRoll/queryDetailListParam4Bu",
"/api/bireport/biReport/exportBiCrstuCrIntroduced?",
"/api/bireport/biReport/biCrstuCrIntroduced",
"/api/report/paymentRoll/queryDetailListParam4Bu",
"/api/bireport/biReport/exportBiCrstuCrIntroduced?",
"/api/bireport/biReport/exportBiCrstuCrIntroduced",
"/api/bireport/biReport/biCrstuCrIntroduced",
"/api/report/paymentRoll/queryDetailListParam4Bu",
"/api/bireport/biReport/exportBiRefAcPaidStudent?",
"/api/bireport/biReport/biReferStuAct",
"/api/bireport/biReport/exportBiReferStuScreenshot?",
"/api/bireport/biReport/biReferStuScreenshot",
"/api/bireport/biReport/exportBiRefAcPaidStudent?",
"/api/bireport/biReport/biRefAcPaidStudentV2",
"/api/bireport/crRenewalReport/exportCrRenewalReport",
"/api/report/paymentRoll/queryDetailListParam4Bu",
"/api/bireport/dashboard/refDashboardRank",
"/api/bireport/dashboard/refDashboard",
"/api/bireport/youkeReport/ukeSalePerformanceOrder",
"/api/bireport/youkeReport/exportCCAchievement",
"/api/report/exportCenter/exportImages",
"/api/report/exportCenter/exportImages",
"/api/report/exportCenter/exportImages",
"/api/report/exportCenter/exportImages",
"/api/report/exportCenter/exportImages",
"/api/report/exportCenter/exportImages",
"/api/report/paymentRoll/cancelErrorPaymentRoll",
"/api/report/paymentRoll/queryPaymentSummaryList",
"/api/report/paymentRoll/getCheckSubPaymentList",
"/api/report/exportCenter/excel",
"/api/report/paymentRoll/checkPaymentRoll",
"/api/report/paymentRoll/cancelCheckPaymentRoll",
"/api/report/paymentRoll/cancelErrorPaymentRoll",
"/api/report/exportCenter/excel",
"/api/report/paymentRoll/checkPaymentRoll",
"/api/report/paymentRoll/cancelCheckPaymentRoll",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/bireport/biReport/tmkReportExport",
"/api/bireport/biReport/tmkReportCCExport",
"/api/bireport/biReport/tmkCCPersonReportExport",
"/api/bireport/biReport/checkBindWeixinMp",
"/api/bireport/biReport/imageUpload",
"/api/bireport/biReport/imageUpload",
"/api/report/exportCenter/excel",
"/api/bireport/biReport/exportSaleArrangeLessonReport",
"/api/bireport/ccPaymentPerform/saleCcPerformance",
"/api/bireport/ccPaymentPerform/exportSaleCcPerformance",
"/api/bireport/todoStatistic/exportCrUseClassHourReport",
"/api/bireport/childCr/kpi/download",
"/api/bireport/todoStatistic/getCrKpiCondition",
"/api/bireport/todoStatistic/exportCrKpiReport",
"/api/report/exportCenter/excel",
"/api/report/paymentRoll/getLastTime4Roll",
"/api/bireport/async/getAnnouncement",
"/api/report/exportCenter/excel",
"/api/report/paymentRoll/getLastTime4Roll",
"/api/bireport/async/getAnnouncement",
"/api/report/paymentRoll/exportPaymentRollList",
"/api/report/paymentRoll/getLastTime4Roll",
"/api/bireport/async/getAnnouncement",
"/api/report/retrieve/getRetrieveStatics",
"/api/report/retrieve/getRetrieveReportList",
"/api/report/retrieve/allGroupSellers",
"/api/report/retrieve/getRetrieveReportDetail",
"/api/report/retrieve/exportRetrieveReportList",
"/api/bireport/dashboard/ccManageCallLes",
"/api/bireport/dashboard/ccManageCallLes",
"/api/bireport/dashboard/ccManageOrderRate",
"/api/bireport/dashboard/ccManagePerformance",
"/api/bireport/dashboard/sale_manage_excellence_rate",
"/api/bireport/dashboard/sale_manage_section",
"/api/report/ccHome/todayData",
"/api/report/ccHome/ccRoll",
"/api/report/ccHome/ccWork",
"/api/bireport/sellerDashboard/exportSellerBoardIndex",
"/api/report/ccHome/todayData",
"/api/report/ccHome/ccRoll",
"/api/report/ccHome/ccWork",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/report/exportCenter/excel",
"/api/bireport/biReport/checkBindWeixinMp",
"/api/bireport/biReport/checkBindWeixinMp",
"/api/bireport/biReport/imageUpload",
"/api/bireport/biReport/imageUpload",
"/api/bireport/biReport/checkBindWeixinMp",
"/api/bireport/topSeller/isTopSeller",
"/api/bireport/topSeller/getTopCC",
"/api/report/student/getStudentTag",]

    console.log(urls, Array.from(new Set(dd.concat(uurl))));
  },
  created() {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
