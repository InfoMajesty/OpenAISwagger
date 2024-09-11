!function(){function e(t){let s="";return t.forEach((t=>{t.content?s+=" "+e(t.content):t.text&&(s+=t.text+" ")})),s.trim()}metadata={systemName:"JSSP-JIRA",displayName:"JSSP-JIRA",description:"JIRA Service Broker",configuration:{ServiceURL:{displayName:"JIRA Service URL",type:"string",value:"https://quogent.atlassian.net/rest/api/3/",required:!0},api_key:{displayName:"API Key",type:"string",value:"",required:!0}}},ondescribe=async function({configuration:e}){postSchema({objects:{Issue:{displayName:"Issue",description:"Issues and Incidents",properties:{id:{displayName:"id",type:"number"},key:{displayName:"key",type:"string"},summary:{displayName:"summary",type:"string"},description:{displayName:"description",type:"string"},type:{displayName:"type",type:"string"},status:{displayName:"status",type:"string"}},methods:{getList:{displayName:"Get Issues List",type:"list",outputs:["id","key","summary","description","type","status"]},getByKey:{displayName:"Get Issue By key",type:"read",inputs:["key"],outputs:["id","key","summary","description","type","status"]},transition:{displayName:"Transition an issue",type:"read",inputs:["key","transition-id","resolution"],outputs:["key"]}}},Transition:{displayName:"Transition",description:"Transitions for issue",properties:{id:{displayName:"id",type:"number"},name:{displayName:"name",type:"string"},"transition-to-name":{displayName:"transition-to-name",type:"string"},"transition-to-status":{displayName:"transition-to-status",type:"string"}},methods:{getListForIssue:{displayName:"Get Issues List",type:"list",inputs:["issueKey"],outputs:["id","name","transition-to-name","transition-to-status"]}}}}})},onexecute=async function({objectName:t,methodName:s,parameters:i,properties:a,configuration:n}){switch(t){case"Issue":await async function(t,s,i,a){switch(t){case"getList":await function(t,s,i){return new Promise(((t,s)=>{var a=i.ServiceURL+"search",n=new XMLHttpRequest;n.onreadystatechange=function(){try{if(4!==n.readyState)return;if(200!==n.status)throw new Error("Failed with status "+n.status);var i=JSON.parse(n.responseText);postResult(i.issues.map((t=>({id:t.id,key:t.key,summary:t.fields.summary,description:e(t.fields.description.content),type:t.fields.issuetype.name,status:t.fields.status.name})))),t()}catch(e){s(e)}},n.open("GET",a),n.setRequestHeader("Content-Type","application/json"),n.setRequestHeader("Authorization","Basic "+i.api_key),n.send()}))}(0,0,a);break;case"getByKey":await function(t,s,i){return new Promise(((t,a)=>{var n=i.ServiceURL+"issue/",o=new XMLHttpRequest;o.onreadystatechange=function(){try{if(4!==o.readyState)return;if(200!==o.status)throw new Error("Failed with status "+o.status);var s=JSON.parse(o.responseText),i={id:s.id,key:s.key,summary:s.fields.summary,description:e(s.fields.description.content),type:s.fields.issuetype.name,status:s.fields.status.name};console.log(i),postResult(i),t()}catch(e){a(e)}},console.log("calling service at "+n+encodeURIComponent(""+s.key)),o.open("GET",n+encodeURIComponent(""+s.key)),o.setRequestHeader("Content-Type","application/json"),o.setRequestHeader("Authorization","Basic "+i.api_key),o.send()}))}(0,i,a);break;case"transition":await function(e,t,s){return new Promise(((i,a)=>{var n=s.ServiceURL+"issue/",o=new XMLHttpRequest;o.onreadystatechange=function(){try{if(4!==o.readyState)return;if(200!==o.status&&204!==o.status)throw new Error("Failed with status "+o.status);var e={key:t.key};postResult(e),i()}catch(e){console.log(o.responseText),a(e)}};var r=e["transition-id"],u=e.resolution,p={transition:{id:r}};""!==u&&(p.resolution={fields:{resolution:{name:u}}}),console.log("Sending payload "+JSON.stringify(p)),console.log("calling service at "+n+encodeURIComponent(t.key+"/transition")),o.open("POST",n+encodeURIComponent(t.key+"/transitions")),o.setRequestHeader("Content-Type","application/json"),o.setRequestHeader("Authorization","Basic "+s.api_key),o.send(JSON.stringify(p))}))}(s,i,a);break;default:throw new Error("The method "+t+" is not supported.")}}(s,i,a,n);break;case"Transition":await async function(e,t,s,i){switch(e){case"getListForIssue":await function(e,t,s){return new Promise(((e,i)=>{var a=s.ServiceURL+"issue",n=new XMLHttpRequest;n.onreadystatechange=function(){try{if(4!==n.readyState)return;if(200!==n.status)throw new Error("Failed with status "+n.status);var t=JSON.parse(n.responseText);postResult(t.transitions.map((e=>({id:e.id,key:e.name,"transition-to-name":e.to.name,"transition-to-status":e.to.statusCategory.name})))),e()}catch(e){i(e)}},console.log("calling service at "+a+encodeURIComponent("/"+t.issueKey+"/transitions")),n.open("GET",a+encodeURIComponent("/"+t.issueKey+"/transitions")),n.setRequestHeader("Content-Type","application/json"),n.setRequestHeader("Authorization","Basic "+s.api_key),n.send()}))}(0,s,i);break;default:throw new Error("The method "+e+" is not supported.")}}(s,0,a,n);break;default:throw new Error("The object "+t+" is not supported.")}}}();
//# sourceMappingURL=index.js.map
