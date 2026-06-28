import{c_ as e,cV as t,dN as i,cX as a,dT as n,cT as r,cU as o,d0 as s,cL as l,cF as c,cJ as d,d6 as h,cK as u,dh as p,cQ as m,cM as f,cO as w,dU as E,cW as v}from"./lucifer.v8.js";import{W as g}from"./Ic4LUR6G.js";let y=class extends g{constructor(){super(...arguments),this.onOtpSubmit=async l=>{try{if(this.authConnector){const s=e.state.activeChain,c=t.getConnections(s),d=i.state.remoteFeatures?.multiWallet,h=c.length>0;if(await this.authConnector.provider.connectOtp({otp:l}),a.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),!s)throw new Error("Active chain is not set on ChainController");if(await t.connectExternal(this.authConnector,s),i.state.remoteFeatures?.emailCapture)return;if(i.state.siwx)return void n.close();if(h&&d)return r.replace("ProfileWallets"),void o.showSuccess("New Wallet Added");n.close()}}catch(c){throw a.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:s.parseError(c)}}),c}},this.onOtpResend=async e=>{this.authConnector&&(await this.authConnector.provider.connectEmail({email:e}),a.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}))}}};y=function(e,t,i,a){var n,r=arguments.length,o=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}([l("w3m-email-verify-otp-view")],y);const b=c`
  wui-icon-box {
    height: ${({spacing:e})=>e[16]};
    width: ${({spacing:e})=>e[16]};
  }
`;var C=function(e,t,i,a){var n,r=arguments.length,o=r<3?t:a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let I=class extends d{constructor(){super(),this.email=r.state.data?.email,this.authConnector=h.getAuthConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw new Error("w3m-email-verify-device-view: No email provided");if(!this.authConnector)throw new Error("w3m-email-verify-device-view: No auth connector provided");return u`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["6","3","6","3"]}
        gap="4"
      >
        <wui-icon-box size="xl" color="accent-primary" icon="sealCheck"></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="3">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="md-regular" color="primary">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="md-regular" color="primary"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="sm-regular" color="secondary" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="2">
            <wui-text variant="sm-regular" color="primary" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}async listenForDeviceApproval(){if(this.authConnector)try{await this.authConnector.provider.connectDevice(),a.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),a.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),r.replace("EmailVerifyOtp",{email:this.email})}catch(e){r.goBack()}}async onResendCode(){try{if(!this.loading){if(!this.authConnector||!this.email)throw new Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await this.authConnector.provider.connectEmail({email:this.email}),this.listenForDeviceApproval(),o.showSuccess("Code email resent")}}catch(e){o.showError(e)}finally{this.loading=!1}}};I.styles=b,C([p()],I.prototype,"loading",void 0),I=C([l("w3m-email-verify-device-view")],I);const O=m`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;var A=function(e,t,i,a){var n,r=arguments.length,o=r<3?t:a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let x=class extends d{constructor(){super(...arguments),this.formRef=f(),this.initialEmail=r.state.data?.email??"",this.redirectView=r.state.data?.redirectView,this.email="",this.loading=!1}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{"Enter"===e.key&&this.onSubmitEmail(e)})}render(){return u`
      <wui-flex flexDirection="column" padding="4" gap="4">
        <form ${w(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `}onEmailInputChange(e){this.email=e.detail}async onSubmitEmail(e){try{if(this.loading)return;this.loading=!0,e.preventDefault();const t=h.getAuthConnector();if(!t)throw new Error("w3m-update-email-wallet: Auth connector not found");const i=await t.provider.updateEmail({email:this.email});a.sendEvent({type:"track",event:"EMAIL_EDIT"}),"VERIFY_SECONDARY_OTP"===i.action?r.push("UpdateEmailSecondaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView}):r.push("UpdateEmailPrimaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView})}catch(t){o.showError(t),this.loading=!1}}buttonsTemplate(){const e=!this.loading&&this.email.length>3&&this.email!==this.initialEmail;return this.redirectView?u`
      <wui-flex gap="3">
        <wui-button size="md" variant="neutral" fullWidth @click=${r.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="accent-primary"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `:u`
        <wui-button
          size="md"
          variant="accent-primary"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `}};x.styles=O,A([p()],x.prototype,"email",void 0),A([p()],x.prototype,"loading",void 0),x=A([l("w3m-update-email-wallet-view")],x);let R=class extends g{constructor(){super(),this.email=r.state.data?.email,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailPrimaryOtp({otp:e}),a.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),r.replace("UpdateEmailSecondaryOtp",r.state.data))}catch(t){throw a.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:s.parseError(t)}}),t}},this.onStartOver=()=>{r.replace("UpdateEmailWallet",r.state.data)}}};R=function(e,t,i,a){var n,r=arguments.length,o=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}([l("w3m-update-email-primary-otp-view")],R);let _=class extends g{constructor(){super(),this.email=r.state.data?.newEmail,this.redirectView=r.state.data?.redirectView,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailSecondaryOtp({otp:e}),a.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),this.redirectView&&r.reset(this.redirectView))}catch(t){throw a.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:s.parseError(t)}}),t}},this.onStartOver=()=>{r.replace("UpdateEmailWallet",r.state.data)}}};_=function(e,t,i,a){var n,r=arguments.length,o=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}([l("w3m-update-email-secondary-otp-view")],_);var S=function(e,t,i,a){var n,r=arguments.length,o=r<3?t:a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let D=class extends d{constructor(){super(),this.authConnector=h.getAuthConnector(),this.isEmailEnabled=i.state.remoteFeatures?.email,this.isAuthEnabled=this.checkIfAuthEnabled(h.state.connectors),this.connectors=h.state.connectors,h.subscribeKey("connectors",e=>{this.connectors=e,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)})}render(){if(!this.isEmailEnabled)throw new Error("w3m-email-login-view: Email is not enabled");if(!this.isAuthEnabled)throw new Error("w3m-email-login-view: No auth connector provided");return u`<wui-flex flexDirection="column" .padding=${["1","3","3","3"]} gap="4">
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `}checkIfAuthEnabled(e){const t=e.filter(e=>e.type===E.CONNECTOR_TYPE_AUTH).map(e=>e.chain);return v.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(e=>t.includes(e))}};S([p()],D.prototype,"connectors",void 0),D=S([l("w3m-email-login-view")],D);export{D as W3mEmailLoginView,g as W3mEmailOtpWidget,I as W3mEmailVerifyDeviceView,y as W3mEmailVerifyOtpView,R as W3mUpdateEmailPrimaryOtpView,_ as W3mUpdateEmailSecondaryOtpView,x as W3mUpdateEmailWalletView};
