import{dN as e,e8 as t,d0 as a,c_ as n,cW as s,e9 as r,cV as i,ea as o,cX as c,cU as u,cT as d,dT as l,d7 as m,d8 as p,d9 as h,cQ as y,cJ as w,cK as g,da as f,dh as x,cL as P,dg as I,d6 as E,df as b}from"./lucifer.v8.js";import"./DHCiEWJt.js";const v="INVALID_PAYMENT_CONFIG",A="INVALID_RECIPIENT",S="INVALID_ASSET",k="INVALID_AMOUNT",C="UNKNOWN_ERROR",N="UNABLE_TO_INITIATE_PAYMENT",T="INVALID_CHAIN_NAMESPACE",U="GENERIC_PAYMENT_ERROR",D="UNABLE_TO_GET_EXCHANGES",_="ASSET_NOT_SUPPORTED",R="UNABLE_TO_GET_PAY_URL",$="UNABLE_TO_GET_BUY_STATUS",L={[v]:"Invalid payment configuration",[A]:"Invalid recipient address",[S]:"Invalid asset specified",[k]:"Invalid payment amount",[C]:"Unknown payment error occurred",[N]:"Unable to initiate payment",[T]:"Invalid chain namespace",[U]:"Unable to process payment",[D]:"Unable to get exchanges",[_]:"Asset not supported by the selected exchange",[R]:"Unable to get payment URL",[$]:"Unable to get buy status"};class M extends Error{get message(){return L[this.code]}constructor(e,t){super(L[e]),this.name="AppKitPayError",this.code=e,this.details=t,Error.captureStackTrace&&Error.captureStackTrace(this,M)}}class O extends Error{}async function W(t,a){const n=`https://rpc.walletconnect.org/v1/json-rpc?projectId=${e.getSnapshot().projectId}`,{sdkType:s,sdkVersion:r,projectId:i}=e.getSnapshot(),o={jsonrpc:"2.0",id:1,method:t,params:{...a||{},st:s,sv:r,projectId:i}},c=await fetch(n,{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}}),u=await c.json();if(u.error)throw new O(u.error.message);return u}async function F(e){return(await W("reown_getExchanges",e)).result}const Y=["eip155","solana"],j={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"},solana:{native:{assetNamespace:"slip44",assetReference:"501"},defaultTokenNamespace:"token"}};function G(e,a){const{chainNamespace:n,chainId:s}=t.parseCaipNetworkId(e),r=j[n];if(!r)throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${n}`);let i=r.native.assetNamespace,o=r.native.assetReference;"native"!==a&&(i=r.defaultTokenNamespace,o=a);return`${`${n}:${s}`}/${i}:${o}`}const H="unknown",K=h({paymentAsset:{network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},recipient:"0x0",amount:0,isConfigured:!1,error:null,isPaymentInProgress:!1,exchanges:[],isLoading:!1,openInNewTab:!0,redirectUrl:void 0,payWithExchange:void 0,currentPayment:void 0,analyticsSet:!1,paymentId:void 0}),B={state:K,subscribe:e=>p(K,()=>e(K)),subscribeKey:(e,t)=>m(K,e,t),async handleOpenPay(e){this.resetState(),this.setPaymentConfig(e),this.subscribeEvents(),this.initializeAnalytics(),K.isConfigured=!0,c.sendEvent({type:"track",event:"PAY_MODAL_OPEN",properties:{exchanges:K.exchanges,configuration:{network:K.paymentAsset.network,asset:K.paymentAsset.asset,recipient:K.recipient,amount:K.amount}}}),await l.open({view:"Pay"})},resetState(){K.paymentAsset={network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},K.recipient="0x0",K.amount=0,K.isConfigured=!1,K.error=null,K.isPaymentInProgress=!1,K.isLoading=!1,K.currentPayment=void 0},setPaymentConfig(e){if(!e.paymentAsset)throw new M(v);try{K.paymentAsset=e.paymentAsset,K.recipient=e.recipient,K.amount=e.amount,K.openInNewTab=e.openInNewTab??!0,K.redirectUrl=e.redirectUrl,K.payWithExchange=e.payWithExchange,K.error=null}catch(t){throw new M(v,t.message)}},getPaymentAsset:()=>K.paymentAsset,getExchanges:()=>K.exchanges,async fetchExchanges(){try{K.isLoading=!0;const e=await F({page:0,asset:G(K.paymentAsset.network,K.paymentAsset.asset),amount:K.amount.toString()});K.exchanges=e.exchanges.slice(0,2)}catch(e){throw u.showError(L.UNABLE_TO_GET_EXCHANGES),new M(D)}finally{K.isLoading=!1}},async getAvailableExchanges(e){try{const t=e?.asset&&e?.network?G(e.network,e.asset):void 0;return await F({page:e?.page??0,asset:t,amount:e?.amount?.toString()})}catch(t){throw new M(D)}},async getPayUrl(e,t,a=!1){try{const n=Number(t.amount),s=await async function(e){return(await W("reown_getExchangePayUrl",e)).result}({exchangeId:e,asset:G(t.network,t.asset),amount:n.toString(),recipient:`${t.network}:${t.recipient}`});return c.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{source:"pay",exchange:{id:e},configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:n},currentPayment:{type:"exchange",exchangeId:e},headless:a}}),a&&(this.initiatePayment(),c.sendEvent({type:"track",event:"PAY_INITIATED",properties:{source:"pay",paymentId:K.paymentId||H,configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:n},currentPayment:{type:"exchange",exchangeId:e}}})),s}catch(n){if(n instanceof Error&&n.message.includes("is not supported"))throw new M(_);throw new Error(n.message)}},async openPayUrl(e,t,n=!1){try{const s=await this.getPayUrl(e.exchangeId,t,n);if(!s)throw new M(R);const r=e.openInNewTab??!0?"_blank":"_self";return a.openHref(s.url,r),s}catch(s){throw K.error=s instanceof M?s.message:L.GENERIC_PAYMENT_ERROR,new M(R)}},subscribeEvents(){K.isConfigured||(i.subscribeKey("connections",e=>{e.size>0&&this.handlePayment()}),n.subscribeChainProp("accountState",e=>{const t=i.hasAnyConnection(s.CONNECTOR_ID.WALLET_CONNECT);e?.caipAddress&&(t?setTimeout(()=>{this.handlePayment()},100):this.handlePayment())}))},async handlePayment(){K.currentPayment={type:"wallet",status:"IN_PROGRESS"};const e=n.getActiveCaipAddress();if(!e)return;const{chainId:c,address:d}=t.parseCaipAddress(e),m=n.state.activeChain;if(!d||!c||!m)return;if(!r.getProvider(m))return;const p=n.state.activeCaipNetwork;if(p&&!K.isPaymentInProgress)try{this.initiatePayment();const e=n.getAllRequestedCaipNetworks(),t=n.getAllApprovedCaipNetworkIds();switch(await async function(e){const{paymentAssetNetwork:t,activeCaipNetwork:s,approvedCaipNetworkIds:r,requestedCaipNetworks:i}=e,o=a.sortRequestedNetworks(r,i).find(e=>e.caipNetworkId===t);if(!o)throw new M(v);if(o.caipNetworkId===s.caipNetworkId)return;const c=n.getNetworkProp("supportsAllNetworks",o.chainNamespace);if(!r?.includes(o.caipNetworkId)&&!c)throw new M(v);try{await n.switchActiveNetwork(o)}catch(u){throw new M(U,u)}}({paymentAssetNetwork:K.paymentAsset.network,activeCaipNetwork:p,approvedCaipNetworkIds:t,requestedCaipNetworks:e}),await l.open({view:"PayLoading"}),m){case s.CHAIN.EVM:"native"===K.paymentAsset.asset&&(K.currentPayment.result=await async function(e,t,a){if(t!==s.CHAIN.EVM)throw new M(T);if(!a.fromAddress)throw new M(v,"fromAddress is required for native EVM payments.");const n="string"==typeof a.amount?parseFloat(a.amount):a.amount;if(isNaN(n))throw new M(v);const r=e.metadata?.decimals??18,o=i.parseUnits(n.toString(),r);if("bigint"!=typeof o)throw new M(U);return await i.sendTransaction({chainNamespace:t,to:a.recipient,address:a.fromAddress,value:o,data:"0x"})??void 0}(K.paymentAsset,m,{recipient:K.recipient,amount:K.amount,fromAddress:d})),K.paymentAsset.asset.startsWith("0x")&&(K.currentPayment.result=await async function(e,t){if(!t.fromAddress)throw new M(v,"fromAddress is required for ERC20 EVM payments.");const a=e.asset,n=t.recipient,r=Number(e.metadata.decimals),c=i.parseUnits(t.amount.toString(),r);if(void 0===c)throw new M(U);return await i.writeContract({fromAddress:t.fromAddress,tokenAddress:a,args:[n,c],method:"transfer",abi:o.getERC20Abi(a),chainNamespace:s.CHAIN.EVM})??void 0}(K.paymentAsset,{recipient:K.recipient,amount:K.amount,fromAddress:d})),K.currentPayment.status="SUCCESS";break;case s.CHAIN.SOLANA:K.currentPayment.result=await async function(e,t){if(e!==s.CHAIN.SOLANA)throw new M(T);if(!t.fromAddress)throw new M(v,"fromAddress is required for Solana payments.");const a="string"==typeof t.amount?parseFloat(t.amount):t.amount;if(isNaN(a)||a<=0)throw new M(v,"Invalid payment amount.");try{if(!r.getProvider(e))throw new M(U,"No Solana provider available.");const n=await i.sendTransaction({chainNamespace:s.CHAIN.SOLANA,to:t.recipient,value:a,tokenMint:t.tokenMint});if(!n)throw new M(U,"Transaction failed.");return n}catch(n){if(n instanceof M)throw n;throw new M(U,`Solana payment failed: ${n}`)}}(m,{recipient:K.recipient,amount:K.amount,fromAddress:d,tokenMint:"native"===K.paymentAsset.asset?void 0:K.paymentAsset.asset}),K.currentPayment.status="SUCCESS";break;default:throw new M(T)}}catch(h){K.error=h instanceof M?h.message:L.GENERIC_PAYMENT_ERROR,K.currentPayment.status="FAILED",u.showError(K.error)}finally{K.isPaymentInProgress=!1}},getExchangeById:e=>K.exchanges.find(t=>t.id===e),validatePayConfig(e){const{paymentAsset:t,recipient:a,amount:n}=e;if(!t)throw new M(v);if(!a)throw new M(A);if(!t.asset)throw new M(S);if(null==n||n<=0)throw new M(k)},handlePayWithWallet(){const e=n.getActiveCaipAddress();if(!e)return void d.push("Connect");const{chainId:a,address:s}=t.parseCaipAddress(e),r=n.state.activeChain;s&&a&&r?this.handlePayment():d.push("Connect")},async handlePayWithExchange(e){try{K.currentPayment={type:"exchange",exchangeId:e};const{network:t,asset:a}=K.paymentAsset,n={network:t,asset:a,amount:K.amount,recipient:K.recipient},s=await this.getPayUrl(e,n);if(!s)throw new M(N);return K.currentPayment.sessionId=s.sessionId,K.currentPayment.status="IN_PROGRESS",K.currentPayment.exchangeId=e,this.initiatePayment(),{url:s.url,openInNewTab:K.openInNewTab}}catch(t){return K.error=t instanceof M?t.message:L.GENERIC_PAYMENT_ERROR,K.isPaymentInProgress=!1,u.showError(K.error),null}},async getBuyStatus(e,t){try{const n=await async function(e){return(await W("reown_getExchangeBuyStatus",e)).result}({sessionId:t,exchangeId:e});return"SUCCESS"!==n.status&&"FAILED"!==n.status||c.sendEvent({type:"track",event:"SUCCESS"===n.status?"PAY_SUCCESS":"PAY_ERROR",properties:{message:"FAILED"===n.status?a.parseError(K.error):void 0,source:"pay",paymentId:K.paymentId||H,configuration:{network:K.paymentAsset.network,asset:K.paymentAsset.asset,recipient:K.recipient,amount:K.amount},currentPayment:{type:"exchange",exchangeId:K.currentPayment?.exchangeId,sessionId:K.currentPayment?.sessionId,result:n.txHash}}}),n}catch(n){throw new M($)}},async updateBuyStatus(e,t){try{const a=await this.getBuyStatus(e,t);K.currentPayment&&(K.currentPayment.status=a.status,K.currentPayment.result=a.txHash),"SUCCESS"!==a.status&&"FAILED"!==a.status||(K.isPaymentInProgress=!1)}catch(a){throw new M($)}},initiatePayment(){K.isPaymentInProgress=!0,K.paymentId=crypto.randomUUID()},initializeAnalytics(){K.analyticsSet||(K.analyticsSet=!0,this.subscribeKey("isPaymentInProgress",e=>{if(K.currentPayment?.status&&"UNKNOWN"!==K.currentPayment.status){const e={IN_PROGRESS:"PAY_INITIATED",SUCCESS:"PAY_SUCCESS",FAILED:"PAY_ERROR"}[K.currentPayment.status];c.sendEvent({type:"track",event:e,properties:{message:"FAILED"===K.currentPayment.status?a.parseError(K.error):void 0,source:"pay",paymentId:K.paymentId||H,configuration:{network:K.paymentAsset.network,asset:K.paymentAsset.asset,recipient:K.recipient,amount:K.amount},currentPayment:{type:K.currentPayment.type,exchangeId:K.currentPayment.exchangeId,sessionId:K.currentPayment.sessionId,result:K.currentPayment.result}}})}}))}},V=y`
  wui-separator {
    margin: var(--apkt-spacing-3) calc(var(--apkt-spacing-3) * -1) var(--apkt-spacing-2)
      calc(var(--apkt-spacing-3) * -1);
    width: calc(100% + var(--apkt-spacing-3) * 2);
  }

  .token-display {
    padding: var(--apkt-spacing-3) var(--apkt-spacing-3);
    border-radius: var(--apkt-borderRadius-5);
    background-color: var(--apkt-tokens-theme-backgroundPrimary);
    margin-top: var(--apkt-spacing-3);
    margin-bottom: var(--apkt-spacing-3);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--apkt-spacing-2);
  }
`;var q=function(e,t,a,n){var s,r=arguments.length,i=r<3?t:n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r<3?s(i):r>3?s(t,a,i):s(t,a))||i);return r>3&&i&&Object.defineProperty(t,a,i),i};let z=class extends w{constructor(){super(),this.unsubscribe=[],this.amount="",this.tokenSymbol="",this.networkName="",this.exchanges=B.state.exchanges,this.isLoading=B.state.isLoading,this.loadingExchangeId=null,this.connectedWalletInfo=n.getAccountData()?.connectedWalletInfo,this.initializePaymentDetails(),this.unsubscribe.push(B.subscribeKey("exchanges",e=>this.exchanges=e)),this.unsubscribe.push(B.subscribeKey("isLoading",e=>this.isLoading=e)),this.unsubscribe.push(n.subscribeChainProp("accountState",e=>{this.connectedWalletInfo=e?.connectedWalletInfo})),B.fetchExchanges()}get isWalletConnected(){const e=n.getAccountData();return"connected"===e?.status}render(){return g`
      <wui-flex flexDirection="column">
        <wui-flex flexDirection="column" .padding=${["0","4","4","4"]} gap="3">
          ${this.renderPaymentHeader()}

          <wui-flex flexDirection="column" gap="3">
            ${this.renderPayWithWallet()} ${this.renderExchangeOptions()}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}initializePaymentDetails(){const e=B.getPaymentAsset();this.networkName=e.network,this.tokenSymbol=e.metadata.symbol,this.amount=B.state.amount.toString()}renderPayWithWallet(){return function(e){const{chainNamespace:a}=t.parseCaipNetworkId(e);return Y.includes(a)}(this.networkName)?g`<wui-flex flexDirection="column" gap="3">
        ${this.isWalletConnected?this.renderConnectedView():this.renderDisconnectedView()}
      </wui-flex>
      <wui-separator text="or"></wui-separator>`:g``}renderPaymentHeader(){let e=this.networkName;if(this.networkName){const t=n.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.networkName);t&&(e=t.name)}return g`
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex alignItems="center" gap="2">
          <wui-text variant="h1-regular" color="primary">${this.amount||"0.0000"}</wui-text>
          <wui-flex class="token-display" alignItems="center" gap="1">
            <wui-text variant="md-medium" color="primary">
              ${this.tokenSymbol||"Unknown Asset"}
            </wui-text>
            ${e?g`
                  <wui-text variant="sm-medium" color="secondary">
                    on ${e}
                  </wui-text>
                `:""}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}renderConnectedView(){const e=this.connectedWalletInfo?.name||"connected wallet";return g`
      <wui-list-item
        @click=${this.onWalletPayment}
        ?chevron=${!0}
        ?fullSize=${!0}
        ?rounded=${!0}
        data-testid="wallet-payment-option"
        imageSrc=${f(this.connectedWalletInfo?.icon)}
      >
        <wui-text variant="lg-regular" color="primary">Pay with ${e}</wui-text>
      </wui-list-item>

      <wui-list-item
        icon="power"
        ?rounded=${!0}
        iconColor="error"
        @click=${this.onDisconnect}
        data-testid="disconnect-button"
        ?chevron=${!1}
      >
        <wui-text variant="lg-regular" color="secondary">Disconnect</wui-text>
      </wui-list-item>
    `}renderDisconnectedView(){return g`<wui-list-item
      variant="icon"
      iconVariant="overlay"
      icon="wallet"
      ?rounded=${!0}
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="lg-regular" color="primary">Pay from wallet</wui-text>
    </wui-list-item>`}renderExchangeOptions(){return this.isLoading?g`<wui-flex justifyContent="center" alignItems="center">
        <wui-spinner size="md"></wui-spinner>
      </wui-flex>`:0===this.exchanges.length?g`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="md-medium" color="primary">No exchanges available</wui-text>
      </wui-flex>`:this.exchanges.map(e=>g`
        <wui-list-item
          @click=${()=>this.onExchangePayment(e.id)}
          data-testid="exchange-option-${e.id}"
          ?chevron=${!0}
          ?disabled=${null!==this.loadingExchangeId}
          ?loading=${this.loadingExchangeId===e.id}
          imageSrc=${f(e.imageUrl)}
        >
          <wui-flex alignItems="center" gap="3">
            <wui-text flexGrow="1" variant="md-medium" color="primary"
              >Pay with ${e.name} <wui-spinner size="sm" color="secondary"></wui-spinner
            ></wui-text>
          </wui-flex>
        </wui-list-item>
      `)}onWalletPayment(){B.handlePayWithWallet()}async onExchangePayment(e){try{this.loadingExchangeId=e;const t=await B.handlePayWithExchange(e);t&&(await l.open({view:"PayLoading"}),a.openHref(t.url,t.openInNewTab?"_blank":"_self"))}catch(t){console.error("Failed to pay with exchange",t),u.showError("Failed to pay with exchange")}finally{this.loadingExchangeId=null}}async onDisconnect(e){e.stopPropagation();try{await i.disconnect()}catch{console.error("Failed to disconnect"),u.showError("Failed to disconnect")}}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}};z.styles=V,q([x()],z.prototype,"amount",void 0),q([x()],z.prototype,"tokenSymbol",void 0),q([x()],z.prototype,"networkName",void 0),q([x()],z.prototype,"exchanges",void 0),q([x()],z.prototype,"isLoading",void 0),q([x()],z.prototype,"loadingExchangeId",void 0),q([x()],z.prototype,"connectedWalletInfo",void 0),z=q([P("w3m-pay-view")],z);const J=y`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }
`;var X=function(e,t,a,n){var s,r=arguments.length,i=r<3?t:n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r<3?s(i):r>3?s(t,a,i):s(t,a))||i);return r>3&&i&&Object.defineProperty(t,a,i),i};let Z=class extends w{constructor(){super(),this.loadingMessage="",this.subMessage="",this.paymentState="in-progress",this.paymentState=B.state.isPaymentInProgress?"in-progress":"completed",this.updateMessages(),this.setupSubscription(),this.setupExchangeSubscription()}disconnectedCallback(){clearInterval(this.exchangeSubscription)}render(){return g`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["7","5","5","5"]}
        gap="9"
      >
        <wui-flex justifyContent="center" alignItems="center"> ${this.getStateIcon()} </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <wui-text align="center" variant="lg-medium" color="primary">
            ${this.loadingMessage}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary">
            ${this.subMessage}
          </wui-text>
        </wui-flex>
      </wui-flex>
    `}updateMessages(){switch(this.paymentState){case"completed":this.loadingMessage="Payment completed",this.subMessage="Your transaction has been successfully processed";break;case"error":this.loadingMessage="Payment failed",this.subMessage="There was an error processing your transaction";break;default:"exchange"===B.state.currentPayment?.type?(this.loadingMessage="Payment initiated",this.subMessage="Please complete the payment on the exchange"):(this.loadingMessage="Awaiting payment confirmation",this.subMessage="Please confirm the payment transaction in your wallet")}}getStateIcon(){switch(this.paymentState){case"completed":return this.successTemplate();case"error":return this.errorTemplate();default:return this.loaderTemplate()}}setupExchangeSubscription(){"exchange"===B.state.currentPayment?.type&&(this.exchangeSubscription=setInterval(async()=>{const e=B.state.currentPayment?.exchangeId,t=B.state.currentPayment?.sessionId;e&&t&&(await B.updateBuyStatus(e,t),"SUCCESS"===B.state.currentPayment?.status&&clearInterval(this.exchangeSubscription))},4e3))}setupSubscription(){B.subscribeKey("isPaymentInProgress",e=>{e||"in-progress"!==this.paymentState||(B.state.error||!B.state.currentPayment?.result?this.paymentState="error":this.paymentState="completed",this.updateMessages(),setTimeout(()=>{"disconnected"!==i.state.status&&l.close()},3e3))}),B.subscribeKey("error",e=>{e&&"in-progress"===this.paymentState&&(this.paymentState="error",this.updateMessages())})}loaderTemplate(){const e=I.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4,a=this.getPaymentIcon();return g`
      <wui-flex justifyContent="center" alignItems="center" style="position: relative;">
        ${a?g`<wui-wallet-image size="lg" imageSrc=${a}></wui-wallet-image>`:null}
        <wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>
      </wui-flex>
    `}getPaymentIcon(){const e=B.state.currentPayment;if(e){if("exchange"===e.type){const t=e.exchangeId;if(t){const e=B.getExchangeById(t);return e?.imageUrl}}if("wallet"===e.type){const e=n.getAccountData()?.connectedWalletInfo?.icon;if(e)return e;const t=n.state.activeChain;if(!t)return;const a=E.getConnectorId(t);if(!a)return;const s=E.getConnectorById(a);if(!s)return;return b.getConnectorImage(s)}}}successTemplate(){return g`<wui-icon size="xl" color="success" name="checkmark"></wui-icon>`}errorTemplate(){return g`<wui-icon size="xl" color="error" name="close"></wui-icon>`}};Z.styles=J,X([x()],Z.prototype,"loadingMessage",void 0),X([x()],Z.prototype,"subMessage",void 0),X([x()],Z.prototype,"paymentState",void 0),Z=X([P("w3m-pay-loading-view")],Z);async function Q(e){return B.handleOpenPay(e)}async function ee(e,t=3e5){if(t<=0)throw new M(v,"Timeout must be greater than 0");try{await Q(e)}catch(a){if(a instanceof M)throw a;throw new M(N,a.message)}return new Promise((e,a)=>{let n=!1;const s=setTimeout(()=>{n||(n=!0,u(),a(new M(U,"Payment timeout")))},t);function r(){if(n)return;const t=B.state.currentPayment,a=B.state.error,r=B.state.isPaymentInProgress;return"SUCCESS"===t?.status?(n=!0,u(),clearTimeout(s),void e({success:!0,result:t.result})):"FAILED"===t?.status?(n=!0,u(),clearTimeout(s),void e({success:!1,error:a||"Payment failed"})):void(!a||r||t||(n=!0,u(),clearTimeout(s),e({success:!1,error:a})))}const i=re("currentPayment",r),o=re("error",r),c=re("isPaymentInProgress",r),u=(d=[i,o,c],()=>{d.forEach(e=>{try{e()}catch{}})});var d;r()})}function te(){return B.getExchanges()}function ae(){return B.state.currentPayment?.result}function ne(){return B.state.error}function se(){return B.state.isPaymentInProgress}function re(e,t){return B.subscribeKey(e,t)}const ie={network:"eip155:8453",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},oe={network:"eip155:8453",asset:"0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},ce={network:"eip155:84532",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},ue={network:"eip155:1",asset:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},de={network:"eip155:10",asset:"0x0b2c639c533813f4aa9d7837caf62653d097ff85",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},le={network:"eip155:42161",asset:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},me={network:"eip155:137",asset:"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},pe={network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},he={network:"eip155:1",asset:"0xdAC17F958D2ee523a2206206994597C13D831ec7",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},ye={network:"eip155:10",asset:"0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},we={network:"eip155:42161",asset:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},ge={network:"eip155:137",asset:"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},fe={network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},xe={network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"native",metadata:{name:"Solana",symbol:"SOL",decimals:9}};export{Z as W3mPayLoadingView,z as W3mPayView,le as arbitrumUSDC,we as arbitrumUSDT,ie as baseETH,ce as baseSepoliaETH,oe as baseUSDC,ue as ethereumUSDC,he as ethereumUSDT,te as getExchanges,se as getIsPaymentInProgress,ne as getPayError,ae as getPayResult,Q as openPay,de as optimismUSDC,ye as optimismUSDT,ee as pay,me as polygonUSDC,ge as polygonUSDT,xe as solanaSOL,pe as solanaUSDC,fe as solanaUSDT};
