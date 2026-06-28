import{cQ as e,cJ as t,cK as i,cL as r}from"./lucifer.v8.js";const l=e`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;let o=class extends t{render(){return i`
      <wui-flex flexDirection="column" .padding=${["0","3","3","3"]} gap="3">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};o.styles=l,o=function(e,t,i,r){var l,o=arguments.length,c=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(l=e[n])&&(c=(o<3?l(c):o>3?l(t,i,c):l(t,i))||c);return o>3&&c&&Object.defineProperty(t,i,c),c}([r("w3m-transactions-view")],o);export{o as W3mTransactionsView};
