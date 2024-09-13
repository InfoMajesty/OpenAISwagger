!function(){function e(t){let s="";return t.forEach((t=>{t.content?s+=" "+e(t.content):t.text&&(s+=t.text+" ")})),s.trim()}metadata={systemName:"JSSP-JIRA",displayName:"JSSP-JIRA",description:"JIRA Service Broker",configuration:{ServiceURL:{displayName:"JIRA Service URL",type:"string",value:"https://quogent.atlassian.net/rest/api/3/",required:!0},api_key:{displayName:"API Key",type:"string",value:"",required:!0}}},ondescribe=async function({configuration:e}){postSchema({objects:{Issue:{displayName:"Issue",description:"Issues and Incidents",properties:{id:{displayName:"id",type:"number"},key:{displayName:"key",type:"string"},summary:{displayName:"summary",type:"string"},description:{displayName:"description",type:"string"},type:{displayName:"type",type:"string"},status:{displayName:"status",type:"string"},"transition-id":{displayName:"transition-id",type:"number"},resolution:{displayName:"resolution",type:"string"}},methods:{getList:{displayName:"Get Issues List",type:"list",outputs:["id","key","summary","description","type","status"]},getByKey:{displayName:"Get Issue By key",type:"read",inputs:["key"],outputs:["id","key","summary","description","type","status"]},transition:{displayName:"Transition an issue",type:"read",inputs:["key","transition-id","resolution"],outputs:["key"]}}},Transition:{displayName:"Transition",description:"Transitions for issue",properties:{id:{displayName:"id",type:"number"},name:{displayName:"name",type:"string"},"transition-to-name":{displayName:"transition-to-name",type:"string"},"transition-to-status":{displayName:"transition-to-status",type:"string"},issueKey:{displayName:"issueKey",type:"string"}},methods:{getListForIssue:{displayName:"Get List for Issues",type:"list",inputs:["issueKey"],outputs:["id","name","transition-to-name","transition-to-status"]}}}}})},onexecute=async function({objectName:t,methodName:s,parameters:i,properties:n,configuration:a}){switch(t){case"Issue":await async function(t,s,i,n){switch(t){case"getList":await function(t,s,i){return new Promise(((t,s)=>{var n=i.ServiceURL+"search",a=new XMLHttpRequest;a.onreadystatechange=function(){try{if(4!==a.readyState)return;if(200!==a.status)throw new Error("Failed with status "+a.status);var i=JSON.parse(a.responseText);postResult(i.issues.map((t=>({id:t.id,key:t.key,summary:t.fields.summary,description:e(t.fields.description.content),type:t.fields.issuetype.name,status:t.fields.status.name})))),t()}catch(e){s(e)}},a.open("GET",n),a.setRequestHeader("Content-Type","application/json"),a.setRequestHeader("Authorization","Basic "+i.api_key),a.send()}))}(0,0,n);break;case"getByKey":await function(t,s,i){return new Promise(((t,n)=>{var a=i.ServiceURL+"issue/",o=a+encodeURIComponent(""+s.key),r=new XMLHttpRequest;r.onreadystatechange=function(){try{if(4!==r.readyState)return;if(200!==r.status)throw new Error("Failed with status "+r.status+" URL = "+o);var s=JSON.parse(r.responseText),i={id:s.id,key:s.key,summary:s.fields.summary,description:e(s.fields.description.content),type:s.fields.issuetype.name,status:s.fields.status.name};console.log(i),postResult(i),t()}catch(e){n(e)}},console.log("calling service at "+a+encodeURIComponent(""+s.key)),r.open("GET",a+encodeURIComponent(""+s.key)),r.setRequestHeader("Content-Type","application/json"),r.setRequestHeader("Authorization","Basic "+i.api_key),r.send()}))}(0,i,n);break;case"transition":await function(e,t,s){return new Promise(((e,i)=>{var n=s.ServiceURL+"issue/",a=new XMLHttpRequest;a.onreadystatechange=function(){try{if(4!==a.readyState)return;if(200!==a.status&&204!==a.status)throw new Error("Failed with status "+a.status);var s={key:t.key};postResult(s),e()}catch(e){console.log(a.responseText),i(e)}};var o=t["transition-id"],r=t.resolution,u={transition:{id:o}};""!==r&&(u.resolution={fields:{resolution:{name:r}}}),console.log("Sending payload "+JSON.stringify(u)),console.log("calling service at "+n+encodeURIComponent(t.key+"/transition")),a.open("POST",n+encodeURIComponent(t.key+"/transitions")),a.setRequestHeader("Content-Type","application/json"),a.setRequestHeader("Authorization","Basic "+s.api_key),a.send(JSON.stringify(u))}))}(0,i,n);break;default:throw new Error("The method "+t+" is not supported.")}}(s,0,n,a);break;case"Transition":await async function(e,t,s,i){switch(e){case"getListForIssue":await function(e,t,s){return new Promise(((e,i)=>{var n=s.ServiceURL+"issue",a=new XMLHttpRequest;a.onreadystatechange=function(){try{if(4!==a.readyState)return;if(200!==a.status)throw new Error("Failed with status "+a.status);var t=JSON.parse(a.responseText);postResult(t.transitions.map((e=>({id:e.id,key:e.name,"transition-to-name":e.to.name,"transition-to-status":e.to.statusCategory.name})))),e()}catch(e){i(e)}},console.log("calling service at "+n+encodeURIComponent("/"+t.issueKey+"/transitions")),a.open("GET",n+encodeURIComponent("/"+t.issueKey+"/transitions")),a.setRequestHeader("Content-Type","application/json"),a.setRequestHeader("Authorization","Basic "+s.api_key),a.send()}))}(0,s,i);break;default:throw new Error("The method "+e+" is not supported.")}}(s,0,n,a);break;default:throw new Error("The object "+t+" is not supported.")}}}();
//# sourceMappingURL=jssp-jira.js.map
